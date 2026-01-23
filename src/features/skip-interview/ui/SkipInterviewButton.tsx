import { Button } from '@shared/ui';
import { useSkipInterview } from '../model';
import { ButtonVariant } from '@shared/lib';
import { SkipInterviewModal } from '@entities/interview/ui/Modals';
import { useModal } from '@shared/ui/Modal/useModal';

export function SkipInterviewButton() {
  const { mutate: skipInterview, isPending } = useSkipInterview();
  const { isOpen, open, close } = useModal();

  const handleSkipInterview = () => {
    skipInterview();
    close();
  };

  return (
    <>
      <Button variant={ButtonVariant.SECONDARY} onClick={open} disabled={isPending}>
        Пропустить собеседование
      </Button>

      <SkipInterviewModal
        isOpen={isOpen}
        close={close}
        handleSkipInterview={handleSkipInterview}
        isPending={isPending}
      />
    </>
  );
}
