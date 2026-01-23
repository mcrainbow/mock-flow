import { finishInterview } from '@features/finish-interview/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useInterviewStore, type Interview } from '@entities/interview';
import { useUserStore } from '@entities/user';
import { getUserStats } from '@entities/user/api';
import { useQuestionStore } from '@entities/question/model';

export const useFinishInterview = () => {
  const { setStarted, setActiveInterview, setInterviewResults } = useInterviewStore();
  const { setCurrentQuestionIndex, setQuestions } = useQuestionStore((state) => state);
  const { user, updateUserStats } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (interviewId: string) => finishInterview(interviewId),
    onSuccess: async (data) => {
      setInterviewResults({
        score: data.stats.score,
        totalQuestions: data.stats.total_questions,
        correctAnswers: data.stats.correct_answers,
        totalTimeSpent: data.stats.total_time_spent,
        interviewType: data.stats.interview_type,
      });

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
        console.error('Failed to update user stats after interview:', error);
      }

      await queryClient.invalidateQueries({ queryKey: ['last-user-interview', user.id] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Ошибка при завершении собеседования');
    },
  });
};
