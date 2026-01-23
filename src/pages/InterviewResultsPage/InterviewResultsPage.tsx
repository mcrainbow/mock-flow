import { useParams, useNavigate } from 'react-router-dom';
import { useGetInterviewDetails } from '@/features/get-interview-details';
import { Card, Button } from '@/shared/ui';
import { ButtonVariant } from '@/shared/lib';

export default function InterviewResultsPage() {
  const { interviewId } = useParams<{ interviewId: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetInterviewDetails(interviewId || '');

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="text-center p-8">
              <p className="text-red-500 mb-4">
                {error instanceof Error ? error.message : 'Ошибка загрузки результатов'}
              </p>
              <Button
                variant={ButtonVariant.PRIMARY}
                onClick={() => navigate('/app/dashboard')}
              >
                Вернуться на главную
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const { interview, questions_with_answers } = data;
  const scorePercentage = (interview.score / 10) * 100;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
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

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">Результаты интервью</h1>
          <Button
            variant={ButtonVariant.SECONDARY}
            onClick={() => navigate('/app/dashboard')}
          >
            ← Назад
          </Button>
        </div>

        {/* Общая информация */}
        <Card className="mb-6">
          <div className="space-y-6">
            {/* Статус и оценка */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {interview.category}
                </h2>
                <p className="text-muted-foreground">
                  Сложность: <span className="text-foreground font-semibold capitalize">{interview.difficulty}</span>
                </p>
              </div>
              <div className="text-right">
                <div className={`text-5xl font-bold ${getScoreColor(scorePercentage)}`}>
                  {interview.score}
                </div>
                <p className="text-muted-foreground text-sm">из 10</p>
              </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-green-500">
                  {interview.correct_answers_count}
                </p>
                <p className="text-xs text-muted-foreground">Правильных</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">
                  {interview.total_questions}
                </p>
                <p className="text-xs text-muted-foreground">Всего вопросов</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">
                  {Math.floor(interview.total_time_spent / 60)}:{(interview.total_time_spent % 60).toString().padStart(2, '0')}
                </p>
                <p className="text-xs text-muted-foreground">Времени</p>
              </div>
            </div>

            {/* Дата */}
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground">
                Завершено: <span className="text-foreground font-medium">{formatDate(interview.completed_at)}</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Детальные результаты по вопросам */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground mb-4">Детальные результаты</h3>
          
          {questions_with_answers.map((item: any, index: number) => {
            const questionData = item.question_data;
            const userAnswer = item.user_answer;
            const isSkipped = userAnswer.is_skipped;
            const isCorrect = userAnswer.is_correct;

            return (
              <Card key={item.question_id} className="p-6">
                {/* Заголовок вопроса */}
                  <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-foreground mb-2">
                        {questionData.question}
                      </p>
                    </div>
                  </div>
                  
                  {/* Статус */}
                  <div className="shrink-0 ml-4">
                    {isSkipped ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-500">
                        Пропущено
                      </span>
                    ) : isCorrect ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-500">
                        ✓ Правильно
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-500">
                        ✗ Неправильно
                      </span>
                    )}
                  </div>
                </div>

                {/* Для текстовых вопросов */}
                {item.question_type === 'text' && (
                  <div className="space-y-4">
                    {/* Ответ пользователя */}
                    {!isSkipped && (
                      <div className="bg-muted/30 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-2">Ваш ответ:</p>
                        <p className="text-foreground">{userAnswer.user_answer}</p>
                      </div>
                    )}

                    {/* Оценка и фидбек */}
                    {userAnswer.score !== null && (
                      <div className="border-t border-border pt-4">
                        <div className="flex items-center gap-4 mb-3">
                          <div>
                            <span className="text-sm text-muted-foreground">Оценка:</span>
                            <span className={`ml-2 text-2xl font-bold ${
                              userAnswer.score >= 8 ? 'text-green-500' : 
                              userAnswer.score >= 6 ? 'text-yellow-500' : 
                              'text-red-500'
                            }`}>
                              {userAnswer.score}
                            </span>
                            <span className="text-muted-foreground text-sm"> / {questionData.maxScore}</span>
                          </div>
                        </div>
                        
                        {userAnswer.ai_feedback && (
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-1">Оценка:</p>
                              <p className="text-sm text-muted-foreground">{userAnswer.ai_feedback.evaluation}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-1">Обратная связь:</p>
                              <p className="text-sm text-muted-foreground">{userAnswer.ai_feedback.feedback}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Правильный ответ */}
                    <div className="bg-green-500/10 rounded-lg p-4">
                      <p className="text-sm text-green-500 font-semibold mb-2">Правильный ответ:</p>
                      <p className="text-foreground text-sm">{questionData.referenceAnswer}</p>
                    </div>
                  </div>
                )}

                {/* Для checkbox вопросов */}
                {item.question_type === 'checkbox' && (
                  <div className="space-y-4">
                    {/* Варианты ответов */}
                    <div className="space-y-2">
                      {questionData.options.map((option: string, optIdx: number) => {
                        const isUserAnswer = !isSkipped && (
                          questionData.questionSubtype === 'single' 
                            ? userAnswer.user_answer?.selectedIndex === optIdx
                            : userAnswer.user_answer?.selectedIndices?.includes(optIdx)
                        );
                        
                        const isCorrectOption = questionData.questionSubtype === 'single'
                          ? questionData.correctAnswerIndex === optIdx
                          : questionData.correctAnswerIndices?.includes(optIdx);

                        // Определяем стиль
                        let borderStyle = '';
                        let icon = null;
                        let textStyle = '';

                        if (isSkipped) {
                          // Если вопрос пропущен - показываем только правильные ответы оранжевыми
                          if (isCorrectOption) {
                            borderStyle = 'border-orange-500 bg-orange-500/10';
                            icon = <span className="text-orange-500 text-lg">!</span>;
                            textStyle = 'text-foreground font-medium';
                          } else {
                            borderStyle = 'border-border bg-muted/30';
                            textStyle = 'text-muted-foreground';
                          }
                        } else {
                          // Если вопрос не пропущен - применяем обычную логику
                          if (isUserAnswer && isCorrectOption) {
                            borderStyle = 'border-green-500 bg-green-500/10';
                            icon = <span className="text-green-500 text-lg">✓</span>;
                            textStyle = 'text-foreground font-medium';
                          } else if (isUserAnswer && !isCorrectOption) {
                            borderStyle = 'border-red-500 bg-red-500/10';
                            icon = <span className="text-red-500 text-lg">✗</span>;
                            textStyle = 'text-foreground';
                          } else if (!isUserAnswer && isCorrectOption) {
                            borderStyle = 'border-orange-500 bg-orange-500/10';
                            icon = <span className="text-orange-500 text-lg">!</span>;
                            textStyle = 'text-foreground font-medium';
                          } else {
                            borderStyle = 'border-border bg-muted/30';
                            textStyle = 'text-muted-foreground';
                          }
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-lg border-2 ${borderStyle}`}
                          >
                            <div className="flex items-center gap-2">
                              {icon}
                              <span className={`flex-1 ${textStyle}`}>
                                {option}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Объяснение */}
                    {questionData.explanation && (
                      <div className="bg-blue-500/10 rounded-lg p-4">
                        <p className="text-sm text-blue-500 font-semibold mb-2">Объяснение:</p>
                        <p className="text-foreground text-sm">{questionData.explanation.summary}</p>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}


