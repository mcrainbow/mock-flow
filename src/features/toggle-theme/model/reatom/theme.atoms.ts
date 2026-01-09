import { atom, effect } from '@reatom/core';

type Theme = 'light' | 'dark';

export const themeAtom = atom<Theme>(
  (localStorage.getItem('theme') as Theme) ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  'themeAtom'
);

effect(() => {
  if (themeAtom() === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', themeAtom());
});
