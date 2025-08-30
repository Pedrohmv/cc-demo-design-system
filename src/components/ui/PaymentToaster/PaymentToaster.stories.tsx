import type { Meta, StoryObj } from '@storybook/react';
import { PaymentToaster } from './PaymentToaster';

const meta = {
  title: 'ui/PaymentToaster',
  component: PaymentToaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PaymentToaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Somente serão aceitos depósitos realizados pelo mesmo titular do CPF cadastrado no Rei.',
  },
};

export const CustomMessage: Story = {
  args: {
    message: 'Your payment will be processed within 24 hours. Please keep this reference number for your records.',
  },
};

export const ShortMessage: Story = {
  args: {
    message: 'Pagamento processado com sucesso.',
  },
};