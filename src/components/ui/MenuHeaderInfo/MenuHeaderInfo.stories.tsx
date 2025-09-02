import type { Meta, StoryObj } from '@storybook/react';
import { MenuHeaderInfo } from './MenuHeaderInfo';

const meta = {
  title: 'UI/MenuHeaderInfo',
  component: MenuHeaderInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'detailed'],
    },
    alignment: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    showDivider: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof MenuHeaderInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Iniciante',
    subtitle: '0 XP',
    description: 'Clube da Realeza • Ver detalhes',
  },
};

export const Compact: Story = {
  args: {
    title: 'Iniciante',
    subtitle: '0 XP',
    variant: 'compact',
  },
};

export const Detailed: Story = {
  args: {
    title: 'Iniciante',
    subtitle: '0 XP',
    description: 'Clube da Realeza • Ver detalhes',
    variant: 'detailed',
  },
};

export const Centered: Story = {
  args: {
    title: 'Iniciante',
    subtitle: '0 XP',
    description: 'Clube da Realeza • Ver detalhes',
    alignment: 'center',
  },
};

export const WithDivider: Story = {
  args: {
    title: 'Iniciante',
    subtitle: '0 XP',
    description: 'Clube da Realeza • Ver detalhes',
    showDivider: true,
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Iniciante',
  },
};

export const Playground: Story = {
  args: {
    title: 'Iniciante',
    subtitle: '0 XP',
    description: 'Clube da Realeza • Ver detalhes',
    variant: 'default',
    alignment: 'left',
    showDivider: false,
  },
};