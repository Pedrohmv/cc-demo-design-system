import type { Meta, StoryObj } from '@storybook/react';
import { CassinoButton } from './CassinoButton';

const meta = {
  title: 'ui/CassinoButton',
  component: CassinoButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CassinoButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Abrir aplicativo do banco',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Abrir aplicativo do banco',
    disabled: true,
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Processar pagamento',
  },
};

export const ShortLabel: Story = {
  args: {
    label: 'Confirmar',
  },
};