import { supabase } from '@/shared/config';

export const finishInterview = async (interviewId: string) => {
  const { data, error } = await supabase.rpc('complete_interview', {
    p_interview_id: interviewId,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.success) {
    throw new Error(data?.error || 'Failed to complete interview');
  }

  return data;
};
