import type { InterviewType } from '@/entities/interview/model/store/interviewStore';

type InterviewHeaderToggleBtnProps = {
  interviewType: InterviewType;
  setInterviewType: (interviewType: InterviewType) => void;
};
export function InterviewHeaderToggleBtn({
  interviewType,
  setInterviewType,
}: InterviewHeaderToggleBtnProps) {
  return (
    <div className="text-center">
      <label className="block mb-1.5 sm:mb-2 dark:text-primary font-semibold text-merriweather text-sm sm:text-base md:text-lg text-background-secondary">
        Тип Интервью
      </label>
      <div className="flex bg-gray-400 dark:bg-gray-600 rounded-full p-0.5 sm:p-1 w-fit">
        <button
          type="button"
          onClick={() => setInterviewType('Текстовый')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
            interviewType === 'Текстовый'
              ? 'bg-primary text-background font-semibold shadow-md'
              : 'bg-transparent text-gray-700 dark:text-gray-300'
          }`}
        >
          Текстовое
        </button>
        <button
          type="button"
          onClick={() => setInterviewType('С выбором ответов')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
            interviewType === 'С выбором ответов'
              ? 'bg-primary text-background font-semibold shadow-md'
              : 'bg-transparent text-primary-foreground dark:text-gray-300'
          }`}
        >
          С выбором ответов
        </button>
      </div>
    </div>
  );
}
