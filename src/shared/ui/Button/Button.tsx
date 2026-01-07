import clsx from 'clsx';
import { ButtonVariant } from '@shared/lib/types/Button.types';

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  loading?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };

const variantClasses = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed min-w-40',
  ghost:
    'bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed',
  danger:
    'bg-destructive text-destructive-foreground hover:bg-destructive/80 disabled:opacity-50 disabled:cursor-not-allowed',
  outline: 'text-primary hover:bg-primary/15 disabled:opacity-50 disabled:cursor-not-allowed',
};

const sizeClasses = {
  sm: 'px-1 py-1 text-sm rounded-md',
  md: 'px-2 py-1 text-base rounded-md',
  lg: 'px-3 py-2 text-lg rounded-md',
};

export function Button({
  children,
  variant = ButtonVariant.PRIMARY,
  onClick,
  size = 'md',
  disabled = false,
  className = '',
  loading = false,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      className={clsx(
        'cursor-pointer w-fit h-fit font-semibold',
        loading && 'opacity-50 cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      type="button"
      disabled={isDisabled}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
