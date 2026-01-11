import { describe, test, expect, vi, beforeEach } from 'vitest';
import { loginResponse } from './loginResponse';
import { auth } from '@/shared/config';

describe('loginResponse', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('returns user on success', async () => {
    const mockUserData = {
      email: 'test@example.com',
      name: 'Test User',
    };

    vi.mocked(auth.signInWithPassword).mockResolvedValue({
      data: mockUserData,
      error: null,
    } as any);

    const result = await loginResponse('test@example.com', 'password');
    expect(auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
    expect(result).toEqual(mockUserData);
  });

  test('throws error when signInWithPassword returns error', async () => {
    const errorMessage = 'Invalid email or password';
    vi.mocked(auth.signInWithPassword).mockRejectedValue(new Error(errorMessage));
    await expect(loginResponse('test@example.com', 'password')).rejects.toThrow(errorMessage);
  });

  test('throws error when signInWithPassword rejects', async () => {
    const errorMessage = 'Invalid email or password';
    vi.mocked(auth.signInWithPassword).mockResolvedValue({
      data: null,
      error: { message: errorMessage },
    } as any);
    await expect(loginResponse('test@example.com', 'password')).rejects.toThrow(errorMessage);
  });
});
