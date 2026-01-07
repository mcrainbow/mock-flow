import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { ThemeProvider } from '@shared/context';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'widgets/Header',
  component: Header,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen', // Важно для fixed header
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Header с прозрачным фоном
 * Используется на главной, логин и регистрации страницах
 *
 * TRANSPARENT_PATHS: '/', '/login', '/register'
 */
export const Transparent: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div className="relative h-screen">
          {/* Фоновое изображение/градиент для демонстрации прозрачности */}
          <div className="absolute inset-0 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500" />
          <Story />
          {/* Контент страницы */}
          <div className="relative z-10 pt-32 px-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Главная страница</h1>
            <p className="text-lg">
              Header прозрачный (bg-transparent) на путях: /, /login, /register
            </p>
            <p className="text-sm mt-2 opacity-80">Текущий путь: / (входит в TRANSPARENT_PATHS)</p>
          </div>
        </div>
      </MemoryRouter>
    ),
  ],
};

/**
 * Header с непрозрачным фоном
 * Используется на всех остальных страницах
 */
export const Solid: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/about']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};
