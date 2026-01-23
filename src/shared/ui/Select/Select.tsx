type SelectProps = {
  label: string;
  value: string;
  id: string;
  onChange: (value: string) => void;
  options: string[];
  conditionalOptions?: Array<{
    value: string;
    condition: boolean;
  }>;
};
export function Select({ label, value, id, onChange, options, conditionalOptions }: SelectProps) {
  const filteredOptions = [
    ...options,
    ...(conditionalOptions?.filter(({ condition }) => condition).map(({ value }) => value) || []),
  ];
  return (
    <div className="text-center">
      <label
        htmlFor={id}
        className="block mb-2 dark:text-primary font-semibold text-merriweather text-lg text-background-secondary"
      >
        {label}
      </label>
      <div className="relative">
        <select
          className="appearance-none w-full pr-10 bg-background rounded-md border-border border-2 px-2 py-1"
          style={{ outline: 'none', boxShadow: 'none' }}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {filteredOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Стрелочка */}
        <div className="absolute right-2 top-1/2 -translate-y-2/5 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
