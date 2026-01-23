import { Button } from '@shared/ui';
import { ArrowRight } from 'lucide-react';
import type { QuestionReview } from '@entities/question/model';
import { useQuestionStore } from '@entities/question/model';

type NextTextQuestionButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export function NextTextQuestionButton({ onClick, disabled = false }: NextTextQuestionButtonProps) {
  const {
    setIsTextQuestionAnswered,
    setUserTextReview,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  } = useQuestionStore((state) => state);

  const handleNextTextQuestion = () => {
    onClick();
    setIsTextQuestionAnswered(false);
    setUserTextReview(null as unknown as QuestionReview);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div className="flex justify-end pt-2">
      <Button
        onClick={handleNextTextQuestion}
        disabled={disabled}
        className="py-2.5 px-8 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md flex items-center gap-2"
      >
        Следующий вопрос
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
