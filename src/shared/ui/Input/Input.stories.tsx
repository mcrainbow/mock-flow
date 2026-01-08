import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';
import { ThemeDecorator } from '@/shared/config/storybook';

const meta = {
  title: 'shared/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
  args: { name: 'test', value: 'Test Value', onChange: () => {} },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defualt: Story = {
  args: {
    name: 'test',
    onChange: () => {},
  },
};

export const Dark: Story = {
  args: {
    name: 'test',
    onChange: () => {},
  },
  globals: {
    theme: 'dark',
  },
  decorators: [ThemeDecorator],
};

export const WithClass: Story = {
  args: {
    name: 'test',
    onChange: () => {},
    className: 'bg-red-500',
  },
};
