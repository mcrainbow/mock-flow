import { AppLink } from '@/shared/ui';

interface DashboardLastInterviewCompletedProps {
  lastUserInterview: any;
  getScoreColor: (percentage: number) => string;
  getScoreBgColor: (percentage: number) => string;
  scorePercentage: number;
  formatDate: (dateString: string) => string;
  isCompleted: boolean;
}

export function DashboardLastInterviewCompleted({
  lastUserInterview,
  getScoreColor,
  getScoreBgColor,
  scorePercentage,
  formatDate,
  isCompleted,
}: DashboardLastInterviewCompletedProps) {
  return (
    <>
      {/* СЕКЦИЯ 2: Результаты */}
      <div className="pt-6 pb-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-foreground">Результаты</h4>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-bold ${getScoreColor(scorePercentage)}`}>
              {lastUserInterview.score}
            </span>
            <span className="text-muted-foreground text-sm">
              / 10
            </span>
          </div>
        </div>

        {/* Прогресс-бар */}
        <div className="relative h-3 bg-muted rounded-full overflow-hidden mb-2">
          <div
            className={`h-full ${getScoreBgColor(scorePercentage)} transition-all duration-700`}
            style={{ width: `${scorePercentage}%` }}
          />
        </div>
        <div className="text-right text-xs text-muted-foreground mb-4">
          {scorePercentage.toFixed(1)}%
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold text-green-500">
              {lastUserInterview.correct_answers_count}
            </p>
            <p className="text-xs text-muted-foreground">Правильных ответов</p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold text-foreground">
              {lastUserInterview.total_questions}
            </p>
            <p className="text-xs text-muted-foreground">Всего вопросов</p>
          </div>
        </div>

        {/* Дата */}
        <div className="flex items-center justify-between text-sm mt-4 pt-4 border-t border-border/50">
          <span className="text-muted-foreground">{isCompleted ? 'Завершено:' : 'Начато:'}</span>
          <span className="text-foreground font-medium">
            {formatDate(
              isCompleted ? lastUserInterview.completed_at : lastUserInterview.started_at
            )}
          </span>
        </div>
      </div>

      {/* Растущий блок чтобы кнопки были внизу */}
      <div className="flex-1" />

      {/* СЕКЦИЯ 3: Кнопки (внизу блока) */}
      <div className="pt-6 mt-auto">
        <div className="flex gap-3">
          <AppLink
            to={`/app/interview/${lastUserInterview.id}/results`}
            variant="as-button"
            className="flex-1 text-center py-2.5 px-4 bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors no-underline"
          >
            Посмотреть детали
          </AppLink>
          <AppLink
            to="/app/my-interviews"
            variant="as-button"
            className="flex-1 text-center py-2.5 px-4 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg font-medium transition-colors no-underline"
          >
            Все интервью
          </AppLink>
        </div>
      </div>
    </>
  );
}
