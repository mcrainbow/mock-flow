import { useMutation } from '@tanstack/react-query';
import { logoutResponse } from '../../api/logoutResponse';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userInfoAtom } from '@/entities/user';

export const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logoutResponse,
    onSuccess: () => {
      userInfoAtom.set({
        isAuthed: false,
        user: {
          id: '',
          email: '',
          name: '',
          avatar: '',
          completed_interviews: 0,
          skipped_interviews: 0,
          started_interviews: 0,
        },
      });
      navigate('/login');
      toast.success('Вы успешно вышли из аккаунта');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Произошла ошибка при выходе из аккаунта');
    },
  });
};
