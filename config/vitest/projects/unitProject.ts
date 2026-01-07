export const unitProject = {
  // Проект для Unit тестов
  extends: true as const,
  test: {
    name: 'unit',
    include: ['**/*.test.{ts,tsx}', '!**/*.stories.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
};
