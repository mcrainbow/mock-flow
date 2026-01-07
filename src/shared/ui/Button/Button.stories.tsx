import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from './Button';
import { ButtonVariant } from '@shared/lib';
import { ThemeDecorator } from '@/shared/config/storybook';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'shared/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(ButtonVariant),
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    onClick: {
      action: 'Clicked',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn(), children: 'Click me' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
  },
};

export const PrimaryDark: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
  },
  globals: {
    theme: 'dark',
  },
  decorators: [ThemeDecorator],
};

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
  },
};

export const SecondaryDark: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
  },
  globals: {
    theme: 'dark',
  },
  decorators: [ThemeDecorator],
};

export const Outline: Story = {
  args: {
    variant: ButtonVariant.OUTLINE,
  },
};

export const OutlineDark: Story = {
  args: {
    variant: ButtonVariant.OUTLINE,
  },
  globals: {
    theme: 'dark',
  },
  decorators: [ThemeDecorator],
};

export const Ghost: Story = {
  args: {
    variant: ButtonVariant.GHOST,
  },
};

export const GhostDark: Story = {
  args: {
    variant: ButtonVariant.GHOST,
  },
  globals: {
    theme: 'dark',
  },
  decorators: [ThemeDecorator],
};

export const Danger: Story = {
  args: {
    variant: ButtonVariant.DANGER,
  },
};

export const DangerDark: Story = {
  args: {
    variant: ButtonVariant.DANGER,
  },
  globals: {
    theme: 'dark',
  },
  decorators: [ThemeDecorator],
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};
