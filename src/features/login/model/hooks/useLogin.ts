import { useMutation } from '@tanstack/react-query';
import { loginResponse } from '../../api';
import { appQueryClient } from '@shared/config';

export const useLogin = () => {
  const {
    mutate: login,
    mutateAsync: loginAsync,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginResponse(email, password),
    onSuccess: () => {
      appQueryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { login, loginAsync, isPending, error };
};
