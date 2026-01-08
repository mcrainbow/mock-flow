import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { AppLink } from '@shared/ui';
import { ThemeToggleButton } from '@features/toggle-theme';

const TRANSPARENT_PATHS = ['/', '/login', '/register'];

export function Header() {
  const location = useLocation();
  const isTransparent = TRANSPARENT_PATHS.includes(location.pathname);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50',
        isTransparent ? 'bg-transparent' : 'bg-background-secondary'
      )}
    >
      <div className="container mx-auto py-5">
        <div className="flex items-center justify-between">
          <AppLink to="/asdafs" variant="empty">
            <img src="/logo-icon.png" alt="Logo" className="w-12 h-12" />
          </AppLink>
          <nav className="flex items-center lg:gap-10 gap-5 font-bold font-merriweather">
            <AppLink className="font-bold" to="/about">
              Про Нас
            </AppLink>
            <AppLink className="font-bold" to="/contact">
              Контакты
            </AppLink>
            <AppLink className="font-bold" to="/blog">
              Блог
            </AppLink>
          </nav>
          <div className="flex items-center gap-5">
            <AppLink to="/login" variant="as-button">
              Войти
            </AppLink>
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
}
