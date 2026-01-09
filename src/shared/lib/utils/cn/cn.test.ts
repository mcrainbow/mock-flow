import { cn } from './cn';
import { describe, test, expect } from 'vitest';

describe('cn', () => {
  test('should return a correct value', () => {
    expect(cn('test')).toBe('test');
    expect(cn('test', undefined, false)).toBe('test');
    expect(cn('test', 'bg-red-500')).toBe('test bg-red-500');
    expect(cn('test', 'bg-red-500', false)).toBe('test bg-red-500');
  });

  test('should rewrite to return a correct value', () => {
    expect(
      cn('test', true, false, undefined, false, true, 'bg-red-500', 'bg-blue-500', false, true)
    ).toBe('test bg-blue-500');
  });
});
