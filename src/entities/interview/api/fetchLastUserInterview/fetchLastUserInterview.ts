import { supabase } from '@shared/config';

export const fetchLastUserInterview = async (userId: string) => {
  const { data, error } = await supabase
    .from('interviews')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  // Возвращаем первый элемент массива или null
  return data && data.length > 0 ? data[0] : null;
};
