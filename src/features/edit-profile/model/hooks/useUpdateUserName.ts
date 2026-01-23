import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserName } from '../../api/updateUserName';
import { useUserStore } from '@entities/user/model/store';
import { toast } from 'react-toastify';

export const useUpdateUserName = () => {
  const userId = useUserStore((state) => state.user.id);
  const setUser = useUserStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newName: string) => updateUserName(userId, newName),
    onSuccess: (data) => {
      setUser({ name: data.name });

      queryClient.invalidateQueries({ queryKey: ['user', userId] });

      toast.success('Имя успешно обновлено!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Не удалось обновить имя');
    },
  });
};
