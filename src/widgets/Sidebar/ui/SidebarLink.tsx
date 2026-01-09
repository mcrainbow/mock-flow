import { cn } from '@/shared/lib';
import { AppLink } from '@/shared/ui';

interface SidebarLinkProps {
  children: React.ReactNode;
  to: string;
  className?: string;
}
export function SidebarLink({ children, to, className }: SidebarLinkProps) {
  return (
    <li>
      <AppLink
        to={to}
        variant="empty"
        className={cn(
          'text-foreground font-bold font-merriweather dark:hover:text-foreground-secondary/80 dark:hover:bg-background-secondary hover:bg-muted-light rounded-md hover:text-foreground/90 p-2 w-full hover:no-underline',
          className
        )}
      >
        {children}
      </AppLink>
    </li>
  );
}
