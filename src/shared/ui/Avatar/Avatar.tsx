import { cn } from '@/shared/lib';
import { User } from 'lucide-react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type AvatarProps = {
  name?: string;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  className?: string;
  showStatus?: boolean;
  isOnline?: boolean;
};

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-2xl',
};

const iconSizeClasses: Record<AvatarSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

const getInitials = (name: string): string => {
  if (!name) return '';
  
  const words = name.trim().split(' ');
  
  if (words.length >= 2) {
    // Если есть 2+ слова, берем первые буквы первых двух слов
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  
  // Если одно слово, берем первые 2 буквы
  return name.slice(0, 2).toUpperCase();
};

export const Avatar = ({
  name,
  src,
  alt,
  size = 'md',
  className,
  showStatus = false,
  isOnline = false,
}: AvatarProps) => {
  const initials = name ? getInitials(name) : '';

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'rounded-full flex items-center justify-center font-semibold overflow-hidden',
          'bg-primary/20 text-primary border-2 border-primary/30',
          'transition-all duration-200',
          sizeClasses[size]
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="w-full h-full object-cover"
          />
        ) : initials ? (
          <span>{initials}</span>
        ) : (
          <User className={cn(iconSizeClasses[size])} />
        )}
      </div>

      {/* Статус онлайн (опционально) */}
      {showStatus && (
        <div
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-background',
            size === 'xs' && 'w-2 h-2',
            size === 'sm' && 'w-2.5 h-2.5',
            size === 'md' && 'w-3 h-3',
            size === 'lg' && 'w-3.5 h-3.5',
            size === 'xl' && 'w-4 h-4',
            isOnline ? 'bg-green-500' : 'bg-gray-500'
          )}
        />
      )}
    </div>
  );
};

