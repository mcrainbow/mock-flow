import { supabase } from '@shared/config';

export async function getUserInformationAPI(uid: string | undefined) {
  if (!uid) return;
  const { data, error } = await supabase.from('users').select('*').eq('uid', uid).single();

  if (error) throw new Error(error.message);

  return data;
}
