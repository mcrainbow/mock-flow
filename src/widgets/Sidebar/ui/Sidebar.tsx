import { reatomComponent } from '@reatom/react';
import { SidebarToggleButton } from './SidebarToggleButton';
import { motion, AnimatePresence } from 'motion/react';
import { isSidebarOpenAtom } from '../model';
import { SidebarClosed } from './SidebarStates/SidebarClosed';
import { SidebarOpen } from './SidebarStates/SidebarOpen';

export const Sidebar = reatomComponent(() => {
  const isOpen = isSidebarOpenAtom();

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isOpen ? 300 : 100,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
        delay: isOpen ? 0 : 0.2, // При закрытии ждем 0.2 сек (пока текст исчезнет)
      }}
      className="relative overflow-hidden border-r border-border bg-sidebar-background"
    >
      {/* Кнопка переключения - всегда видна */}
      <div className="absolute top-2 right-2 z-10">
        <SidebarToggleButton />
      </div>

      {/* Контент sidebar - показывается только когда открыт */}
      <AnimatePresence mode="wait">{isOpen && <SidebarOpen />}</AnimatePresence>

      {/* Узкая часть для иконок - показывается только когда закрыт */}
      <AnimatePresence mode="wait">{!isOpen && <SidebarClosed />}</AnimatePresence>
    </motion.aside>
  );
});
