import { ArrowLeft } from 'lucide-react';
import { useSidebarStore } from '../../model/store';

export const SidebarToggleButton = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggle = useSidebarStore((state) => state.toggle);

  return (
    <button
      className="cursor-pointer p-2 hover:bg-background-secondary/50 rounded-md transition-colors"
      onClick={toggle}
      aria-label={isOpen ? 'Закрыть sidebar' : 'Открыть sidebar'}
      data-testid="sidebar-toggle-button"
    >
      <ArrowLeft
        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? '' : 'delay-200 rotate-180'}`}
      />
    </button>
  );
};
