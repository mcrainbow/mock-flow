import { Button, useModal } from '@shared/ui';
import { useInterviewStore } from '@entities/interview';
import { SkipQuestionModal, useQuestionStore } from '@entities/question';

interface SkipTextQuestionButtonProps {
  handleSkip: () => void;
  disabled: boolean;
}

export function SkipTextQuestionButton({ handleSkip, disabled }: SkipTextQuestionButtonProps) {
  const { activeInterview } = useInterviewStore();
  const { currentQuestionIndex, questions } = useQuestionStore((state) => state);
  const { isOpen, open, close } = useModal();

  const currentQuestion = questions?.[currentQuestionIndex];

  if (!currentQuestion || !activeInterview) return null;

  const handleSkipQuestion = () => {
    handleSkip();
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
        isPending={disabled}
      />
    </>
  );
}
