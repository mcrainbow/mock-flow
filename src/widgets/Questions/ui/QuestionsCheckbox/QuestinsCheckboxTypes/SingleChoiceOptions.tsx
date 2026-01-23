type SingleChoiceOptionsProps = {
  options: string[];
  correctAnswerIndex: number;
  selectedIndex: number | null;
  isAnswered: boolean;
  onSelect: (index: number) => void;
};

export function SingleChoiceOptions({
  options,
  correctAnswerIndex = 0,
  selectedIndex,
  isAnswered,
  onSelect,
}: SingleChoiceOptionsProps) {
  const handleSelect = (index: number) => {
    if (isAnswered) return;
    onSelect(index);
  };

  const getOptionStyle = (index: number) => {
    if (!isAnswered) {
      return 'border-border hover:border-primary cursor-pointer';
    }

    if (index === correctAnswerIndex) {
      return 'border-green-500 bg-green-50 dark:bg-green-900/20';
    }

    if (index === selectedIndex && index !== correctAnswerIndex) {
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
            type="radio"
            name="single-choice"
            checked={selectedIndex === index}
            onChange={() => handleSelect(index)}
            disabled={isAnswered}
            className="w-5 h-5 accent-primary cursor-pointer disabled:cursor-not-allowed"
          />
          <span className="flex-1 text-base">{option}</span>

          {isAnswered && index === correctAnswerIndex && (
            <span className="text-green-600 text-xl">✓</span>
          )}
          {isAnswered && index === selectedIndex && index !== correctAnswerIndex && (
            <span className="text-red-600 text-xl">✗</span>
          )}
        </label>
      ))}
    </div>
  );
}
