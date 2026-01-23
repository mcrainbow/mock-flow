import { Header } from './Header';
import { describe, test, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { useUserStore } from '@/entities/user/model/store';
import { customRender } from '@shared/config/tests';

const renderWithPath = (path: string) => {
  return customRender(<Header />, { initialEntries: [path] });
};

describe('Header', () => {
  beforeEach(() => {
    // Сбрасываем store к начальному состоянию перед каждым тестом
    useUserStore.setState({
      user: {
        id: '',
        name: '',
        email: '',
        avatar: '',
        completed_interviews: 0,
        skipped_interviews: 0,
        started_interviews: 0,
      },
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
});
