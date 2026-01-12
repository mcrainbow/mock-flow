import { describe, test, expect, vi } from 'vitest';
import { loginResponse } from './loginResponse';
import { http, HttpResponse } from 'msw';
import { server } from '@shared/config/mocks';

vi.unmock('@shared/config');

describe('loginResponse', () => {
  test('returns user on success', async () => {
    const result = await loginResponse('test@test.com', 'test1234');

    // ✅ Проверяем важные поля
    expect(result.user).toMatchObject({
      id: '1',
      email: 'test@test.com',
      role: 'authenticated',
      aud: 'authenticated',
    });

    // ✅ Проверяем, что динамические поля существуют
    expect(result.user.last_sign_in_at).toBeDefined();
    expect(result.user.updated_at).toBeDefined();

    // ✅ Проверяем session
    expect(result.session).toBeDefined();
    expect(result.session.access_token).toBe('mock-access-token-123');
  });

  test('throws error when Password not correct', async () => {
    await expect(loginResponse('test@test.com', 'password')).rejects.toThrow(
      'Invalid email or password'
    );
  });

  test('throws error when Email not correct', async () => {
    const errorMessage = 'Invalid email or password';

    await expect(loginResponse('someeamil@example.com', 'test1234')).rejects.toThrow(errorMessage);
  });

  test('throws error on network failure', async () => {
    server.use(
      http.post('*/auth/v1/token', () => {
        return HttpResponse.json(
          { error: 'server_error', error_description: 'Internal server error' },
          { status: 500 }
        );
      })
    );

    await expect(loginResponse('test@test.com', 'test1234')).rejects.toThrow(
      'Internal server error'
    );
  });
});
