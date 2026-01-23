import { supabase } from '@/shared/config';
import { type SubmitAnswerData } from '../model/types/types';

export const submitAnswer = async (data: SubmitAnswerData) => {
  const { interview_id, question_id, user_answer, is_correct, ai_feedback } = data;

  const { data: result, error } = await supabase
    .from('user_answers')
    .insert({
      interview_id,
      question_id,
      user_answer,
      is_skipped: false,
      is_correct,
      ai_feedback,
      time_spent: 30,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return result;
};
