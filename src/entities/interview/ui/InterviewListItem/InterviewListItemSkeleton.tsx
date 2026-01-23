import { Card, Skeleton } from '@shared/ui';
import { cn } from '@shared/lib';

type InterviewListItemSkeletonProps = {
  className?: string;
};

export function InterviewListItemSkeleton({ className }: InterviewListItemSkeletonProps) {
  return (
    <Card className={cn('p-6', className)}>
      <div className="flex flex-col gap-4">
        {/* Заголовок */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>

        {/* Дата */}
        <div className="pt-2 border-t border-muted/20">
          <Skeleton className="h-3 w-64 mb-1" />
          <Skeleton className="h-3 w-56" />
        </div>
      </div>
    </Card>
  );
}

