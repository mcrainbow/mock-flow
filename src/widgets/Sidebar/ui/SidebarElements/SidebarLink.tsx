import { cn } from '@/shared/lib';
import { NavLink } from 'react-router-dom';

interface SidebarLinkProps {
  children: React.ReactNode;
  to: string;
  className?: string;
}
export function SidebarLink({ children, to, className }: SidebarLinkProps) {
  return (
    <li>
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          cn(
            // ✅ Базовые стили для блочного элемента
            'block w-full p-2',
            // ✅ Стили текста и hover
            'text-foreground font-bold font-merriweather',
            'rounded-md no-underline',
            // ✅ Hover стили
            'hover:bg-muted-light hover:text-foreground/90',
            'dark:hover:text-foreground-secondary/80 dark:hover:bg-background-secondary',
            // ✅ Стили для активной ссылки
            isActive &&
              'bg-muted text-foreground dark:text-foreground-secondary/80 dark:bg-background-secondary',
            className
          )
        }
        // ✅ Отключаем дефолтные inline стили
        style={undefined}
      >
        {children}
      </NavLink>
    </li>
  );
}
