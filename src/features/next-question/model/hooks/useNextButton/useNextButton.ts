import { useCallback } from 'react';

export function useNextButton(
  currentQuestionIndex: number,
  setCurrentQuestion: (index: number) => void,
  resetAnswerState: () => void
) {
  const handleNextQuestion = useCallback(() => {
    setCurrentQuestion(currentQuestionIndex + 1);
    resetAnswerState();
  }, [currentQuestionIndex, setCurrentQuestion, resetAnswerState]);

  return { handleNextQuestion };
}
