import { supabase } from '@shared/config';
import {
  fetchCheckboxQuestionsFromAI,
  fetchTextQuestionsFromAI,
  formatCheckboxQuestionsResponse,
  formatTextQuestionsResponse,
  type AICheckboxQuestion,
  type AITextQuestion,
  type Question,
} from '@entities/question';
import type { Interview } from '@entities/interview';
import { toast } from 'react-toastify';

export const startNewInterview = async (
  interviewType: string,
  category: string,
  difficulty: string,
  questionCount: number,
  userId: string,
  setActiveInterview: (activeInterview: Interview) => void,
  setQuestions: (questions: Question[]) => void,
  setLoading: (isLoading: boolean) => void,
  setError: (error: string | null) => void,
  setStarted: (isStarted: boolean) => void
) => {
  setLoading(true);
  setError(null);
  setStarted(true);

  try {
    const { data: check } = await supabase.rpc('can_start_new_interview', {
      p_user_uid: userId,
    });

    if (!check.can_start) {
      setError('You have an active interview');
      setLoading(false);
      setStarted(false);
      throw new Error('You have an active interview');
    }

    // ✅ Объявляем отдельные переменные для каждого типа
    let checkboxQuestions: { questions: AICheckboxQuestion[] } | null = null;
    let textQuestions: { questions: AITextQuestion[] } | null = null;

    if (interviewType === 'checkbox') {
      const rawData = await fetchCheckboxQuestionsFromAI({
        topic: category,
        level: difficulty,
        count: questionCount,
      });
      // Форматируем и нормализуем данные
      checkboxQuestions = formatCheckboxQuestionsResponse(rawData);
    } else {
      const rawData = await fetchTextQuestionsFromAI({
        topic: category,
        level: difficulty,
        count: questionCount,
      });
      // Форматируем и нормализуем данные
      textQuestions = formatTextQuestionsResponse(rawData);
    }

    // Определяем количество вопросов
    const totalQuestions =
      checkboxQuestions?.questions.length || textQuestions?.questions.length || 0;

    const { data: interview, error: interviewError } = await supabase
      .from('interviews')
      .insert({
        user_id: userId,
        category: category,
        difficulty: difficulty.toLowerCase(),
        interview_type: interviewType,
        total_questions: totalQuestions,
      })
      .select()
      .single();

    if (interviewError) {
      setError(interviewError.message);
      setLoading(false);
      setStarted(false);
      throw new Error(interviewError.message);
    }

    let questionRecords;

    // ✅ Теперь TypeScript точно знает типы
    if (checkboxQuestions) {
      questionRecords = checkboxQuestions.questions.map((q, index) => ({
        interview_id: interview.id,
        order_number: index + 1,
        question_type: 'checkbox' as const,
        question_data: q,
      }));
    } else if (textQuestions) {
      questionRecords = textQuestions.questions.map((q, index) => ({
        interview_id: interview.id,
        order_number: index + 1,
        question_type: 'text' as const,
        question_data: q,
      }));
    }

    if (!questionRecords || questionRecords.length === 0) {
      setError('Failed to generate questions');
      setLoading(false);
      setStarted(false);
      throw new Error('Failed to generate questions');
    }

    const { data: insertedQuestions, error: questionRecordsError } = await supabase
      .from('interview_questions')
      .insert(questionRecords)
      .select();

    if (questionRecordsError || !insertedQuestions) {
      setError(questionRecordsError?.message || 'Failed to save questions');
      setLoading(false);
      setStarted(false);
      throw new Error(questionRecordsError?.message || 'Failed to save questions');
    }

    setActiveInterview(interview);

    if (checkboxQuestions) {
      const questionsWithRealIds = checkboxQuestions.questions.map((aiQuestion, index) => ({
        ...aiQuestion,
        id: insertedQuestions[index].id,
      }));
      setQuestions(questionsWithRealIds);
    } else if (textQuestions) {
      const questionsWithRealIds = textQuestions.questions.map((aiQuestion, index) => ({
        ...aiQuestion,
        id: insertedQuestions[index].id,
      }));
      setQuestions(questionsWithRealIds);
    }

    return interview;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};
