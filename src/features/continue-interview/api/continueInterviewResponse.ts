import { supabase } from '@/shared/config';

export const continueInterviewResponse = async (interviewId: string) => {
  const { data, error } = await supabase.rpc('continue_interview', {
    p_interview_id: interviewId,
  });

  if (error) {
    throw new Error(error.message || 'Failed to continue interview');
  }

  if (!data?.success) {
    throw new Error(data?.error || 'Failed to continue interview');
  }

  return data;
};
