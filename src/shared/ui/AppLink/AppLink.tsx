import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib';

type AppLinkVariants = 'primary' | 'secondary' | 'as-button' | 'empty';

interface AppLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  variant?: AppLinkVariants;
}

const variantClasses = {
  primary: 'text-primary hover:text-primary/80',
  secondary: 'text-secondary hover:text-secondary/80',
  'as-button':
    'px-2 py-1 bg-primary text-primary-foreground hover:bg-primary/80 rounded-md hover:no-underline',
  empty: '',
};

export function AppLink(props: AppLinkProps) {
  const { to, children, className, variant = 'primary' } = props;

  if (variant === 'empty') {
    return <Link to={to}>{children}</Link>;
  }

  return (
    <Link
      to={to}
      className={cn(
        'font-semibold inline-flex items-center gap-1',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
