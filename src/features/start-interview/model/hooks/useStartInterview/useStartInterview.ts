import { useInterviewStore } from '@/entities/interview';
import { useUserStore } from '@/entities/user';
import { useMutation } from '@tanstack/react-query';
import { startNewInterview } from '@/features/start-interview/api';
import { useNavigate } from 'react-router-dom';
import { useQuestionStore } from '@/entities/question';

export const useStartInterview = () => {
  const navigate = useNavigate();
  const {
    interviewType,
    technology,
    level,
    count,
    setActiveInterview,
    setLoading,
    setError,
    setStarted,
  } = useInterviewStore();
  const { setQuestions } = useQuestionStore((state) => state);
  const { user } = useUserStore();

  const transformedInterviewType = interviewType === 'С выбором ответов' ? 'checkbox' : 'text';

  return useMutation({
    mutationFn: () =>
      startNewInterview(
        transformedInterviewType,
        technology,
        level,
        count,
        user.id,
        setActiveInterview,
        setQuestions,
        setLoading,
        setError,
        setStarted
      ),
    onSuccess: (interview) => {
      setLoading(false);
      navigate(`/app/interview/${interview.id}`, { replace: true });
    },
    onError: (error) => {
      setError(error.message);
      setLoading(false);
      setStarted(false);
    },
  });
};
