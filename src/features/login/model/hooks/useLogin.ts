import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { loginResponse } from '../../api';
import { userInfoAtom } from '@entities/user';

export const useLogin = () => {
  const {
    mutate: login,
    mutateAsync: loginAsync,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginResponse(email, password),
    onSuccess: (data) => {
      const { id, email } = data.user;
      userInfoAtom.set((prev) => ({
        ...prev,
        user: { id: id ?? '', email: email ?? '', name: '', avatar: '' },
        isAuthed: true,
      }));
      toast.success('Вход выполнен успешно');
    },
    onError: () => {
      toast.error('Ошибка при входе');
    },
  });

  return { login, loginAsync, isPending, error };
};
