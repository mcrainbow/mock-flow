import { useInterviewStore } from '@entities/interview/model';
import { ButtonVariant } from '@shared/lib';
import { Button } from '@shared/ui';
import { useFinishInterview } from '@features/finish-interview/model';

export function FinishInterviewButton() {
  const { activeInterview } = useInterviewStore();
  const { mutate: finishInterview, isPending } = useFinishInterview();

  const handleFinishInterview = () => {
    if (!activeInterview?.id) {
      alert('Ошибка: интервью не найдено');
      return;
    }

    finishInterview(activeInterview.id);
  };

  return (
    <div className="flex justify-end pt-2">
      <Button
        variant={ButtonVariant.SECONDARY}
        onClick={handleFinishInterview}
        disabled={isPending}
        className="flex items-center gap-2 py-2 px-2"
      >
        {isPending ? 'Завершение...' : 'Завершить собеседование'}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Button>
    </div>
  );
}
