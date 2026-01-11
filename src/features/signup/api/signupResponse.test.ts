import { describe, test, expect, vi, beforeEach } from 'vitest';
import { signupResponse } from './signupResponse';
import { auth } from '@/shared/config';

describe('signupResponse', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('returns user on success', async () => {
    const mockUserData = {
      email: 'test@example.com',
      name: 'Test User',
    };

    vi.mocked(auth.signUp).mockResolvedValue({
      data: mockUserData,
      error: null,
    } as any);

    const result = await signupResponse('test@example.com', 'password');

    expect(auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
    expect(result).toEqual(mockUserData);
  });

  test('throws error when signUnWithPassword rejects', async () => {
    const errorMessage = 'Invalid email or password';
    vi.mocked(auth.signUp).mockResolvedValue({
      data: null,
      error: { message: errorMessage },
    } as any);
    await expect(signupResponse('test@example.com', 'password')).rejects.toThrow(errorMessage);
  });
});
