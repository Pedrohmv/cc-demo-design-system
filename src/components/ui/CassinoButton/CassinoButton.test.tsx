import React from 'react';
import { render, screen } from '@testing-library/react';
import { CassinoButton } from './CassinoButton';

describe('CassinoButton', () => {
  it('renders without crashing', () => {
    render(<CassinoButton>Test</CassinoButton>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CassinoButton className="custom-class">Test</CassinoButton>);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('custom-class');
  });
});