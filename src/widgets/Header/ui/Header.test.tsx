import { render } from '@testing-library/react';
import { Header } from './Header';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { userInfoAtom } from '@/entities/user';

const renderWithPath = (path: string) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>
  );
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

  test('shows "Профиль" button when user is authenticated', () => {
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
    const profileButton = screen.getByRole('link', { name: /профиль/i });
    expect(profileButton).toBeInTheDocument();
    expect(profileButton).toHaveAttribute('href', '/profile');
  });
});
