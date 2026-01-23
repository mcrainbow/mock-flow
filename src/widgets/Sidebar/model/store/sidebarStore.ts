import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
  devtools(
    (set) => ({
      isOpen: false,

      toggle: () =>
        set((state) => ({ isOpen: !state.isOpen }), false, 'toggle'),

      open: () =>
        set({ isOpen: true }, false, 'open'),

      close: () =>
        set({ isOpen: false }, false, 'close'),
    }),
    { name: 'sidebar-store' }
  )
);

