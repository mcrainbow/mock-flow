import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppLink } from './AppLink';
import { ThemeDecorator } from '@/shared/config/storybook';

const meta = {
  title: 'shared/AppLink',
  component: AppLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'as-button'],
    },
  },
  args: { to: '/', children: 'Home Page' },
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const PrimaryDark: Story = {
  args: {
    variant: 'primary',
  },
  globals: {
    theme: 'dark',
  },
  decorators: [ThemeDecorator],
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const SecondaryDark: Story = {
  args: {
    variant: 'secondary',
  },
  globals: {
    theme: 'dark',
  },
  decorators: [ThemeDecorator],
};

export const AsButton: Story = {
  args: {
    variant: 'as-button',
  },
};

export const AsButtonDark: Story = {
  args: {
    variant: 'as-button',
  },
  globals: {
    theme: 'dark',
  },
  decorators: [ThemeDecorator],
};

export const Empty: Story = {
  args: {
    variant: 'empty',
  },
};
