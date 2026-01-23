import { InterviewFiltersDescription } from '@entities/interview/ui/InterviewPageContent';
import { InterviewDescriptionCard } from '@widgets/InterviewDescriptionCard';

export function InterviewContentStatic() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
      <InterviewDescriptionCard />
      <InterviewFiltersDescription />
    </div>
  );
}
