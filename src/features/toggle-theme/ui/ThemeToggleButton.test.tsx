import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeToggleButton } from './ThemeToggleButton';
import { ThemeProvider } from '@shared/context';
import userEvent from '@testing-library/user-event';

function renderWithThemeProvider(component: React.ReactNode) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

function mockSystemTheme(theme: 'dark' | 'light') {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === `(prefers-color-scheme: ${theme})`,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe('ThemeToggleButton', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  test('использует системную тему dark при первом открытии', () => {
    mockSystemTheme('dark');

    const { container } = renderWithThemeProvider(<ThemeToggleButton />);

    expect(screen.getByRole('button')).toHaveAttribute('title', 'Light mode');
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('отрендеривается с начальной темой light', () => {
    localStorage.setItem('theme', 'light');

    const { container } = renderWithThemeProvider(<ThemeToggleButton />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();

    expect(button).toHaveAttribute('title', 'Dark mode');
    expect(container).toMatchSnapshot();
  });

  test('отрендеривается с начальной темой dark', () => {
    localStorage.setItem('theme', 'dark');

    renderWithThemeProvider(<ThemeToggleButton />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'Light mode');
  });

  test('переключает тему при клике', async () => {
    localStorage.setItem('theme', 'light');

    renderWithThemeProvider(<ThemeToggleButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Dark mode');

    await userEvent.click(button);
    expect(button).toHaveAttribute('title', 'Light mode');
    expect(localStorage.getItem('theme')).toBe('dark');

    await userEvent.click(button);
    expect(button).toHaveAttribute('title', 'Dark mode');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  test('добавляет класс dark на документ при рендере и убирает при переключении', async () => {
    localStorage.setItem('theme', 'dark');

    renderWithThemeProvider(<ThemeToggleButton />);
    const button = screen.getByRole('button');

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();

    await userEvent.click(button);

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('Тестирование быстрого переключения темы пользователем - триплклик', async () => {
    localStorage.setItem('theme', 'light');

    renderWithThemeProvider(<ThemeToggleButton />);
    const button = screen.getByRole('button');

    await userEvent.tripleClick(button);

    expect(button).toHaveAttribute('title', 'Light mode');
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
