export const InterviewPageHeader = ({
  level,
  technology,
  count,
  setLevel,
  setTechnology,
  setCount,
}: {
  level: string;
  technology: string;
  count: string;
  setLevel: (level: string) => void;
  setTechnology: (technology: string) => void;
  setCount: (count: string) => void;
}) => {
  return (
    <header className="flex items-center justify-center gap-10">
      <div className="text-center">
        <label
          htmlFor="level"
          className="block mb-2 dark:text-primary font-semibold text-merriweather text-lg text-background-secondary"
        >
          Уровень Вопросов
        </label>
        <div className="relative">
          <select
            className="appearance-none w-full pr-10 bg-background rounded-md border-border border-2 px-2 py-1"
            style={{ outline: 'none', boxShadow: 'none' }}
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option>Junior</option>
            <option>Middle</option>
            <option>Senior</option>
          </select>

          {/* Стрелочка */}
          <div className="absolute right-2 top-1/2 -translate-y-2/5 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="text-center">
        <label
          htmlFor="technology"
          className="block mb-2 dark:text-primary font-semibold text-merriweather text-lg text-background-secondary"
        >
          Технологии
        </label>
        <div className="relative">
          <select
            className="appearance-none w-full pr-10 bg-background rounded-md border-border border-2 px-2 py-1"
            style={{ outline: 'none', boxShadow: 'none' }}
            id="technology"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
          >
            <option>JavaScript</option>
            <option>FSD</option>
            <option>React</option>
            <option>Typescript</option>
          </select>

          {/* Стрелочка */}
          <div className="absolute right-2 top-1/2 -translate-y-2/5 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="text-center">
        <label
          htmlFor="count"
          className="block mb-2 dark:text-primary font-semibold text-merriweather text-lg text-background-secondary"
        >
          Количество Вопросов
        </label>
        <div className="relative">
          <select
            className="appearance-none w-full pr-10 bg-background rounded-md border-border border-2 px-2 py-1"
            style={{ outline: 'none', boxShadow: 'none' }}
            id="count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          >
            <option>1</option>
            <option>3</option>
            <option>5</option>
            <option>10</option>
          </select>

          {/* Стрелочка */}
          <div className="absolute right-2 top-1/2 -translate-y-2/5 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};
