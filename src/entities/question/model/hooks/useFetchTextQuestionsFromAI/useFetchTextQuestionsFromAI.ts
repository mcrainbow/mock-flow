import { useMutation } from '@tanstack/react-query';
import { fetchTextQuestionsFromAI } from '@/entities/question/api';
import { formatTextQuestionsResponse } from '@/entities/question/lib/formatTextQuestionsResponse';
import { incrementStartedInterviews } from '@entities/user/api';
import { useUserStore } from '@entities/user/model/store';
import type { AITextQuestionsResponse, FetchTextQuestionsFromAIParams } from '@/entities/question';
import { toast } from 'react-toastify';

export const useFetchTextQuestionsFromAI = () => {
  const userId = useUserStore((state) => state.user.id);
  const incrementStarted = useUserStore((state) => state.incrementStartedInterviews);

  return useMutation<AITextQuestionsResponse, Error, FetchTextQuestionsFromAIParams>({
    mutationFn: async (params) => {
      const data = await fetchTextQuestionsFromAI(params);

      const formatted = formatTextQuestionsResponse(data);

      return formatted;
    },
    onSuccess: async () => {
      await incrementStartedInterviews(userId);

      incrementStarted();
    },
    onError: (error) => {
      toast.error(error.message || 'Не удалось загрузить вопросы');
    },
  });
};
