import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'path';
import { fileURLToPath } from 'node:url';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Поднимаемся на 3 уровня вверх от config/vitest/projects/ до корня проекта
const projectRoot = path.resolve(dirname, '../../..');

export const storybookProject = {
  extends: true as const,
  plugins: [
    // The plugin will run tests for the stories defined in your Storybook config
    // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
    storybookTest({
      configDir: path.join(projectRoot, '.storybook'),
    }),
  ],
  test: {
    name: 'storybook',
    browser: {
      enabled: true as const,
      headless: true as const,
      provider: playwright({}),
      instances: [
        {
          browser: 'chromium' as const,
        },
      ],
    },
    setupFiles: ['.storybook/vitest.setup.ts'],
  },
};
