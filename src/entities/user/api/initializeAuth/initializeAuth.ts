import { auth } from '@shared/config';
import type { User } from '@supabase/supabase-js';

export const initializeAuth = async (): Promise<User | null> => {
  // Получаем текущую сессию при инициализации
  const { data, error } = await auth.getSession();

  if (error) {
    console.error('Error getting session:', error);
    throw error;
  }

  return data.session?.user ?? null;
};
