import { Card } from '@shared/ui';
import { cn } from '@shared/lib';
import type { Interview } from '../../model/types';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, Trophy, Target, CheckCircle, XCircle, MinusCircle } from 'lucide-react';

type InterviewListItemProps = {
  interview: Interview;
  className?: string;
};

export function InterviewListItem({ interview, className }: InterviewListItemProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}м ${remainingSeconds}с`;
  };

  const getStatusConfig = (status: Interview['status']) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Завершено',
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
        };
      case 'in_progress':
        return {
          label: 'В процессе',
          icon: MinusCircle,
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10',
        };
      case 'skipped':
        return {
          label: 'Пропущено',
          icon: XCircle,
          color: 'text-orange-500',
          bgColor: 'bg-orange-500/10',
        };
    }
  };

  const getDifficultyColor = (difficulty: Interview['difficulty']) => {
    switch (difficulty) {
      case 'junior':
        return 'text-green-400';
      case 'junior+':
        return 'text-green-300';
      case 'middle':
        return 'text-yellow-400';
      case 'middle+':
        return 'text-orange-400';
      case 'senior':
        return 'text-red-400';
    }
  };

  const statusConfig = getStatusConfig(interview.status);
  const StatusIcon = statusConfig.icon;

  const handleClick = () => {
    if (interview.status === 'completed') {
      navigate(`/app/interview/${interview.id}/results`);
    } else if (interview.status === 'in_progress') {
      navigate(`/app/interview/${interview.id}`);
    }
  };

  const isClickable = interview.status === 'completed' || interview.status === 'in_progress';

  return (
    <Card
      className={cn(
        'p-6 transition-all duration-200',
        isClickable && 'cursor-pointer hover:shadow-2xl hover:scale-[1.02]',
        className
      )}
      onClick={isClickable ? handleClick : undefined}
    >
      <div className="flex flex-col gap-4">
        {/* Заголовок с категорией и статусом */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{interview.category}</h3>
            <p className={cn('text-sm font-medium', getDifficultyColor(interview.difficulty))}>
              {interview.difficulty.toUpperCase()}
            </p>
          </div>
          <div
            className={cn(
              'flex items-center gap-2 px-3 py-1 rounded-full',
              statusConfig.bgColor
            )}
          >
            <StatusIcon className={cn('w-4 h-4', statusConfig.color)} />
            <span className={cn('text-sm font-medium', statusConfig.color)}>
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-gray-300">
            <Target className="w-4 h-4" />
            <span className="text-sm">
              {interview.correct_answers_count} / {interview.total_questions} правильных
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">Балл: {interview.score.toFixed(1)} / 10</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{formatTime(interview.total_time_spent)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="w-4 h-4" />
            <span className="text-sm text-xs">
              {interview.interview_type === 'checkbox' ? 'С выбором' : 'Открытые'}
            </span>
          </div>
        </div>

        {/* Дата */}
        <div className="pt-2 border-t border-muted/20">
          <p className="text-xs text-gray-400">Начато: {formatDate(interview.started_at)}</p>
          {interview.completed_at && (
            <p className="text-xs text-gray-400">
              Завершено: {formatDate(interview.completed_at)}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

