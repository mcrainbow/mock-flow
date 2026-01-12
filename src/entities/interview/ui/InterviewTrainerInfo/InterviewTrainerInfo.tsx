import { Link } from 'react-router-dom';
import { userInfoAtom } from '@entities/user/model/';

export const InterviewTrainerInfo = () => {
  return (
    <div className="bg-background-secondary rounded-2xl p-8 text-white shadow-xl w-1/2">
      {/* Заголовок */}
      <h1 className="text-3xl font-bold mb-6">Тренажер собеседований</h1>

      {/* Список инструкций */}
      <ul className="space-y-3 mb-8">
        <li className="flex items-start gap-3">
          <span className="text-primary mt-1">•</span>
          <span className="text-foreground-secondary">
            Выбирай направление и категории вопросов
          </span>
        </li>

        <li className="flex items-start gap-3">
          <span className="text-primary mt-1">•</span>
          <span className="text-foreground-secondary">
            Закрепляй знания со случайно подобранными вопросами по выбранным темам
          </span>
        </li>

        <li className="flex items-start gap-3">
          <span className="text-primary mt-1">•</span>
          <span className="text-foreground-secondary">Отслеживай свой прогресс</span>
        </li>

        <li className="flex items-start gap-3">
          <span className="text-primary mt-1">•</span>
          <span className="text-foreground-secondary">
            Закрепляй знания с помощью{' '}
            <Link
              to="/questions-database"
              className="text-primary underline hover:text-purple-300 transition"
            >
              Базы с вопросами
            </Link>
          </span>
        </li>
      </ul>

      {/* Прогресс */}
      <div className="border-t border-border pt-6">
        <h2 className="text-xl font-semibold mb-4">Прогресс по собеседованиям</h2>

        <div className="grid grid-cols-3 gap-6">
          {/* Начато собеседований */}
          <div>
            <p className="text-muted-foreground text-sm mb-2">Начато собеседований</p>
            <p className="text-5xl font-bold">{userInfoAtom().user.started_interviews}</p>
          </div>

          {/* Завершено */}
          <div>
            <p className="text-muted-foreground text-sm mb-2">Завершено</p>
            <p className="text-5xl font-bold text-green-400">
              {userInfoAtom().user.completed_interviews}
            </p>
          </div>
          {/* Завершено */}
          <div>
            <p className="text-muted-foreground text-sm mb-2">Пропущено</p>
            <p className="text-5xl font-bold text-warning">
              {userInfoAtom().user.skipped_interviews}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
