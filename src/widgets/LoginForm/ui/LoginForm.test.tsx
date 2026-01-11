import { describe, test, expect, vi, beforeEach } from 'vitest';
import { LoginForm } from './LoginForm';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '@shared/config/tests';
import { auth } from '@/shared/config';

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders login form', () => {
    const { container } = customRender(<LoginForm />, { initialEntries: ['/login'] });
    expect(container).toMatchSnapshot();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('submits login form', async () => {
    vi.mocked(auth.signInWithPassword).mockImplementation(
      () =>
        new Promise(
          (resolve) =>
            setTimeout(
              () =>
                resolve({
                  data: {
                    user: { id: '1', email: 'test@test.com' },
                    session: { access_token: 'token' },
                  },
                  error: null,
                } as any),
              100
            ) // задержка 100мс
        )
    );
    const { container } = customRender(<LoginForm />, { initialEntries: ['/login'] });
    await userEvent.type(screen.getByLabelText('Email'), 'teststst@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'test1234');
    await userEvent.click(screen.getByRole('button', { name: 'Вход' }));
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('shows error messages when email and password are invalid', async () => {
    const { container } = customRender(<LoginForm />, { initialEntries: ['/login'] });

    await userEvent.type(screen.getByLabelText('Email'), 'testtestcom');
    await userEvent.type(screen.getByLabelText('Password'), 'test123');

    expect(screen.getByText('Email must contain @')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Email'), 'test@testcom');
    await userEvent.type(screen.getByLabelText('Password'), 'test1234');

    expect(screen.getByText('Email must contain .')).toBeInTheDocument();
    expect(
      screen.queryByText('Password must be at least 8 characters long')
    ).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('shows error messages when email and password are invalid', async () => {
    vi.mocked(auth.signInWithPassword).mockRejectedValue(new Error('Invalid email or password'));
    const { container } = customRender(<LoginForm />, { initialEntries: ['/login'] });

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'test1234');
    await userEvent.click(screen.getByRole('button', { name: 'Вход' }));

    expect(await screen.findByText('Invalid email or password')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
