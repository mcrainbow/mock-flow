import { useMutation } from '@tanstack/react-query';
import { submitAnswer } from '../../api/submitAnswer';
import { type SubmitAnswerData } from '../types/types';
import { toast } from 'react-toastify';

export const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: (data: SubmitAnswerData) => submitAnswer(data),
    onSuccess: () => {
      toast.success('Ответ успешно отправлен');
    },
    onError: (error) => {
      toast.error(error.message || 'Не удалось отправить ответ');
    },
  });
};
