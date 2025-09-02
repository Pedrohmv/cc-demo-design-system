import type { Meta, StoryObj } from '@storybook/react';
import HeaderInfo from './HeaderInfo';

const meta = {
  title: 'ui/HeaderInfo',
  component: HeaderInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeaderInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: 'Iniciante',
    xp: '0 XP',
    clubName: 'Clube da Realeza',
    actionText: 'Ver detalhes',
  },
};

export const Intermediate: Story = {
  args: {
    level: 'Intermediário',
    xp: '250 XP',
    clubName: 'Clube da Realeza',
    actionText: 'Ver detalhes',
  },
};

export const Advanced: Story = {
  args: {
    level: 'Avançado',
    xp: '1.250 XP',
    clubName: 'Clube da Realeza',
    actionText: 'Coletar recompensas',
  },
};

export const Expert: Story = {
  args: {
    level: 'Especialista',
    xp: '5.000 XP',
    clubName: 'Clube da Realeza',
    actionText: 'Coletar recompensas',
  },
};

export const WithClick: Story = {
  args: {
    level: 'Iniciante',
    xp: '0 XP',
    clubName: 'Clube da Realeza',
    actionText: 'Ver detalhes',
    onClick: () => alert('Header info clicked!'),
  },
};