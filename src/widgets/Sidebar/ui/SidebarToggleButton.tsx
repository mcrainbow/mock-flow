import { reatomComponent } from '@reatom/react';
import { ArrowLeft } from 'lucide-react';
import { isSidebarOpenAtom } from '../model';

export const SidebarToggleButton = reatomComponent(() => {
  const isOpen = isSidebarOpenAtom();

  return (
    <button
      className="cursor-pointer p-2 hover:bg-background-secondary/50 rounded-md transition-colors"
      onClick={() => isSidebarOpenAtom.set(!isOpen)}
      aria-label={isOpen ? 'Закрыть sidebar' : 'Открыть sidebar'}
    >
      <ArrowLeft
        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? '' : 'delay-200 rotate-180'}`}
      />
    </button>
  );
});
