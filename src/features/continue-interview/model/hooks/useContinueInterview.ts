import { continueInterviewResponse } from '../../api';
import { useMutation } from '@tanstack/react-query';
import { useInterviewStore } from '@/entities/interview';
import { type Interview } from '@/entities/interview/model/types';
import { type Question } from '@entities/question/model';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQuestionStore } from '@entities/question/model';

export const useContinueInterview = () => {
  const { setStarted, setActiveInterview, setInterviewType } = useInterviewStore();
  const { setCurrentQuestionIndex, setQuestions } = useQuestionStore((state) => state);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (interviewId: string) => continueInterviewResponse(interviewId),
    onSuccess: (data) => {
      const storeInterviewType =
        data.interview.interview_type === 'text' ? 'Текстовый' : 'С выбором ответов';

      setStarted(true);
      setInterviewType(storeInterviewType);
      setActiveInterview({
        ...data.interview,
        interview_type: storeInterviewType,
      } as Interview);
      setCurrentQuestionIndex(data.interview.current_question_index);

      const formattedQuestions = data.questions.map(
        (q: { id: string; question_data: Record<string, unknown> }) => {
          const { id: _, ...questionDataWithoutId } = q.question_data;
          return {
            id: q.id,
            ...questionDataWithoutId,
          };
        }
      );

      setQuestions(formattedQuestions as Question[]);

      toast.success('Интервью продолжено');

      navigate(`/app/interview/${data.interview.id}`, { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Ошибка при продолжении интервью');
    },
  });
};
