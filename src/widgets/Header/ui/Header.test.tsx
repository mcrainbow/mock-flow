import { Header } from './Header';
import { describe, test, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { userInfoAtom } from '@/entities/user';
import { customRender } from '@shared/config/tests';

const renderWithPath = (path: string) => {
  return customRender(<Header />, { initialEntries: [path] });
};

describe('Header', () => {
  beforeEach(() => {
    // Сбрасываем атом к начальному состоянию перед каждым тестом
    userInfoAtom.set({
      user: { id: '', name: '', email: '', avatar: '' },
      isAuthed: false,
    });
  });

  test('renders with transparent background on / page', () => {
    const { container } = renderWithPath('/');
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-transparent');
    expect(container).toMatchSnapshot();
  });

  test('renders with background color on other pages', () => {
    const { container } = renderWithPath('/about');
    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('bg-transparent');
    expect(container).toMatchSnapshot();
  });

  test('shows "Войти" button when user is not authenticated', () => {
    renderWithPath('/');
    const loginButton = screen.getByRole('link', { name: /войти/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('href', '/login');
  });

  test('shows "Выйти" button when user is authenticated', () => {
    // Мокаем авторизованное состояние
    userInfoAtom.set({
      user: {
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        avatar: '',
      },
      isAuthed: true,
    });

    renderWithPath('/');
    const logoutButton = screen.getByRole('button', { name: /выйти/i });
    expect(logoutButton).toBeInTheDocument();
  });
});
