import { Card } from '@/shared/ui';
import { Link } from 'react-router-dom';

export function InterviewDescriptionCard() {
  return (
    <Card className="w-full lg:w-1/2">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Тренажер собеседований</h1>

      <ul className="space-y-3 mb-6 sm:mb-8">
        <li className="flex items-start gap-2 sm:gap-3 mt-3 sm:mt-4">
          <span className="text-primary text-lg">•</span>
          <span className="text-sm sm:text-base text-foreground-secondary">Выбирай направление и уровень вопросов</span>
        </li>

        <li className="flex items-start gap-2 sm:gap-3 mt-3 sm:mt-4">
          <span className="text-primary text-lg">•</span>
          <span className="text-sm sm:text-base text-foreground-secondary">
            Закрепляй знания со случайно подобранными вопросами по выбранным темам
          </span>
        </li>

        <li className="flex items-start gap-2 sm:gap-3 mt-3 sm:mt-4">
          <span className="text-primary text-lg">•</span>
          <span className="text-sm sm:text-base text-foreground-secondary">
            Отслеживай свой прогресс в{' '}
            <Link to="/app/dashboard" className="text-primary hover:text-primary/80 transition">
              Доске прогресса
            </Link>
          </span>
        </li>

        <li className="flex items-start gap-2 sm:gap-3 mt-3 sm:mt-4">
          <span className="text-primary text-lg">•</span>
          <span className="text-sm sm:text-base text-foreground-secondary">
            Закрепляй знания с помощью{' '}
            <Link
              to="/questions-database"
              className="text-primary hover:text-primary/80  transition"
            >
              Базы с вопросами
            </Link>
          </span>
        </li>
      </ul>

      <div className="border-t border-border pt-4 sm:pt-6">
        <h2 className="text-lg sm:text-xl text-warning font-semibold mb-3 sm:mb-4">Детали по режимам</h2>

        <div>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-warning text-lg">•</span>
              <p className="text-sm sm:text-base text-foreground-secondary">
                Выбирай режим <span className="text-primary font-bold underline">Текстовый</span>{' '}
                или <span className="text-primary font-bold underline">С Выбором Ответов</span>
              </p>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-warning text-lg">•</span>
              <p className="text-sm sm:text-base text-foreground-secondary">
                При начале собеседования нужно подождать пока мы подготовим вопросы
              </p>
            </li>

            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-warning text-lg">•</span>
              <p className="text-sm sm:text-base text-foreground-secondary">
                В <span className="text-primary font-bold underline">Текстовом</span> режиме вам
                дает вопрос, вы на него отвечаете и ждете, пока наша модель его проверит и даст вам
                фидбек. После ответов на все вопросы вы получаете общую оценку за собеседование
              </p>
            </li>

            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-warning text-lg">•</span>
              <p className="text-sm sm:text-base text-foreground-secondary">
                В режиме <span className="text-primary font-bold underline">С Выбором Ответов</span>{' '}
                вам дается список вопросов и вы выбираете парвильные ответы(1 или несколько).
                Результат видите сразу после ответа.
              </p>
            </li>

            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-warning text-lg">•</span>
              <p className="text-sm sm:text-base text-foreground-secondary">
                У всех вопросов есть кнопка "Пропустить", но учтите, если вы ее нажмете вы получите
                0 баллов за вопрос.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
