import { useMutation } from '@tanstack/react-query';
import type { QuestionReview } from '@entities/question/model';
import { checkTextQuestion, type AnswerData } from '../../api/checkTextQuestion';
import { useQuestionStore } from '@entities/question/model';
import { toast } from 'react-toastify';

export const useCheckTextQuestion = () => {
  const { setIsTextQuestionAnswered, setUserTextReview } = useQuestionStore((state) => state);
  return useMutation<QuestionReview, Error, AnswerData>({
    mutationFn: checkTextQuestion,
    onSuccess: (data) => {
      setIsTextQuestionAnswered(true);
      setUserTextReview(data);
    },
    onError: () => {
      toast.error('❌ Failed to check answer:');
    },
  });
};
