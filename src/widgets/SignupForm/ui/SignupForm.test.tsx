import { describe, test, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '@shared/config/tests';
import { auth } from '@/shared/config';
import { SignupForm } from './SignupForm';

describe('SignupForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders login form', () => {
    const { container } = customRender(<SignupForm />, { initialEntries: ['/signup'] });
    expect(container).toMatchSnapshot();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('submits login form', async () => {
    vi.mocked(auth.signUp).mockImplementation(
      () =>
        new Promise((resolve) =>
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
          )
        )
    );
    const { container } = customRender(<SignupForm />, { initialEntries: ['/signup'] });

    await userEvent.type(screen.getByLabelText('Email'), 'teststst@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'test1234');
    await userEvent.click(screen.getByRole('button', { name: 'Регистрация' }));

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('shows error messages when email and password are invalid', async () => {
    const { container } = customRender(<SignupForm />, { initialEntries: ['/signup'] });

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
    vi.mocked(auth.signUp).mockRejectedValue(new Error('Invalid email or password'));
    const { container } = customRender(<SignupForm />, { initialEntries: ['/signup'] });

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'test1234');
    await userEvent.click(screen.getByRole('button', { name: 'Регистрация' }));

    expect(await screen.findByText('Invalid email or password')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
