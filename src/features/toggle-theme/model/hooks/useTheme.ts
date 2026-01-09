import { themeAtom } from '../reatom/theme.atoms';

export const useTheme = () => {
  const theme = themeAtom();
  function toggleTheme() {
    themeAtom.set(themeAtom() === 'light' ? 'dark' : 'light');
  }
  return {
    theme,
    toggleTheme,
  };
};
