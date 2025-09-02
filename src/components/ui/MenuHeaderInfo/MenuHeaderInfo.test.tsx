import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MenuHeaderInfo } from './MenuHeaderInfo';

expect.extend(toHaveNoViolations);

describe('MenuHeaderInfo', () => {
  it('renders without crashing', () => {
    render(<MenuHeaderInfo />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<MenuHeaderInfo />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders title correctly', () => {
    render(<MenuHeaderInfo title="Test Title" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title');
  });

  it('renders subtitle when provided', () => {
    render(<MenuHeaderInfo title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Subtitle');
  });

  it('renders description when provided', () => {
    render(<MenuHeaderInfo title="Test Title" description="Test description" />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('applies compact variant styles', () => {
    render(<MenuHeaderInfo title="Test Title" variant="compact" />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveClass('text-lg');
  });

  it('applies detailed variant styles', () => {
    render(<MenuHeaderInfo title="Test Title" variant="detailed" />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveClass('text-2xl');
  });

  it('applies center alignment', () => {
    render(<MenuHeaderInfo title="Test Title" alignment="center" />);
    expect(screen.getByRole('banner')).toHaveClass('text-center');
  });

  it('applies right alignment', () => {
    render(<MenuHeaderInfo title="Test Title" alignment="right" />);
    expect(screen.getByRole('banner')).toHaveClass('text-right');
  });

  it('shows divider when enabled', () => {
    render(<MenuHeaderInfo title="Test Title" showDivider />);
    expect(screen.getByRole('banner')).toHaveClass('border-b', 'border-gray-200');
  });

  it('applies custom className', () => {
    render(<MenuHeaderInfo title="Test Title" className="custom-class" />);
    expect(screen.getByRole('banner')).toHaveClass('custom-class');
  });

  it('uses default title when none provided', () => {
    render(<MenuHeaderInfo />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Menu Information');
  });

  it('does not render subtitle when not provided', () => {
    render(<MenuHeaderInfo title="Test Title" />);
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    render(<MenuHeaderInfo title="Test Title" />);
    expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
  });
});