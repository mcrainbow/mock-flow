import { supabase } from '@shared/config';

type SkipQuestionResponseData = {
  question_id: string;
  interview_id: string;
};

export const skipQuestionResponse = async (data: SkipQuestionResponseData) => {
  const { question_id, interview_id } = data;
  const { data: result, error } = await supabase
    .from('user_answers')
    .insert({
      interview_id,
      question_id,
      is_skipped: true,
      user_answer: null,
      is_correct: null,
      ai_feedback: null,
      time_spent: 0,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return result;
};
