import {
  DashboardLastInterview,
  InterviewDashboardTrainerInfo,
} from '@entities/interview/ui/InterviewDashboardContent';

export default function InterviewDashboardPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 sm:gap-6 max-w-7xl mx-auto">
        <InterviewDashboardTrainerInfo />
        <DashboardLastInterview />
      </div>
    </div>
  );
}
