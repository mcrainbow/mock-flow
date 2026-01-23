import { InterviewListItem, InterviewListItemSkeleton } from '@entities/interview/ui';
import type { Interview } from '@entities/interview/model/types';
import { cn } from '@shared/lib';

type InterviewListProps = {
  interviews: Interview[];
  isLoading?: boolean;
  className?: string;
};

export function InterviewList({ interviews, isLoading = false, className }: InterviewListProps) {
  if (isLoading) {
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)}>
        {Array.from({ length: 6 }).map((_, index) => (
          <InterviewListItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (interviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold text-white mb-2">Собеседований пока нет</h3>
          <p className="text-gray-400 mb-6">
            Вы еще не проходили ни одного собеседования. Начните свое первое интервью прямо сейчас!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)}>
      {interviews.map((interview) => (
        <InterviewListItem key={interview.id} interview={interview} />
      ))}
    </div>
  );
}
