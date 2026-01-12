// src/widgets/LoginForm/ui/LoginForm.test.tsx
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { LoginForm } from './LoginForm';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '@shared/config/tests';
import { server } from '@shared/config/mocks';
import { http, HttpResponse, delay } from 'msw';

vi.unmock('@shared/config');

describe('LoginForm with MSW', () => {
  beforeEach(() => {
    server.listen();
  });
  test('renders login form', () => {
    const { container } = customRender(<LoginForm />, { initialEntries: ['/login'] });

    expect(container).toMatchSnapshot();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Вход' })).toBeInTheDocument();
  });

  test('successful login with real HTTP request', async () => {
    const { navigationHistory } = customRender(<LoginForm />, { initialEntries: ['/login'] });

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'test1234');
    await userEvent.click(screen.getByRole('button', { name: 'Вход' }));

    // Проверяем редирект
    await waitFor(
      () => {
        expect(navigationHistory).toContain('/app/interview');
      },
      { timeout: 1000 }
    );
  });

  test('shows loading state during login', async () => {
    // ✅ Переопределяем handler для этого теста с задержкой
    server.use(
      http.post('*/auth/v1/token', async ({ request }) => {
        const body = (await request.json()) as any;

        // Задержка для имитации медленного интернета
        await delay(500);

        return HttpResponse.json({
          access_token: 'mock-token',
          user: { id: '1', email: body.email },
        });
      })
    );

    customRender(<LoginForm />, { initialEntries: ['/login'] });

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'test1234');
    await userEvent.click(screen.getByRole('button', { name: 'Вход' }));

    // Проверяем loading
    expect(await screen.findByText('Loading...')).toBeInTheDocument();

    // Ждем окончания загрузки
    await waitFor(
      () => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  test('shows validation errors for invalid email format', async () => {
    customRender(<LoginForm />, { initialEntries: ['/login'] });

    // Вводим невалидный email (без @)
    await userEvent.type(screen.getByLabelText('Email'), 'testtestcom');
    await userEvent.type(screen.getByLabelText('Password'), 'test123');

    // MSW запрос даже не уйдет, потому что форма невалидна
    expect(screen.getByText('Email must contain @')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
  });

  test('shows validation error for email without dot', async () => {
    customRender(<LoginForm />, { initialEntries: ['/login'] });

    await userEvent.type(screen.getByLabelText('Email'), 'test@testcom');
    await userEvent.type(screen.getByLabelText('Password'), 'test1234');

    expect(screen.getByText('Email must contain .')).toBeInTheDocument();
  });

  test('shows API error when credentials are invalid', async () => {
    customRender(<LoginForm />, { initialEntries: ['/login'] });

    // ❌ Вводим неверные данные (не те, что в handler)
    await userEvent.type(screen.getByLabelText('Email'), 'wrong@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'wrongpass');
    await userEvent.click(screen.getByRole('button', { name: 'Вход' }));

    // MSW вернет ошибку из handler
    await waitFor(() => {
      expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
    });
  });

  test('handles server error (500)', async () => {
    // ✅ Переопределяем handler для симуляции ошибки сервера
    server.use(
      http.post('*/auth/v1/token', () => {
        return HttpResponse.json(
          { error: 'server_error', error_description: 'Internal server error' },
          { status: 500 }
        );
      })
    );

    customRender(<LoginForm />, { initialEntries: ['/login'] });

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'test1234');
    await userEvent.click(screen.getByRole('button', { name: 'Вход' }));

    // Проверяем, что показана ошибка
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  test('handles network error', async () => {
    // ✅ Симулируем network error
    server.use(
      http.post('*/auth/v1/token', () => {
        return HttpResponse.error();
      })
    );

    customRender(<LoginForm />, { initialEntries: ['/login'] });

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'test1234');
    await userEvent.click(screen.getByRole('button', { name: 'Вход' }));

    // Проверяем обработку network error
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });
});
