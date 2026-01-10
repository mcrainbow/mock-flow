import { motion } from 'motion/react';
import { SidebarLink } from '../SidebarLink';
import { UserRoutesTypes } from '@shared/lib';

export function SidebarOpen() {
  return (
    <motion.div
      key="sidebar-content"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.2,
          ease: 'easeInOut',
          delay: 0.3, // При открытии появляется после изменения width
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.2,
          ease: 'easeInOut',
          delay: 0, // При закрытии исчезает сразу
        },
      }}
      className="h-full overflow-y-auto px-4 py-8"
    >
      <div>
        <h3>Меню</h3>
        <nav className="mt-10 mb-5">
          <ul className="flex flex-col gap-2">
            <SidebarLink to={UserRoutesTypes.INTERVIEW}>Тренировка</SidebarLink>
            <SidebarLink to={UserRoutesTypes.DASHBOARD}>Доска Результатов</SidebarLink>
            <SidebarLink to={UserRoutesTypes.PROFILE}>Профиль</SidebarLink>
          </ul>
        </nav>
        <hr />
        <nav className="mt-5">
          <ul className="flex flex-col gap-2">
            <SidebarLink to={UserRoutesTypes.SETTINGS}>Настройки</SidebarLink>
          </ul>
        </nav>
      </div>
    </motion.div>
  );
}
