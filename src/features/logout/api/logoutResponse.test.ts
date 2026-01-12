import { describe, test, expect } from 'vitest';
import { logoutResponse } from './logoutResponse';

describe('logoutResponse', () => {
  test('returns null if logout is successful', async () => {
    const result = await logoutResponse();
    expect(result).toBeNull();
  });
});
