import { supabase } from '@/shared/config';

export async function getUserStats(userId: string) {
  const { data, error } = await supabase.rpc('get_user_interview_stats', {
    p_user_uid: userId,
  });

  if (error) throw new Error(error.message);

  return data;
}
