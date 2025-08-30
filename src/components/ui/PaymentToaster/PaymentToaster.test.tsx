import React from 'react';
import { render, screen } from '@testing-library/react';
import { PaymentToaster } from './PaymentToaster';

describe('PaymentToaster', () => {
  it('renders without crashing', () => {
    render(<PaymentToaster>Test</PaymentToaster>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<PaymentToaster className="custom-class">Test</PaymentToaster>);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('custom-class');
  });
});