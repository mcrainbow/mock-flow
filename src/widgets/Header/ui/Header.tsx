import { cn } from '@/shared/lib';
import { useLocation } from 'react-router-dom';
import { AppLink } from '@shared/ui';
import { ThemeToggleButton } from '@features/toggle-theme';
import { GuestRoutesTypes } from '@/shared/lib';
import { userInfoAtom } from '@/entities/user';

const TRANSPARENT_PATHS = [GuestRoutesTypes.HOME, GuestRoutesTypes.LOGIN, GuestRoutesTypes.SIGNUP];

export function Header() {
  const location = useLocation();
  const isTransparent = TRANSPARENT_PATHS.includes(location.pathname as GuestRoutesTypes);
  const { isAuthed } = userInfoAtom();

  return (
    <header
      className={cn(
        isTransparent
          ? 'bg-transparent fixed top-0 left-0 right-0 z-50'
          : 'relative bg-background-secondary dark:bg-background-secondary'
      )}
    >
      <div className="container mx-auto py-5">
        <div className="flex items-center justify-between">
          <AppLink to="/" variant="empty">
            <img src="/logo-icon.png" alt="Logo" className="w-12 h-12" />
          </AppLink>
          <nav className="flex items-center lg:gap-10 gap-5 font-bold font-merriweather">
            <AppLink className="font-bold text-primary uppercase" to="/about">
              Про Нас
            </AppLink>
            <AppLink className="font-bold text-primary uppercase" to="/contact">
              Контакты
            </AppLink>
            <AppLink className="font-bold text-primary uppercase" to="/blog">
              Блог
            </AppLink>
          </nav>
          <div className="flex items-center gap-5">
            {isAuthed ? (
              <AppLink to="profile" variant="as-button">
                Профиль
              </AppLink>
            ) : (
              <AppLink to={GuestRoutesTypes.LOGIN} variant="as-button">
                Войти
              </AppLink>
            )}
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
}
