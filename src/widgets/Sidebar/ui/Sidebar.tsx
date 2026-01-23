import { SidebarToggleButton } from './SidebarElements/SidebarToggleButton';
import { motion, AnimatePresence } from 'motion/react';
import { useSidebarStore } from '../model/store';
import { SidebarClosed } from './SidebarStates/SidebarClosed';
import { SidebarOpen } from './SidebarStates/SidebarOpen';
import { useEffect } from 'react';

export const Sidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const close = useSidebarStore((state) => state.close);

  // Закрыть sidebar при изменении размера окна на десктоп
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        close();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [close]);

  return (
    <>
      {/* Backdrop - только на мобильных когда открыт */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 300 : 100,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
          delay: isOpen ? 0 : 0.2,
        }}
        className="max-lg:hidden relative overflow-hidden border-r border-border bg-sidebar-background h-full"
      >
        {/* Кнопка переключения - только на десктопе */}
        <div className="absolute top-2 right-2 z-10">
          <SidebarToggleButton />
        </div>

        {/* Контент sidebar */}
        <AnimatePresence mode="wait">{isOpen && <SidebarOpen />}</AnimatePresence>
        <AnimatePresence mode="wait">{!isOpen && <SidebarClosed />}</AnimatePresence>
      </motion.aside>

      {/* Sidebar - Mobile */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{
          x: isOpen ? 0 : -300,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className="min-[1024px]:hidden fixed top-0 left-0 w-[300px] h-full z-50 overflow-hidden border-r border-border bg-sidebar-background"
      >
        {/* Контент sidebar - на мобильных всегда открытый вид */}
        <SidebarOpen />
      </motion.aside>
    </>
  );
};
