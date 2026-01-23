import { supabase } from '@shared/config';

export const fetchUserInterviews = async (userId: string) => {
  const { data, error } = await supabase
    .from('interviews')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data.length > 0 ? data : [];
};
