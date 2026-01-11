import { auth } from '@/shared/config/supabse/supabase';

export const logoutResponse = async () => {
  const { error } = await auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};
