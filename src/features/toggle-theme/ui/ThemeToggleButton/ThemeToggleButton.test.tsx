import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeToggleButton } from './ThemeToggleButton';
import userEvent from '@testing-library/user-event';
import { context } from '@reatom/core';
import { themeAtom } from '../../model/reatom/theme.atoms';

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
    context.reset();
  });

  test('использует системную тему dark при первом открытии', () => {
    themeAtom.set('dark');

    const { container } = render(<ThemeToggleButton />);

    expect(screen.getByRole('button')).toHaveAttribute('title', 'Light mode');
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('отрендеривается с начальной темой light', () => {
    localStorage.setItem('theme', 'light');

    const { container } = render(<ThemeToggleButton />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();

    expect(button).toHaveAttribute('title', 'Dark mode');
    expect(container).toMatchSnapshot();
  });

  test('отрендеривается с начальной темой dark', () => {
    themeAtom.set('dark');

    render(<ThemeToggleButton />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'Light mode');
  });

  test('переключает тему при клике', async () => {
    themeAtom.set('light');

    render(<ThemeToggleButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Dark mode');

    await userEvent.click(button);
    expect(button).toHaveAttribute('title', 'Light mode');

    await userEvent.click(button);
    expect(button).toHaveAttribute('title', 'Dark mode');
  });

  test('добавляет класс dark на документ при рендере и убирает при переключении', async () => {
    themeAtom.set('dark');

    render(<ThemeToggleButton />);
    const button = screen.getByRole('button');

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();

    await userEvent.click(button);

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  test('Тестирование быстрого переключения темы пользователем - триплклик', async () => {
    themeAtom.set('light');

    render(<ThemeToggleButton />);
    const button = screen.getByRole('button');

    await userEvent.tripleClick(button);

    expect(button).toHaveAttribute('title', 'Light mode');
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });
});
