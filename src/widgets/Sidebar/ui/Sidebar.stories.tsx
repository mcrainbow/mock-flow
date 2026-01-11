import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './Sidebar';
import { MemoryRouter } from 'react-router-dom';
// import { context } from '@reatom/core';
import { isSidebarOpenAtom } from '../model';

const meta = {
  title: 'widgets/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen', // ✅ Изменить на fullscreen
  },
  decorators: [
    // ✅ Глобальная обертка с высотой
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  decorators: [
    (Story) => {
      isSidebarOpenAtom.set(true);
      return (
        <MemoryRouter initialEntries={['/app/interview']}>
          <Story />
        </MemoryRouter>
      );
    },
  ],
};

/**
 * Header с непрозрачным фоном
 * Используется на всех остальных страницах
 */
export const Closed: Story = {
  decorators: [
    (Story) => {
      isSidebarOpenAtom.set(false);
      return (
        <MemoryRouter initialEntries={['/app/interview']}>
          <Story />
        </MemoryRouter>
      );
    },
  ],
};
