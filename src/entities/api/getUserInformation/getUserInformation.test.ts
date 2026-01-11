import { describe, test, expect, vi } from 'vitest';
import { supabase } from '@shared/config';
import { getUserInformationAPI } from './getUserInformation';

describe('getUserInformationAPI', () => {
  test('возвращает данные пользователя', async () => {
    const mockUserData = {
      uid: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
    };

    // Используем уже существующий mock из setup.ts
    // и просто переопределяем поведение для этого теста
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: mockUserData,
        error: null,
      }),
    } as any);

    const result = await getUserInformationAPI('user-123');

    expect(result).toEqual(mockUserData);
  });

  test('throws error if user not found', async () => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'User not found' },
      }),
    } as any);
    await expect(getUserInformationAPI('user-123')).rejects.toThrow('User not found');
  });
});
