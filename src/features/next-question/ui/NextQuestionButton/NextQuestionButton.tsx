import { Button } from '@/shared/ui';
import { ArrowRight } from 'lucide-react';

type NextQuestionButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export function NextQuestionButton({ onClick, disabled = false }: NextQuestionButtonProps) {
  return (
    <div className="flex justify-end pt-2">
      <Button
        onClick={onClick}
        disabled={disabled}
        className="py-2.5 px-8 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md flex items-center gap-2"
      >
        Следующий вопрос
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
