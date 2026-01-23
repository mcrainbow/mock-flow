import { ButtonVariant } from '@/shared/lib/types/Button.types';
import { Button } from '@/shared/ui';

type CheckAnswerButtonProps = {
  handleCheckAnswer: () => void;
  disabled?: boolean;
};

export function CheckAnswerButton({ handleCheckAnswer, disabled = false }: CheckAnswerButtonProps) {
  return (
    <Button onClick={handleCheckAnswer} disabled={disabled} variant={ButtonVariant.PRIMARY}>
      Проверить ответ
    </Button>
  );
}
