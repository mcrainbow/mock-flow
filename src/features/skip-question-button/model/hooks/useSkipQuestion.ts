import { useMutation } from '@tanstack/react-query';
import { skipQuestionResponse } from '../../api';
import { toast } from 'react-toastify';

interface UseSkipQuestionParams {
  onSkipSuccess?: () => void;
}

export function useSkipQuestion({ onSkipSuccess }: UseSkipQuestionParams = {}) {
  return useMutation({
    mutationFn: ({ questionId, interviewId }: { questionId: string; interviewId: string }) =>
      skipQuestionResponse({ question_id: questionId, interview_id: interviewId }),
    onSuccess: () => {
      toast.success('Вопрос пропущен');
      onSkipSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Ошибка при пропуске вопроса');
    },
  });
}
