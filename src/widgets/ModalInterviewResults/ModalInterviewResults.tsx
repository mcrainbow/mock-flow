import { Button } from '@/shared/ui';
import { Check, Clock, Target } from 'lucide-react';

interface ModalInterviewResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  totalTimeSpent: number; // в секундах
  interviewType: 'checkbox' | 'text';
  onClose?: () => void; // Коллбэк для закрытия модалки
}

export function ModalInterviewResults({
  score,
  totalQuestions,
  correctAnswers,
  totalTimeSpent,
  interviewType,
  onClose,
}: ModalInterviewResultsProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 9) return 'Отлично! 🎉';
    if (score >= 7) return 'Хорошо! 👍';
    if (score >= 5) return 'Неплохо 👌';
    return 'Нужно подтянуть 📚';
  };

  return (
    <div className="p-6 sm:p-8">
      {/* Заголовок */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">Собеседование завершено!</h2>
        <p className="text-muted-foreground">Вот ваши результаты</p>
      </div>

      {/* Основной балл */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-8 border-primary/20 flex items-center justify-center">
            <span className={`text-5xl font-bold ${getScoreColor(score)}`}>{score.toFixed(1)}</span>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-background px-3 py-1 rounded-full border border-border">
            <span className="text-sm text-muted-foreground">из 10</span>
          </div>
        </div>
        <p className="text-xl font-semibold mt-4">{getScoreMessage(score)}</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Правильные ответы */}
        <div className="bg-muted/30 rounded-lg p-4 flex items-start gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <Check className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {interviewType === 'checkbox' ? 'Правильных' : 'Отличных (>7)'}
            </p>
            <p className="text-2xl font-bold text-foreground">
              {correctAnswers}/{totalQuestions}
            </p>
          </div>
        </div>

        {/* Время */}
        <div className="bg-muted/30 rounded-lg p-4 flex items-start gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Время</p>
            <p className="text-2xl font-bold text-foreground">{formatTime(totalTimeSpent)}</p>
          </div>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="bg-primary/5 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Совет:</p>
            <p className="text-sm text-muted-foreground">
              {score >= 8
                ? 'Отличный результат! Вы готовы к собеседованию.'
                : 'Рекомендуем повторить материал и попробовать снова.'}
            </p>
          </div>
        </div>
      </div>

      {/* Кнопка закрытия */}
      <Button
        onClick={onClose}
        className="w-full py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Вернуться к списку интервью
      </Button>
    </div>
  );
}
