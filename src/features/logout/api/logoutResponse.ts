import { auth } from '@/shared/config/supabse/supabase';

export const logoutResponse = async () => {
  const { error } = await auth.signOut();
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return null;
};
