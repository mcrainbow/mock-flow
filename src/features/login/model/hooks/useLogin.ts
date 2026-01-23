import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { loginResponse } from '../../api';
import { useUserStore } from '@entities/user/model/store';
import { getUserStats } from '@entities/user/api';

export const useLogin = () => {
  const { setUser, setAuth, updateUserStats } = useUserStore();

  const {
    mutate: login,
    mutateAsync: loginAsync,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginResponse(email, password),
    onSuccess: async (data) => {
      const { id, email } = data.user;
      setUser({
        id: id ?? '',
        email: email ?? '',
        name: '',
        avatar: '',
      });
      setAuth(true);

      // Загружаем статистику после логина
      try {
        const stats = await getUserStats(id ?? '');
        updateUserStats({
          completed_interviews: stats.completed_interviews,
          skipped_interviews: stats.skipped_interviews,
          started_interviews: stats.total_interviews,
        });
      } catch (error) {
        console.error('Failed to load user stats:', error);
      }

      toast.success('Вход выполнен успешно');
    },
    onError: () => {
      toast.error('Ошибка при входе');
    },
  });

  return { login, loginAsync, isPending, error };
};
