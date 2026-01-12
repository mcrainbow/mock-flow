import path from 'path';
import { fileURLToPath } from 'node:url';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const projectRoot = path.resolve(dirname, '../../..');

export const unitProject = {
  // Проект для Unit тестов
  extends: true as const,
  test: {
    name: 'unit',
    include: ['**/*.test.{ts,tsx}', '!**/*.stories.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.join(projectRoot, 'test/setup.ts')],
  },
};
