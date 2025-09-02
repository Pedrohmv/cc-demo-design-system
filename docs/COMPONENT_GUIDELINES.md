# Component Generation Guidelines with Figma MCP Integration

## Overview
This document provides guidelines for Claude Code when generating React components directly from Figma selections using MCP (Model Context Protocol) integration. These guidelines ensure design-to-code consistency and proper design system integration.

## Core Principles

### 1. **Figma-First Design Token Extraction**
**ALWAYS follow this sequence before component generation:**
1. Extract Figma variables using `mcp__figma-dev-mode-mcp-server__get_variable_defs`
2. Update design system tokens in `/design-tokens/`
3. Use design tokens in component instead of hardcoded values

### 2. **Design System Token Usage**
- Import tokens from `/design-tokens/colors.ts`, `/design-tokens/typography.ts`, `/design-tokens/spacing.ts`
- Use `colors['primary-green-darkest']` instead of `#2D5F3A`
- Apply typography tokens instead of hardcoded font styles
- Reference spacing tokens for consistent margins/padding

### 3. **TypeScript First**
- Always generate comprehensive TypeScript interfaces
- Use proper type unions for variants (3+ options) or boolean props (2 options)
- Include JSDoc comments for complex props
- Export both the component and its props interface

### 4. **Accessibility by Default**
- Generate semantic HTML elements (`button`, `nav`, `main`, etc.)
- Include appropriate ARIA attributes (`aria-label`, `aria-describedby`, `role`)
- Ensure proper keyboard navigation support
- Add focus management for interactive components
- Include screen reader considerations

### 5. **Mobile-First Responsive Design**
Use predefined breakpoints:
```typescript
// Tailwind breakpoints to use
xs: 375px   // Mobile
sm: 640px   // Large mobile
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
```

## Component Structure Template

```typescript
import React from 'react';
import { cn } from '@/utils/cn';
import { colors } from '../../../design-tokens/colors';
import { typography } from '../../../design-tokens/typography';

export interface ComponentNameProps {
  // Required props first
  children: React.ReactNode;
  
  // Optional props with meaningful defaults
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  
  // Event handlers
  onClick?: () => void;
  onSubmit?: (data: FormData) => void;
  
  // Style customization
  className?: string;
  
  // Advanced props for complex components
  [key: string]: any;
}

export const ComponentName = React.forwardRef<
  HTMLButtonElement, // Appropriate HTML element type
  ComponentNameProps
>(({ 
  children,
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className,
  ...props 
}, ref) => {
  // Component logic here
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled || loading}
      onClick={handleClick}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        
        // Variant styles
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'border border-input hover:bg-accent hover:text-accent-foreground': variant === 'default',
        },
        
        // Size styles
        {
          'h-8 px-3 text-xs': size === 'sm',
          'h-10 px-4 py-2': size === 'md',
          'h-12 px-8': size === 'lg',
        },
        
        // State styles
        {
          'opacity-50 cursor-not-allowed': disabled,
          'cursor-wait': loading,
        },
        
        className
      )}
      aria-label={typeof children === 'string' ? children : undefined}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
});

ComponentName.displayName = 'ComponentName';

export default ComponentName;
```

## Figma MCP Integration Workflow

### Step 1: Extract Design Tokens
**Before generating any component:**
```typescript
// 1. Get Figma variables
const variables = await mcp__figma-dev-mode-mcp-server__get_variable_defs();

// 2. Update design-tokens files
// Example variables returned:
// {
//   "Primary/Green/Darkest": "#2D5F3A",
//   "Caption/Base/Large/Bold": "Font(family: \"DM Sans\", style: Bold, size: 14, weight: 700, lineHeight: 1.4)"
// }
```

### Step 2: Update Design System
**Add new tokens to appropriate files:**
```typescript
// design-tokens/colors.ts
export const colors = {
  // ... existing colors
  'primary-green-darkest': '#2D5F3A', // From Figma
} as const;

// design-tokens/typography.ts
export const typography = {
  'caption-base-large-bold': {
    fontFamily: '"DM Sans"',
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '1.4'
  },
} as const;
```

### Step 3: Generate Component with Tokens
**Use design system tokens instead of hardcoded values:**
```typescript
// ❌ Don't do this:
<div className="text-[#2d5f3a]">

// ✅ Do this instead:
<div style={{ color: colors['primary-green-darkest'] }}>

// Or with Tailwind custom colors:
<div className="text-primary-green-darkest">
```

### Step 4: MCP Data Interpretation

#### From `get_variable_defs`:
- Extract colors, fonts, spacing values
- Map to design system token structure
- Update design-tokens files

#### From `get_code`:
- Get component structure and styling
- Replace hardcoded values with design tokens
- Maintain original design fidelity

#### From `get_image`:
- Use for visual reference and documentation
- Include in Storybook for design comparison

## Component Categories

### UI Components (`/src/components/ui/`)
- **Buttons**: Primary, secondary, ghost, destructive variants
- **Inputs**: Text, email, password, textarea with validation
- **Cards**: Simple, complex layouts with media
- **Badges**: Status indicators, labels, tags
- **Dialogs**: Modals, alerts, confirmations

### Layout Components (`/src/components/layout/`)
- **Headers**: Navigation, branding, user menus
- **Sidebars**: Navigation panels, filters
- **Sections**: Page sections, content areas
- **Grids**: Responsive layouts, card grids

## Testing Requirements

Generate comprehensive tests including:

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ComponentName } from './ComponentName';

expect.extend(toHaveNoViolations);

describe('ComponentName', () => {
  // Basic rendering
  it('renders without crashing', () => {
    render(<ComponentName>Test</ComponentName>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // Accessibility testing
  it('has no accessibility violations', async () => {
    const { container } = render(<ComponentName>Test</ComponentName>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Interactive behavior
  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<ComponentName onClick={handleClick}>Test</ComponentName>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Variant testing
  it('applies variant styles correctly', () => {
    render(<ComponentName variant="primary">Test</ComponentName>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');
  });

  // State testing
  it('handles disabled state', () => {
    render(<ComponentName disabled>Test</ComponentName>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## Storybook Story Requirements

Generate comprehensive stories:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'UI/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Button Text',
  },
};

// All variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

// Interactive states
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// Playground for all combinations
export const Playground: Story = {
  args: {
    children: 'Playground Button',
    variant: 'default',
    size: 'md',
  },
};
```

## Error Handling

When MCP data is incomplete or unclear:

1. **Graceful Fallbacks**: Use sensible defaults
2. **Console Warnings**: Log missing or unclear data
3. **Documentation**: Add comments explaining assumptions
4. **Flexible Props**: Make optional what can't be determined

## Quality Checklist

Before considering a component complete, verify:

- [ ] TypeScript interfaces are comprehensive
- [ ] Component is properly forwardRef wrapped
- [ ] Accessibility attributes are present
- [ ] Responsive design works across breakpoints
- [ ] All interactive states are handled
- [ ] Tests cover main functionality and accessibility
- [ ] Storybook stories demonstrate all variants
- [ ] Design tokens are properly utilized
- [ ] Code follows existing project patterns