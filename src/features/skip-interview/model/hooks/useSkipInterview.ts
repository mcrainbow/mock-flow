import { useMutation, useQueryClient } from '@tanstack/react-query';
import { skipInterviewResponse } from '../../api';
import { toast } from 'react-toastify';
import { useInterviewStore, type Interview } from '@entities/interview';
import { getUserStats, useUserStore } from '@entities/user';
import { useNavigate } from 'react-router-dom';
import { useQuestionStore } from '@entities/question/model';

export const useSkipInterview = () => {
  const { activeInterview, setStarted, setActiveInterview } = useInterviewStore();
  const { setCurrentQuestionIndex, setQuestions } = useQuestionStore((state) => state);
  const { user, updateUserStats } = useUserStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      if (!activeInterview) {
        throw new Error('No active interview');
      }
      return await skipInterviewResponse(activeInterview.id);
    },
    onSuccess: async () => {
      setStarted(false);
      setActiveInterview(null as unknown as Interview);
      setCurrentQuestionIndex(0);
      setQuestions([]);

      try {
        const stats = await getUserStats(user.id);
        updateUserStats({
          completed_interviews: stats.completed_interviews,
          skipped_interviews: stats.skipped_interviews,
          started_interviews: stats.total_interviews,
        });
      } catch (error) {
        console.error('Failed to update user stats after skipping interview:', error);
      }

      await queryClient.invalidateQueries({ queryKey: ['last-user-interview', user.id] });

      toast.success('Собеседование пропущено');

      navigate('/app/interview', { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Ошибка при пропуске собеседования');
    },
  });
};
