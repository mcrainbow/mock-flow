import { describe, test, expect, vi, beforeEach } from 'vitest';
import { initializeAuth } from './initializeAuth';
import { auth } from '@shared/config';

describe('initializeAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('returns user if authenticated', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
    };

    vi.mocked(auth.getSession).mockResolvedValue({
      data: { session: { user: mockUser } },
      error: null,
    } as any);
    const user = await initializeAuth();
    expect(user).toEqual(mockUser);
  });

  test('returns null if not authenticated', async () => {
    vi.mocked(auth.getSession).mockResolvedValue({
      data: { session: null },
      error: null,
    } as any);
    const user = await initializeAuth();
    expect(user).toEqual(null);
  });
});
