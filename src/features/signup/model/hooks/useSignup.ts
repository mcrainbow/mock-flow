import { useMutation } from '@tanstack/react-query';
import { signupResponse } from '../../api';
import { useUserStore } from '@/entities/user/model/store';
import type { User } from '@supabase/supabase-js';

export const useSignup = () => {
  const { setUser, setAuth } = useUserStore();

  const {
    mutate: signup,
    mutateAsync: signupAsync,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signupResponse(email, password),
    onSuccess: ({ user }) => {
      const { id, email } = user as User;
      setUser({
        id: id || '',
        email: email || '',
        name: '',
        avatar: '',
        // Для нового пользователя все нули
        completed_interviews: 0,
        skipped_interviews: 0,
        started_interviews: 0,
      });
      setAuth(true);
    },
    onError: (error) => {
      console.error('signup error', error);
    },
  });
  return { signup, signupAsync, isPending, error };
};
