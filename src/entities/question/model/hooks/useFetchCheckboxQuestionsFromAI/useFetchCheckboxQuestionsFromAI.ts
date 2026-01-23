import { useMutation } from '@tanstack/react-query';
import {
  fetchCheckboxQuestionsFromAI,
  useQuestionStore,
  type AICheckboxQuestionsResponse,
  type FetchCheckboxQuestionsFromAIParams,
} from '@entities/question';
import { formatCheckboxQuestionsResponse } from '@entities/question/lib';
import { incrementStartedInterviews } from '@entities/user/api';
import { useUserStore } from '@entities/user/model/store';
import { useInterviewStore } from '@entities/interview/model/store';

export const useFetchCheckboxQuestionsFromAI = () => {
  const userId = useUserStore((state) => state.user.id);
  const incrementStarted = useUserStore((state) => state.incrementStartedInterviews);

  const setQuestions = useQuestionStore((state) => state.setQuestions);
  const { setLoading, setError } = useInterviewStore((state) => state);

  return useMutation<AICheckboxQuestionsResponse, Error, FetchCheckboxQuestionsFromAIParams>({
    mutationFn: async (params) => {
      const data = await fetchCheckboxQuestionsFromAI(params);

      const formatted = formatCheckboxQuestionsResponse(data);

      incrementStartedInterviews(userId);

      incrementStarted();

      return formatted;
    },
    onSuccess: (data) => {
      setQuestions(data.questions);
      setLoading(false);
    },
    onError: (error) => {
      setError(error.message || 'Не удалось загрузить вопросы');
      setLoading(false);
    },
  });
};
