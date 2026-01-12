import { userInfoAtom } from '@/entities/user';
import { Button } from '@/shared/ui';
import { InterviewPageHeader, InterviewTrainerInfo, useFetchQuestions } from '@entities/interview';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';

export default function InterviewPage() {
  const [level, setLevel] = useState<string>('Junior');
  const [technology, setTechnology] = useState<string>('React');
  const [count, setCount] = useState<string>('5');

  const { mutate: fetchQuestions, isPending, error, data } = useFetchQuestions();
  const queryClient = useQueryClient();
  // ✅ Мемоизируем функцию
  const handleStartInterviewButton = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['user', userInfoAtom().user.id] });
    fetchQuestions({ level: level.toLowerCase(), technology, count });
  }, [level, technology, count, fetchQuestions, queryClient]);

  return (
    <div className="p-4 space-y-6">
      <InterviewPageHeader
        level={level}
        technology={technology}
        count={count}
        setLevel={setLevel}
        setTechnology={setTechnology}
        setCount={setCount}
      />

      {/* Информация о тренажере */}
      <div className="flex gap-10">
        <InterviewTrainerInfo />

        <div>
          {isPending && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}

          <ul>{data && data.map((item) => <li key={item.id}>{item.question}</li>)}</ul>

          <div className="mt-auto">
            <Button onClick={handleStartInterviewButton} className="py-2 px-4">
              Начать собеседование
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
