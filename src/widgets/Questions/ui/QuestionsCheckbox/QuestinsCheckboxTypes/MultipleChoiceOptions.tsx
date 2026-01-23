type MultipleChoiceOptionsProps = {
  options: string[];
  correctAnswerIndices: number[];
  selectedIndices: number[];
  isAnswered: boolean;
  onToggle: (index: number) => void;
};

export function MultipleChoiceOptions({
  options,
  correctAnswerIndices = [],
  selectedIndices = [],
  isAnswered,
  onToggle,
}: MultipleChoiceOptionsProps) {
  const handleToggle = (index: number) => {
    if (isAnswered) return;
    onToggle(index);
  };

  const getOptionStyle = (index: number) => {
    if (!isAnswered) {
      const isSelected = selectedIndices?.includes(index) ?? false;
      return isSelected
        ? 'border-primary bg-primary/5 cursor-pointer'
        : 'border-border hover:border-primary cursor-pointer';
    }

    const isCorrect = correctAnswerIndices?.includes(index) ?? false;
    const isSelected = selectedIndices?.includes(index) ?? false;

    if (isCorrect && isSelected) {
      return 'border-green-500 bg-green-50 dark:bg-green-900/20';
    }

    if (isCorrect && !isSelected) {
      return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
    }

    if (!isCorrect && isSelected) {
      return 'border-red-500 bg-red-50 dark:bg-red-900/20';
    }

    return 'border-border opacity-60';
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <label
          key={index}
          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${getOptionStyle(
            index
          )} ${!isAnswered ? 'hover:shadow-md' : ''}`}
        >
          <input
            type="checkbox"
            checked={selectedIndices?.includes(index) ?? false}
            onChange={() => handleToggle(index)}
            disabled={isAnswered}
            className="w-5 h-5 accent-primary cursor-pointer disabled:cursor-not-allowed"
          />
          <span className="flex-1 text-base">{option}</span>

          {isAnswered &&
            correctAnswerIndices?.includes(index) &&
            selectedIndices?.includes(index) && (
              <span className="text-green-600 text-xl font-bold">✓</span>
            )}
          {isAnswered &&
            selectedIndices?.includes(index) &&
            !correctAnswerIndices?.includes(index) && (
              <span className="text-red-600 text-xl font-bold">✗</span>
            )}
          {isAnswered &&
            correctAnswerIndices?.includes(index) &&
            !selectedIndices?.includes(index) && (
              <span
                className="text-orange-500 text-xl font-bold"
                title="Вы пропустили этот правильный вариант"
              >
                !
              </span>
            )}
        </label>
      ))}
    </div>
  );
}
