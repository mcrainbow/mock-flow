import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@shared/ui';
import { ButtonVariant } from '@shared/lib';
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
          <Link to="/dwvwd">
            <img src="/logo-icon.png" alt="Logo" className="w-12 h-12" />
          </Link>
          <nav className="flex items-center lg:gap-10 gap-5 font-bold font-merriweather">
            <Link to="/about">Про Нас</Link>
            <Link to="/contact">Контакты</Link>
            <Link to="/blog">Блог</Link>
          </nav>
          <div className="flex items-center gap-5">
            <Button variant={ButtonVariant.PRIMARY}>Войти</Button>
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
}
