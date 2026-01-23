import { supabase } from '@/shared/config';

export const updateUserName = async (userId: string, newName: string) => {
  const { data, error } = await supabase
    .from('users')
    .update({ nickname: newName })
    .eq('uid', userId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || 'Failed to update user name');
  }

  return data;
};
