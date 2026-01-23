import { useGetUserInterviews } from '@entities/interview/model/hooks';
import { InterviewList } from '@widgets/InterviewList';
import { PageError } from '@widgets/PageError';

export default function UserInterviewsPage() {
  const { data: interviews, isLoading, error } = useGetUserInterviews();

  if (error) {
    return <PageError />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Мои собеседования</h1>
        <p className="text-gray-400">
          {!isLoading && interviews && `Всего пройдено: ${interviews.length}`}
        </p>
      </div>

      {/* Список собеседований */}
      <InterviewList interviews={interviews || []} isLoading={isLoading} />
    </div>
  );
}

