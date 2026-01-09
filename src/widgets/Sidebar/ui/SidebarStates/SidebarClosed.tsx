import { motion } from 'motion/react';
import { GraduationCap, ChartBarIncreasing, CircleUserRound, Settings } from 'lucide-react';
import { SidebarLink } from '../SidebarLink';

export function SidebarClosed() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
        ease: 'easeInOut',
        delay: 0.3,
      }}
      className="h-full flex flex-col items-center justify-start pt-20 px-2 gap-4"
    >
      <nav>
        <ul className="flex flex-col gap-2">
          <SidebarLink to="dashboard">
            <GraduationCap />
          </SidebarLink>
          <SidebarLink to="dashboard">
            <ChartBarIncreasing />
          </SidebarLink>
          <SidebarLink to="dashboard">
            <CircleUserRound />
          </SidebarLink>
        </ul>
      </nav>
      <hr className="w-full" />
      <nav>
        <ul className="flex flex-col gap-2">
          <SidebarLink to="dashboard">
            <Settings />
          </SidebarLink>
        </ul>
      </nav>
    </motion.div>
  );
}
