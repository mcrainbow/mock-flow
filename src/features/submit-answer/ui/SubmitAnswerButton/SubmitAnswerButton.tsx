import { ButtonVariant } from '@/shared/lib';
import { Button } from '@/shared/ui';

type SubmitAnswerButtonProps = {
  disabled?: boolean;
  selectedCount?: number;
  showCount?: boolean;
  onClick: () => void;
};

export function SubmitAnswerButton({
  disabled = false,
  selectedCount = 0,
  showCount = false,
  onClick,
}: SubmitAnswerButtonProps) {
  return (
    <div className="flex justify-end pt-2">
      <Button onClick={onClick} disabled={disabled} variant={ButtonVariant.PRIMARY}>
        {showCount ? `Сохранить ответ (${selectedCount})` : 'Сохранить ответ'}
      </Button>
    </div>
  );
}
