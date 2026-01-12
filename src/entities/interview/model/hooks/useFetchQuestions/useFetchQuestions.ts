import { fetchQuestions } from '@/entities/interview/api';
import { useMutation } from '@tanstack/react-query';
import { incrementStartedInterviews, userInfoAtom } from '@entities/user';

export const useFetchQuestions = () => {
  return useMutation({
    mutationFn: ({
      level,
      technology,
      count,
    }: {
      level: string;
      technology: string;
      count: string;
    }) => {
      if (!level || !technology || !count) throw new Error('Params are not set');
      return fetchQuestions(level, technology, count);
    },
    onSuccess: (data) => {
      console.log(data);
      incrementStartedInterviews(userInfoAtom().user.id);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
