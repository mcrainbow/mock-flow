import { useMutation } from '@tanstack/react-query';
import { logoutResponse } from '../../api/logoutResponse';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserStore } from '@/entities/user/model/store';

export const useLogout = () => {
  const navigate = useNavigate();
  const reset = useUserStore((state) => state.reset);

  return useMutation({
    mutationFn: logoutResponse,
    onSuccess: () => {
      reset();
      navigate('/login');
      toast.success('Вы успешно вышли из аккаунта');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Произошла ошибка при выходе из аккаунта');
    },
  });
};
