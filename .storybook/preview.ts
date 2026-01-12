import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import { theme } from './globalTypes/theme';
import { ThemeDecorator } from '../src/shared/config/storybook/decorators/ThemeDecorator/ThemeDecorator';
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  globalTypes: {
    theme,
  },
  decorators: [ThemeDecorator],
  loaders: [mswLoader],
};

export default preview;
