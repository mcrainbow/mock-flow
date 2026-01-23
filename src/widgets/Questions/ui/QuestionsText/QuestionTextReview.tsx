import { NextTextQuestionButton } from '@/features/next-text-question-button';
import { useInterviewStore } from '@/entities/interview';
import { FinishInterviewButton } from '@/features/finish-interview';
import { useQuestionStore } from '@entities/question/model';

export function QuestionTextReview() {
  const { userTextReview, currentQuestionIndex, questions } = useQuestionStore((state) => state);
  const activeInterview = useInterviewStore((state) => state.activeInterview);

  if (!activeInterview || !userTextReview) return null;

  const isLastQuestion = currentQuestionIndex === activeInterview.total_questions - 1;
  const question = questions[currentQuestionIndex];
  const maxScore = 'maxScore' in question ? question.maxScore : 10;

  const scorePercentage = (userTextReview.score / maxScore) * 100;

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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Результат проверки</h2>
          <div className="flex flex-col items-center">
            <div
              className={`text-5xl font-bold ${getScoreColor(scorePercentage)} transition-all duration-500`}
            >
              {userTextReview.score}
            </div>
            <span className="text-sm text-muted-foreground">из {maxScore}</span>
          </div>
        </div>

        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${getScoreBgColor(scorePercentage)} transition-all duration-700 ease-out`}
            style={{ width: `${scorePercentage}%` }}
          />
        </div>
        <div className="text-right text-sm text-muted-foreground mt-1">
          {scorePercentage.toFixed(0)}%
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Детальная оценка
        </h3>

        <div className="space-y-4">
          {Object.entries(userTextReview.evaluation).map(([key, value]) => {
            const percentage = value * 10;
            return (
              <div key={key}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground capitalize">
                    {key === 'accuracy'
                      ? 'Точность'
                      : key === 'clarity'
                        ? 'Ясность'
                        : key === 'completeness'
                          ? 'Полнота'
                          : key}
                  </span>
                  <span className="text-sm text-muted-foreground">{value}/10</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Резюме
        </h3>
        <p className="text-foreground leading-relaxed">{userTextReview.feedback.summary}</p>
      </div>

      {userTextReview.feedback.strengths && userTextReview.feedback.strengths.length > 0 && (
        <div className="bg-card border border-green-500/20 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Сильные стороны
          </h3>
          <ul className="space-y-2">
            {userTextReview.feedback.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-foreground">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {userTextReview.feedback.detectedMistakes &&
        userTextReview.feedback.detectedMistakes.length > 0 && (
          <div className="bg-card border border-red-500/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Обнаруженные ошибки
            </h3>
            <ul className="space-y-2">
              {userTextReview.feedback.detectedMistakes.map((mistake, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-foreground">{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      {userTextReview.feedback.weaknesses && userTextReview.feedback.weaknesses.length > 0 && (
        <div className="bg-card border border-yellow-500/20 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Области для улучшения
          </h3>
          <ul className="space-y-2">
            {userTextReview.feedback.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">⚠</span>
                <span className="text-foreground">{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-end pt-4">
        {isLastQuestion ? <FinishInterviewButton /> : <NextTextQuestionButton onClick={() => {}} />}
      </div>
    </div>
  );
}
