import { Button } from '@/shared/ui';
import { ButtonVariant } from '@/shared/lib';
import { useContinueInterview } from '../model';

interface ContinueButtonProps {
  interviewId: string;
  disabled?: boolean;
}

export function ContinueButton({ interviewId, disabled = false }: ContinueButtonProps) {
  const { mutate: continueInterview, isPending } = useContinueInterview();

  const handleContinue = () => {
    continueInterview(interviewId);
  };

  return (
    <Button
      variant={ButtonVariant.PRIMARY}
      onClick={handleContinue}
      disabled={disabled || isPending}
      className="w-full py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? 'Загрузка...' : 'Продолжить собеседование'}
    </Button>
  );
}
