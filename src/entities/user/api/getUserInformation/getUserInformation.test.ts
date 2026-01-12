import { describe, test, expect, vi } from 'vitest';
import { getUserInformationAPI } from './getUserInformation';
vi.unmock('@shared/config');

describe('getUserInformationAPI', () => {
  test('returns user data if user exists', async () => {
    const result = await getUserInformationAPI('1');

    expect(result).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
  });

  test('returns user data if user exists(with another uid)', async () => {
    const result = await getUserInformationAPI('2');

    expect(result).toEqual({
      id: '2',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
  });

  test('throws error if user not found', async () => {
    await expect(getUserInformationAPI('unknownUID')).rejects.toThrow('User not found');
  });
});
