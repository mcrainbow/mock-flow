import { InterviewContentStatic } from '@widgets/Interview';
import { InterviewPageHeader } from '@widgets/InterviewPageHeader/';

export default function InterviewPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <InterviewPageHeader />
        <InterviewContentStatic />
      </div>
    </div>
  );
}
