import { describe, test, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '@shared/config/tests';
import { SignupForm } from './SignupForm';
import { server } from '@shared/config/mocks';
import { http, HttpResponse, delay } from 'msw';

vi.unmock('@shared/config');

describe('SignupForm', () => {
  beforeEach(() => {
    server.listen();
  });
  test('renders signup form', () => {
    const { container } = customRender(<SignupForm />, { initialEntries: ['/signup'] });
    expect(container).toMatchSnapshot();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('successful register with real HTTP request', async () => {
    const { navigationHistory } = customRender(<SignupForm />, { initialEntries: ['/signup'] });

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'testtest123');
    await userEvent.click(screen.getByRole('button', { name: 'Регистрация' }));

    await waitFor(
      () => {
        expect(navigationHistory).toContain('/app/interview');
      },
      { timeout: 1000 }
    );
  });

  test('shows loading state during register', async () => {
    server.use(
      http.post('*/auth/v1/signup', async () => {
        await delay(500);
        return HttpResponse.json({
          access_token: 'mock-access-token-123',
          token_type: 'bearer',
          expires_in: 3600,
          refresh_token: 'mock-refresh-token',
        });
      })
    );

    customRender(<SignupForm />, { initialEntries: ['/signup'] });

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'testtest123');
    await userEvent.click(screen.getByRole('button', { name: 'Регистрация' }));

    await waitFor(
      () => {
        expect(screen.getByText('Loading...')).toBeInTheDocument();
      },
      { timeout: 600 }
    );
  });

  test('shows validation errors for invalid email format', async () => {
    customRender(<SignupForm />, { initialEntries: ['/login'] });

    // Вводим невалидный email (без @)
    await userEvent.type(screen.getByLabelText('Email'), 'testtestcom');
    await userEvent.type(screen.getByLabelText('Password'), 'test123');

    // MSW запрос даже не уйдет, потому что форма невалидна
    expect(screen.getByText('Email must contain @')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
  });

  test('shows validation error for email without dot', async () => {
    customRender(<SignupForm />, { initialEntries: ['/login'] });

    await userEvent.type(screen.getByLabelText('Email'), 'test@testcom');
    await userEvent.type(screen.getByLabelText('Password'), 'test1234');

    expect(screen.getByText('Email must contain .')).toBeInTheDocument();
  });

  test('shows API error when Email alredy registered', async () => {
    customRender(<SignupForm />, { initialEntries: ['/login'] });

    // ❌ Вводим неверные данные (не те, что в handler)
    await userEvent.type(screen.getByLabelText('Email'), 'stefro97@yandex.ru');
    await userEvent.type(screen.getByLabelText('Password'), 'wrongpass');
    await userEvent.click(screen.getByRole('button', { name: 'Регистрация' }));

    // MSW вернет ошибку из handler
    await waitFor(() => {
      expect(
        screen.getByText(/Пользователь с таким email уже зарегистрирован/i)
      ).toBeInTheDocument();
    });
  });
});
