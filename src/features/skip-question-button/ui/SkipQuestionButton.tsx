import { Button, useModal } from '@/shared/ui';
import { useSkipQuestion } from '../model';
import { useInterviewStore } from '@/entities/interview';
import { SkipQuestionModal } from '@entities/question';
import { useQuestionStore } from '@/entities/question/model';

interface SkipQuestionButtonProps {
  disabled?: boolean;
  onSkipSuccess?: () => void;
}

export function SkipQuestionButton({ disabled = false, onSkipSuccess }: SkipQuestionButtonProps) {
  const { activeInterview } = useInterviewStore();
  const { currentQuestionIndex, questions } = useQuestionStore((state) => state);
  const { mutate: skipQuestion, isPending } = useSkipQuestion({ onSkipSuccess });
  const { isOpen, open, close } = useModal();

  const currentQuestion = questions?.[currentQuestionIndex];

  if (!currentQuestion || !activeInterview) return null;

  const handleSkipQuestion = () => {
    skipQuestion({ questionId: currentQuestion.id, interviewId: activeInterview.id });
    close();
  };

  return (
    <>
      <Button
        onClick={open}
        className="bg-warning text-warning-foreground py-1 h-fit w-fit hover:bg-warning/80 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled}
      >
        Пропустить вопрос
      </Button>

      <SkipQuestionModal
        isOpen={isOpen}
        close={close}
        handleSkipQuestion={handleSkipQuestion}
        isPending={isPending}
      />
    </>
  );
}
