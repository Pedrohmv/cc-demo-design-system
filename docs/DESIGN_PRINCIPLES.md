# Design System Principles with Figma MCP Integration

## Overview
This document outlines the core design principles for our design system, emphasizing the direct integration with Figma through MCP (Model Context Protocol) for maintaining perfect design-to-code synchronization.

## Core Design Principles

### 1. **Figma-First Token System**
All design decisions originate in Figma and are automatically extracted through MCP integration.

**Principle**: Design tokens are the single source of truth
- Colors, typography, spacing defined in Figma Variables
- Automatically extracted using `mcp__figma-dev-mode-mcp-server__get_variable_defs`
- No manual token creation - all come from Figma
- Design system files are automatically updated from Figma selections

**Implementation**:
```typescript
// Design tokens are extracted from Figma, not manually created
export const colors = {
  'primary-green-darkest': '#2D5F3A', // From Figma Variables
  'caption-text-color': '#2D5F3A',    // From Figma Variables
} as const;
```

### 2. **Design-to-Code Consistency**
Every component must visually match its Figma design exactly.

**Principle**: Perfect pixel-level fidelity between design and implementation
- Use `mcp__figma-dev-mode-mcp-server__get_image` for visual reference
- Extract exact styling with `mcp__figma-dev-mode-mcp-server__get_code`
- Maintain original design measurements and proportions
- Components should be indistinguishable from Figma designs

### 3. **Atomic Design with Design Tokens**
Build complex interfaces from simple, token-based components.

**Structure**:
- **Tokens**: Colors, typography, spacing from Figma Variables
- **Atoms**: Basic UI elements (buttons, inputs) using design tokens
- **Molecules**: Simple component groups (search forms, card headers)
- **Organisms**: Complex component sections (headers, card layouts)
- **Templates**: Page-level component layouts

**Token Usage**:
```typescript
// All styling references design tokens
<button style={{ color: colors['primary-green-darkest'] }}>
  Submit
</button>
```

### 4. **Accessibility as a Foundation**
Accessibility is not optional - it's built into every component from the start.

**Requirements**:
- Semantic HTML elements (`button`, `nav`, `main`, `section`)
- Proper ARIA attributes (`aria-label`, `aria-describedby`, `role`)
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Focus management and visible focus indicators
- Screen reader compatibility
- Color contrast compliance (WCAG 2.1 AA minimum)

**Testing**:
- All components tested with `jest-axe`
- Manual keyboard navigation testing
- Screen reader testing (VoiceOver, NVDA)

### 5. **Mobile-First Responsive Design**
Design for small screens first, then enhance for larger viewports.

**Breakpoint Strategy**:
```typescript
// Standard breakpoints across all components
const breakpoints = {
  xs: '375px',  // Mobile
  sm: '640px',  // Large mobile
  md: '768px',  // Tablet
  lg: '1024px', // Desktop
  xl: '1280px', // Large desktop
};
```

**Implementation**:
- Base styles for mobile (375px)
- Progressive enhancement for larger screens
- Touch-friendly interaction targets (44px minimum)
- Flexible layouts using CSS Grid and Flexbox

### 6. **Component Composability**
Components should work together seamlessly and be easily combinable.

**Principles**:
- Single responsibility per component
- Clear, predictable props interfaces
- Consistent naming conventions
- No hardcoded dependencies between components
- Support for custom styling through `className` prop

**Example**:
```typescript
// Components compose naturally
<Card>
  <Card.Header>
    <HeaderInfo level="Iniciante" xp="0 XP" />
  </Card.Header>
  <Card.Content>
    <Button variant="primary">Action</Button>
  </Card.Content>
</Card>
```

## Figma Integration Workflow

### 1. Design Token Extraction
**Before any component work:**
1. Select component in Figma
2. Extract variables: `mcp__figma-dev-mode-mcp-server__get_variable_defs`
3. Update design system tokens in `/design-tokens/`
4. Use tokens in component implementation

### 2. Component Generation Process
1. **Design**: Create component in Figma with proper variables
2. **Extract**: Use MCP tools to get component code and tokens
3. **Implement**: Generate React component using design tokens
4. **Test**: Verify visual match with Figma design
5. **Document**: Create Storybook stories showing design variants

### 3. Maintenance and Updates
- Design changes start in Figma
- Re-extract tokens and component code through MCP
- Update implementation to match new design
- Test for regressions in existing usage

## Quality Standards

### Visual Consistency
- Components must match Figma designs exactly
- Typography, colors, spacing from design tokens only
- Consistent interaction states (hover, focus, disabled)
- Proper loading and error states

### Code Quality
- TypeScript with comprehensive type definitions
- Proper error boundaries and fallbacks
- Performance optimized (lazy loading, memoization)
- Clean, readable, well-documented code

### Testing Coverage
- Unit tests for all component logic
- Accessibility tests with jest-axe
- Visual regression testing against Figma designs
- Integration tests for component interactions

## Design Token Categories

### Colors
Extracted from Figma Variables:
- Brand colors (primary, secondary)
- Semantic colors (success, warning, error)
- Neutral colors (grays, whites, blacks)
- Component-specific colors

### Typography
Extracted from Figma Text Styles:
- Font families, weights, sizes
- Line heights and letter spacing
- Text transforms and decorations
- Component-specific text styles

### Spacing
Extracted from Figma Spacing Variables:
- Margin and padding values
- Component internal spacing
- Layout grid systems
- Responsive spacing scales

### Shadows and Effects
Extracted from Figma Effect Styles:
- Drop shadows and inner shadows
- Border radius values
- Blur and opacity effects
- Component state effects

## Success Metrics

### Design-Code Consistency
- Visual match score: 100% pixel-perfect match with Figma
- Token usage: 100% of styling uses design tokens
- No hardcoded values in component implementations

### Developer Experience
- Time from Figma to code: < 30 minutes per component
- Token extraction: Fully automated through MCP
- Component reusability: High adoption across projects

### Accessibility Compliance
- WCAG 2.1 AA compliance: 100% of components
- Keyboard navigation: Full support across all interactions
- Screen reader compatibility: Complete semantic markup

This approach ensures our design system maintains perfect synchronization between design intent and code implementation while providing excellent developer and user experiences.