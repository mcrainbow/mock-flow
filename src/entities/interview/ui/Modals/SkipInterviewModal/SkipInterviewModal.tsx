import { ButtonVariant } from '@/shared/lib';
import { Button, Modal } from '@/shared/ui';

interface SkipInterviewModalProps {
  isOpen: boolean;
  close: () => void;
  handleSkipInterview: () => void;
  isPending: boolean;
}

export function SkipInterviewModal({
  isOpen,
  close,
  handleSkipInterview,
  isPending,
}: SkipInterviewModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={close} size="lg" className="rounded-lg py-10">
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-warning text-center">
          Вы уверены, что хотите пропустить собеседование?
        </h2>
        <p className="text-destructive font-bold underline text-center text-lg">
          Это действие безвозвратно
        </p>
        <div className="flex gap-5 items-center justify-center">
          <Button
            variant={ButtonVariant.PRIMARY}
            onClick={close}
            className="bg-success text-success-foreground hover:bg-success/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Отмена
          </Button>
          <Button variant={ButtonVariant.DANGER} onClick={handleSkipInterview}>
            {isPending ? 'Загрузка' : 'Пропустить'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
