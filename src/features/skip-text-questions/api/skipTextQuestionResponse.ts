import { supabase } from '@/shared/config/supabse/supabase';

export interface SkipTextQuestionResponseParams {
  interviewId: string;
  questionId: string;
  answerData: {
    question: string;
    referenceAnswer: string;
    keyPoints: string[];
    commonMistakes: string[];
    maxScore: number;
  };
}

export const skipTextQuestionResponse = async (data: SkipTextQuestionResponseParams) => {
  const { interviewId, questionId, answerData } = data;

  const { data: responseData, error } = await supabase.functions.invoke('get_text_answer', {
    body: { ...answerData, userAnswer: 'Пользователь не дал ответ, поставь оценку 0' },
  });

  if (error) {
    throw new Error(`Failed to check answer: ${error.message}`);
  }

  if (!responseData) {
    throw new Error('No data returned from Edge Function');
  }

  if (!responseData[0]?.content?.[0]?.text) {
    throw new Error('Invalid response structure: missing content text');
  }

  let result;
  try {
    result = JSON.parse(responseData[0].content[0].text);
  } catch (parseError) {
    throw new Error(
      `Failed to parse AI response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`
    );
  }

  if (!result?.evaluation || !result?.feedback || typeof result?.score !== 'number') {
    throw new Error(`Invalid response structure from AI: ${JSON.stringify(result)}`);
  }

  const { error: insertDBQuestionError } = await supabase
    .from('user_answers')
    .insert({
      interview_id: interviewId,
      question_id: questionId,
      is_skipped: true,
      user_answer: null,
      is_correct: false,
      score: 0, // Пропущенный текстовый вопрос = 0 баллов
      ai_feedback: result.feedback,
      time_spent: 0,
    })
    .select()
    .single();

  if (insertDBQuestionError) {
    throw new Error(insertDBQuestionError.message);
  }

  return result;
};
