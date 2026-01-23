import { useGetLastUserInterview } from '@/entities/interview/model';
import { Card } from '@/shared/ui/Card/Card';
import { DashboardLastInterviewCompleted } from './DashboardLastInterviewCompleted';
import { DashboardLastInterviewNotExist } from './DashboardLastInterviewNotExist';
import { ContinueButton } from '@/features/continue-interview';

export function DashboardLastInterview() {
  const { data: lastUserInterview, isLoading } = useGetLastUserInterview();

  if (isLoading) {
    return (
      <Card>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!lastUserInterview) {
    return <DashboardLastInterviewNotExist />;
  }

  const scorePercentage = (lastUserInterview.score / 10) * 100;
  const isCompleted = lastUserInterview.status === 'completed';
  const isSkipped = lastUserInterview.status === 'skipped';

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'intern':
        return 'text-gray-400';
      case 'junior':
      case 'junior+':
        return 'text-green-400';
      case 'middle':
      case 'middle+':
        return 'text-yellow-400';
      case 'senior':
        return 'text-red-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} мин ${remainingSeconds} сек`;
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="flex flex-col h-full">
        {/* СЕКЦИЯ 1: Информация о собеседовании */}
        <div className="pb-6 border-b border-border">
          {/* Заголовок с статусом */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">Последнее собеседование</h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                isCompleted
                  ? 'bg-green-500/20 text-green-500'
                  : isSkipped
                    ? 'bg-orange-500/20 text-orange-500'
                    : 'bg-yellow-500/20 text-yellow-500'
              }`}
            >
              {isCompleted ? '✓ Завершено' : isSkipped ? '⊘ Пропущено' : '⏳ В процессе'}
            </span>
          </div>

          {/* Основная информация */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Категория */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              Категория
            </div>
            <p className="text-foreground font-semibold text-base sm:text-lg">{lastUserInterview.category}</p>
          </div>

          {/* Сложность */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Сложность
            </div>
            <p
              className={`font-semibold text-base sm:text-lg capitalize ${getDifficultyColor(lastUserInterview.difficulty)}`}
            >
              {lastUserInterview.difficulty}
            </p>
          </div>

          {/* Тип */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Тип
            </div>
            <p className="text-foreground font-semibold text-sm sm:text-base">
              {lastUserInterview.interview_type === 'text' ? 'Текстовый' : 'С выбором ответов'}
            </p>
          </div>

          {/* Время */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Длительность
            </div>
            <p className="text-foreground font-semibold text-sm sm:text-base">
              {formatDuration(lastUserInterview.total_time_spent)}
            </p>
          </div>
          </div>
        </div>

        {/* СЕКЦИЯ 2 + 3: Результаты и Кнопки */}
        {(isCompleted || isSkipped) && (
          <DashboardLastInterviewCompleted
            lastUserInterview={lastUserInterview}
            getScoreColor={getScoreColor}
            getScoreBgColor={getScoreBgColor}
            scorePercentage={scorePercentage}
            formatDate={formatDate}
            isCompleted={isCompleted}
          />
        )}

        {/* СЕКЦИЯ 3: Кнопка продолжения для интервью в процессе */}
        {!isCompleted && !isSkipped && (
          <div className="pt-6 mt-auto border-t border-border">
            <ContinueButton interviewId={lastUserInterview.id} />
          </div>
        )}
      </div>
    </Card>
  );
}
