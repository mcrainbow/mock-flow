import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Получить начальную тему
const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme') as Theme;
  if (savedTheme) return savedTheme;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set) => ({
        theme: getInitialTheme(),

        setTheme: (theme) => {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }

          set({ theme }, false, 'setTheme');
        },

        toggleTheme: () =>
          set(
            (state) => {
              const newTheme = state.theme === 'light' ? 'dark' : 'light';

              if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }

              return { theme: newTheme };
            },
            false,
            'toggleTheme'
          ),
      }),
      {
        name: 'theme-storage',
        onRehydrateStorage: () => (state) => {
          if (state?.theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        },
      }
    ),
    { name: 'theme-store' }
  )
);
