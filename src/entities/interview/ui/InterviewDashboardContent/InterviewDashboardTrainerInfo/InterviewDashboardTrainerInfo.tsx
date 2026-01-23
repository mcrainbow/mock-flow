import { Link } from 'react-router-dom';
import { useUserStore } from '@entities/user/model/store';
import { Card } from '@/shared/ui';
import { PlayCircle, CheckCircle2, XCircle } from 'lucide-react';

export const InterviewDashboardTrainerInfo = () => {
  const user = useUserStore((state) => state.user);

  const completionRate = user.started_interviews > 0 
    ? Math.round((user.completed_interviews / user.started_interviews) * 100)
    : 0;

  return (
    <Card>
      {/* Заголовок с приветствием */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Привет, {user.name || 'Разработчик'}! 👋
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          {user.started_interviews === 0 
            ? "Готов начать свое первое собеседование?"
            : user.completed_interviews === user.started_interviews
            ? "Отличная работа! Все интервью завершены 🎉"
            : `Продолжай совершенствовать свои навыки`
          }
        </p>
      </div>

      {/* Краткая статистика */}
      <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-primary/5 rounded-lg border border-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Процент завершения</p>
            <p className="text-xl sm:text-2xl font-bold text-primary">{completionRate}%</p>
          </div>
          <div className="text-right">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Активность</p>
            <p className="text-base sm:text-lg font-semibold">
              {user.completed_interviews} / {user.started_interviews}
            </p>
          </div>
        </div>
        
        {/* Прогресс бар */}
        {user.started_interviews > 0 && (
          <div className="mt-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Быстрые действия */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/app/interview"
            className="p-3 sm:p-4 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/20 transition-colors no-underline"
          >
            <p className="text-sm sm:text-base font-semibold text-primary">🚀 Новое интервью</p>
            <p className="text-xs text-muted-foreground mt-1">Начать тренировку</p>
          </Link>
          <Link
            to="/app/my-interviews"
            className="p-3 sm:p-4 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border transition-colors no-underline"
          >
            <p className="text-sm sm:text-base font-semibold">📊 Мои интервью</p>
            <p className="text-xs text-muted-foreground mt-1">Смотреть историю</p>
          </Link>
        </div>
      </div>

      {/* Прогресс */}
      <div className="border-t border-border pt-4 sm:pt-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Ваша статистика</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Начато собеседований */}
          <div className="relative p-3 sm:p-0 bg-blue-500/5 sm:bg-transparent rounded-lg sm:rounded-none border sm:border-0 border-blue-500/10">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <p className="text-muted-foreground text-xs sm:text-sm font-medium">Всего попыток</p>
            </div>
            <p className="text-3xl sm:text-5xl font-bold">{user.started_interviews}</p>
            <p className="text-xs text-muted-foreground mt-1 sm:mt-2">Начатых интервью</p>
          </div>

          {/* Завершено */}
          <div className="relative p-3 sm:p-0 bg-green-500/5 sm:bg-transparent rounded-lg sm:rounded-none border sm:border-0 border-green-500/10">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <p className="text-muted-foreground text-xs sm:text-sm font-medium">Успешно</p>
            </div>
            <p className="text-3xl sm:text-5xl font-bold text-green-400">{user.completed_interviews}</p>
            <p className="text-xs text-muted-foreground mt-1 sm:mt-2">Завершенных интервью</p>
          </div>

          {/* Пропущено */}
          <div className="relative p-3 sm:p-0 bg-orange-500/5 sm:bg-transparent rounded-lg sm:rounded-none border sm:border-0 border-orange-500/10">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              <p className="text-muted-foreground text-xs sm:text-sm font-medium">Не завершено</p>
            </div>
            <p className="text-3xl sm:text-5xl font-bold text-orange-400">{user.skipped_interviews}</p>
            <p className="text-xs text-muted-foreground mt-1 sm:mt-2">Пропущенных интервью</p>
          </div>
        </div>

        {/* Мотивационный текст */}
        {user.started_interviews > 0 && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-foreground">
              {user.completed_interviews === 0 
                ? "💪 Отличное начало! Завершите первое интервью, чтобы увидеть свой прогресс"
                : user.completed_interviews >= 10
                ? `🎉 Потрясающе! Вы завершили ${user.completed_interviews} интервью. Продолжайте в том же духе!`
                : `🚀 Так держать! Уже ${user.completed_interviews} ${user.completed_interviews === 1 ? 'интервью' : 'интервью'} завершено`
              }
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
