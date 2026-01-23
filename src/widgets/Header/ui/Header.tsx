import { cn } from '@/shared/lib';
import { useLocation, Link } from 'react-router-dom';
import { AppLink, Avatar } from '@shared/ui';
import { ThemeToggleButton } from '@features/toggle-theme';
import { GuestRoutesTypes } from '@/shared/lib';
import { useUserStore } from '@/entities/user/model/store';
import { useSidebarStore } from '@/widgets/Sidebar/model/store';
import { Menu } from 'lucide-react';

const TRANSPARENT_PATHS = [GuestRoutesTypes.HOME, GuestRoutesTypes.LOGIN, GuestRoutesTypes.SIGNUP];

export function Header() {
  const location = useLocation();
  const isTransparent = TRANSPARENT_PATHS.includes(location.pathname as GuestRoutesTypes);
  const isAuthed = useUserStore((state) => state.isAuthed);
  const user = useUserStore((state) => state.user);
  const toggleSidebar = useSidebarStore((state) => state.toggle);

  // Показываем hamburger menu только для авторизованных пользователей на мобильных
  const showHamburger = isAuthed && !isTransparent;

  return (
    <header
      className={cn(
        isTransparent
          ? 'bg-transparent fixed top-0 left-0 right-0 z-50 px-4'
          : 'relative bg-background-secondary dark:bg-background-secondary px-4'
      )}
    >
      <div className="container mx-auto py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger menu - только на мобильных */}
            {showHamburger && (
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6 text-primary" />
              </button>
            )}

            <AppLink to="/" variant="empty">
              <img src="/logo-icon.png" alt="Logo" className="w-12 h-12" />
            </AppLink>
          </div>
          <nav className="hidden items-center lg:gap-10 gap-5 font-bold font-merriweather md:flex">
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
              <Link
                to="/app/profile"
                className="transition-transform hover:scale-110"
                title={user.name || 'Профиль'}
              >
                <Avatar name={user.name} src={user.avatar} size="md" />
              </Link>
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
