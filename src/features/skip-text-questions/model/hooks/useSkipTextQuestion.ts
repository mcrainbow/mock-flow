import { useMutation } from '@tanstack/react-query';
import { skipTextQuestionResponse } from '../../api/skipTextQuestionResponse';
import { toast } from 'react-toastify';
import { useQuestionStore } from '@entities/question/model';

export const useSkipTextQuestion = () => {
  const { setUserTextReview, setIsTextQuestionAnswered } = useQuestionStore((state) => state);
  return useMutation({
    mutationFn: skipTextQuestionResponse,
    onSuccess: (data) => {
      setUserTextReview(data);
      setIsTextQuestionAnswered(true);
    },
    onError: () => {
      toast.error('Ошибка при пропуске текстового вопроса');
    },
  });
};
