import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from '@shared/config/mocks/server';

// Очищаем DOM после каждого теста
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver (используем globalThis вместо global)
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver;

// Mock ResizeObserver
globalThis.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock Supabase модуля
vi.mock('@shared/config', () => {
  const mockAuth = {
    getSession: vi.fn().mockResolvedValue({
      data: { session: null },
      error: null,
    }),
    getUser: vi.fn().mockResolvedValue({
      data: { user: null },
      error: null,
    }),
    signUp: vi.fn(),
    // signInWithPassword: vi.fn(),
    // signOut: vi.fn(),
    onAuthStateChange: vi.fn().mockReturnValue({
      data: {
        subscription: {
          unsubscribe: vi.fn(),
        },
      },
    }),
  };

  // const mockSupabase = {
  //   from: vi.fn().mockReturnValue({
  //     select: vi.fn().mockReturnThis(),
  //     insert: vi.fn().mockReturnThis(),
  //     update: vi.fn().mockReturnThis(),
  //     delete: vi.fn().mockReturnThis(),
  //     eq: vi.fn().mockReturnThis(),
  //     single: vi.fn().mockResolvedValue({
  //       data: null,
  //       error: null,
  //     }),
  //   }),
  //   auth: mockAuth,
  // };

  return {
    // supabase: mockSupabase,
    auth: mockAuth,
  };
});
