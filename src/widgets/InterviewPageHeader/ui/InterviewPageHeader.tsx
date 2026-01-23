import { Select } from '@/shared/ui';
import {
  useInterviewStore,
  type Level,
  type Technology,
} from '@entities/interview/model/store/interviewStore';
import { InterviewHeaderToggleBtn } from '@entities/interview';

export const InterviewPageHeader = () => {
  const { interviewType, level, technology, count } = useInterviewStore();
  const { setInterviewType, setLevel, setTechnology, setCount } = useInterviewStore();

  return (
    <header>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-10">
        {/* Переключатель типа интервью - на мобильных занимает всю ширину, на lg+ в общем ряду */}
        <div className="w-full lg:w-auto flex justify-center">
          <InterviewHeaderToggleBtn
            interviewType={interviewType}
            setInterviewType={setInterviewType}
          />
        </div>

        {/* Три селекта в отдельном контейнере - всегда вместе */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
          <Select
            label="Технологии"
            value={technology}
            id="technology"
            onChange={(value) => setTechnology(value as Technology)}
            options={['JavaScript', 'FSD Структура', 'React', 'TypeScript', 'Next.js', 'Git']}
          />

          <Select
            label="Уровень Вопросов"
            value={level}
            id="level"
            onChange={(value) => setLevel(value as Level)}
            options={['Junior', 'Junior+', 'Middle', 'Middle+', 'Senior']}
          />

          <Select
            label="Количество Вопросов"
            value={count.toString()}
            id="count"
            onChange={(value) => setCount(parseInt(value))}
            options={['1', '3', '5']}
            conditionalOptions={[{ value: '10', condition: interviewType === 'С выбором ответов' }]}
          />
        </div>
      </div>
    </header>
  );
};
