import { LoadingText, LoadingFacts } from '@shared/ui';
import { INTERVIEW_LOADING_FACTS } from '@shared/lib';

export function InterviewCardLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-20 px-6 py-10">
      <LoadingText className="text-xl font-bold text-center" text="Идет загрузка собеседования" />

      <div className="max-w-2xl w-full">
        <LoadingFacts facts={INTERVIEW_LOADING_FACTS} interval={5000} className="text-base" />
      </div>
    </div>
  );
}
