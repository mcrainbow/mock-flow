import { useMutation } from '@tanstack/react-query';
import { signupResponse } from '../../api';
import { userInfoAtom } from '@/entities/user';
import type { User } from '@supabase/supabase-js';

export const useSignup = () => {
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
      userInfoAtom.set((prev) => ({
        ...prev,
        user: { id: id || '', email: email || '', name: '', avatar: '' },
        isAuthed: true,
      }));
    },
    onError: (error) => {
      console.error('signup error', error);
    },
  });
  return { signup, signupAsync, isPending, error };
};
