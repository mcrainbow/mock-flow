import { Card } from '@/shared/ui';
import { useInterviewStore } from '@entities/interview/';
import { StartInterviewButton } from '@features/start-interview/';

export function InterviewFiltersDescription() {
  const { level, technology, count, interviewType } = useInterviewStore();

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-5">
      <Card>
        <h2 className="text-xl sm:text-2xl font-bold">Вы выбрали:</h2>
        <ul className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-5 text-base sm:text-lg">
          <li className="flex items-center gap-2">
            <span className="text-primary">Сложность:</span>
            <span className="text-foreground-secondary font-semibold">{level}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">Технология:</span>
            <span className="text-foreground-secondary font-semibold">{technology}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">Количество вопросов:</span>
            <span className="text-foreground-secondary font-semibold">{count}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">Тип вопроса:</span>
            <span className="text-foreground-secondary font-semibold">{interviewType}</span>
          </li>
        </ul>
      </Card>
      {interviewType === 'С выбором ответов' ? (
        <Card>
          <h2 className="text-xl sm:text-2xl font-bold text-warning">Уточнение:</h2>
          <ul className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-5">
            <li>
              <p className="text-foreground-secondary font-semibold text-base sm:text-lg">
                Вы выбрали собседование типа {interviewType}:
              </p>
            </li>
            <li>
              <p className="text-sm sm:text-base text-muted-foreground">
                Выбирайте правильные ответы, читайте объяснение от AI после ответа
              </p>
            </li>
            <li>
              <p className="text-sm sm:text-base text-muted-foreground">
                После полного прохождения собеседования вы получите оценку(процент правильных
                ответов)
              </p>
            </li>
            <li>
              <p className="text-sm sm:text-base text-muted-foreground">
                Если вы пропустили вопрос то вы автоматически получаете ноль баллов за него,
                вернуться уже будет нельзя
              </p>
            </li>
          </ul>
        </Card>
      ) : (
        <Card>
          <h2 className="text-xl sm:text-2xl font-bold text-warning">Уточнение:</h2>
          <ul className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-5">
            <li>
              <p className="text-foreground-secondary font-semibold text-base sm:text-lg">
                Вы выбрали собседование типа {interviewType}:
              </p>
            </li>
            <li>
              <p className="text-sm sm:text-base text-muted-foreground">
                Отвечайте максимальн оподробно на вопрос от AI
              </p>
            </li>
            <li>
              <p className="text-sm sm:text-base text-muted-foreground">
                После полного прохождения собеседования вы получите оценку
              </p>
            </li>
            <li>
              <p className="text-sm sm:text-base text-muted-foreground">
                Если вы пропустили вопрос то вы автоматически получаете ноль баллов за него,
                вернуться уже будет нельзя
              </p>
            </li>
          </ul>
        </Card>
      )}
      <StartInterviewButton />
    </div>
  );
}
