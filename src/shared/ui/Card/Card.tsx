import { cn } from '@/shared/lib/utils/cn/cn';

type CardProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-muted dark:bg-background-secondary rounded-2xl p-8 text-white shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
