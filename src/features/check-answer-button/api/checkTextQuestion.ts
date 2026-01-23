import { supabase } from '@/shared/config/supabse/supabase';
import type { QuestionReview } from '@entities/question/model';

export interface AnswerData {
  interviewId: string;
  questionId: string;
  answerData: {
    question: string;
    referenceAnswer: string;
    keyPoints: string[];
    commonMistakes: string[];
    maxScore: number;
    userAnswer: string;
  };
}

export const checkTextQuestion = async (data: AnswerData): Promise<QuestionReview> => {
  const { interviewId, questionId, answerData } = data;

  const { data: responseData, error } = await supabase.functions.invoke('get_text_answer', {
    body: answerData,
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

  const { error: insertError } = await supabase.from('user_answers').insert({
    interview_id: interviewId,
    question_id: questionId,
    user_answer: answerData.userAnswer,
    is_skipped: false,
    is_correct: result.score >= answerData.maxScore * 0.7, // 70% = правильно
    score: result.score, // Сохраняем числовую оценку от AI
    ai_feedback: result.feedback,
    time_spent: 30,
  });

  if (insertError) {
    throw new Error(insertError.message);
  }

  return result as QuestionReview;
};
