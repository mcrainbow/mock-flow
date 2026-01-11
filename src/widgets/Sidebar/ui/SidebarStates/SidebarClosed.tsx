import { motion } from 'motion/react';
import { GraduationCap, ChartBarIncreasing, CircleUserRound, Settings } from 'lucide-react';
import { SidebarLink } from '../SidebarElements/SidebarLink';
import { UserRoutesTypes } from '@shared/lib';

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
          <SidebarLink to={UserRoutesTypes.INTERVIEW}>
            <GraduationCap />
          </SidebarLink>
          <SidebarLink to={UserRoutesTypes.DASHBOARD}>
            <ChartBarIncreasing />
          </SidebarLink>
          <SidebarLink to={UserRoutesTypes.PROFILE}>
            <CircleUserRound />
          </SidebarLink>
        </ul>
      </nav>
      <hr className="w-full" />
      <nav>
        <ul className="flex flex-col gap-2">
          <SidebarLink to={UserRoutesTypes.SETTINGS}>
            <Settings />
          </SidebarLink>
        </ul>
      </nav>
    </motion.div>
  );
}
