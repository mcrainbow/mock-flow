import { Button } from '@/shared/ui';
import { useTheme } from '@shared/context';
import { Sun, Moon } from 'lucide-react';
import { ButtonVariant } from '@shared/lib';
import { AnimatePresence, motion } from 'motion/react';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant={ButtonVariant.OUTLINE}
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      className="p-1"
    >
      <div style={{ position: 'relative', width: 24, height: 24 }}>
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ position: 'absolute', inset: 0 }}
              data-testid="moon-icon"
            >
              <Moon size={24} className="text-blue-800" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, scale: 0.6, rotate: 90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: -90 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ position: 'absolute', inset: 0 }}
              data-testid="sun-icon"
            >
              <Sun size={24} className="text-yellow-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Button>
  );
}
