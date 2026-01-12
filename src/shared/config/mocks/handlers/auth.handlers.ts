// src/mocks/handlers/auth.handlers.ts
import { http, HttpResponse } from 'msw';

// ✅ URL вашего Supabase проекта (замените на реальный)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';

export const authHandlers = [
  // POST /auth/v1/token?grant_type=password - Login
  http.post(`${SUPABASE_URL}/auth/v1/token`, async ({ request }) => {
    // Читаем body
    const body = (await request.json()) as { email: string; password: string };

    // ✅ Успешный логин
    if (body.email === 'test@test.com' && body.password === 'test1234') {
      // Опциональная задержка для тестирования loading
      // await delay(100);

      return HttpResponse.json({
        access_token: 'mock-access-token-123',
        token_type: 'bearer',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
        refresh_token: 'mock-refresh-token',
        user: {
          id: '1',
          aud: 'authenticated',
          role: 'authenticated',
          email: 'test@test.com',
          email_confirmed_at: '2024-01-01T00:00:00Z',
          phone: '',
          confirmed_at: '2024-01-01T00:00:00Z',
          last_sign_in_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: {},
          identities: [],
          created_at: '2024-01-01T00:00:00Z',
          updated_at: new Date().toISOString(),
        },
      });
    }

    // ❌ Неверные данные - ошибка
    return HttpResponse.json(
      {
        error: 'invalid_grant',
        error_description: 'Invalid email or password',
      },
      { status: 400 }
    );
  }),

  // POST /auth/v1/signup - Регистрация
  http.post(`${SUPABASE_URL}/auth/v1/signup`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === 'stefro97@yandex.ru') {
      return HttpResponse.json(
        { error: 'user_already_exists', error_description: 'User already registered' },
        { status: 409 }
      );
    }

    return HttpResponse.json({
      access_token: 'mock-access-token-123',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh-token',
      user: {
        id: 'new-user-id',
        email: body.email,
        created_at: new Date().toISOString(),
      },
    });
  }),

  // GET /auth/v1/user - Получить текущего пользователя
  http.get(`${SUPABASE_URL}/auth/v1/user`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.includes('Bearer mock-access-token')) {
      return HttpResponse.json(
        { error: 'unauthorized', message: 'Invalid token' },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      id: '1',
      email: 'test@test.com',
      role: 'authenticated',
    });
  }),

  // POST /auth/v1/logout - Выход
  http.post('*/auth/v1/logout', ({ request }) => {
    console.log('✅ БАЗОВЫЙ HANDLER LOGOUT ВЫЗВАН!');
    console.log('✅ URL:', request.url);
    return new HttpResponse(null, { status: 204 });
  }),
];
