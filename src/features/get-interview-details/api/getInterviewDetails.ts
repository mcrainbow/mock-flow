import { supabase } from '@/shared/config';

export const getInterviewDetails = async (interviewId: string) => {
  const { data, error } = await supabase.rpc('get_interview_details', {
    p_interview_id: interviewId,
  });

  if (error) {
    throw new Error(error.message || 'Failed to get interview details');
  }

  if (!data?.success) {
    throw new Error(data?.error || 'Failed to get interview details');
  }

  return data;
};
