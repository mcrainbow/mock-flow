import { supabase } from '@shared/config';

export async function skipInterviewResponse(interviewId: string) {
  const { data, error } = await supabase.rpc('skip_interview', {
    p_interview_id: interviewId,
  });

  if (error) {
    throw new Error(error.message || 'Failed to skip interview');
  }

  if (!data?.success) {
    throw new Error(data?.error || 'Failed to skip interview');
  }

  return data;
}
