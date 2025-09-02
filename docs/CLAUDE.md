# Design System with Figma MCP Integration

## Project Overview
This project uses **Figma MCP (Model Context Protocol) server** integration with Claude Code to extract design tokens and generate React TypeScript components directly from Figma selections, ensuring perfect design-to-code synchronization.

## Architecture
- **Direct Figma MCP Integration**: Real-time extraction from Figma selections using Claude Code's built-in MCP tools
- **Design Token Synchronization**: Automatic extraction and updating of design system tokens
- **Intelligent Component Generation**: AI-powered component creation with proper TypeScript interfaces and accessibility
- **Design System Consistency**: All components use centralized design tokens from Figma

## Key Principles
- **Figma-First Design Tokens**: Always extract variables/tokens from Figma before code generation
- **Design System Token Usage**: Components must use tokens from `/design-tokens/` directory
- **Mobile-first responsive design** (xs: 375px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- **React + TypeScript + Tailwind CSS** stack
- **All text content as props** (backend-driven architecture)
- **Semantic HTML with full accessibility** (ARIA attributes, proper roles)
- **Boolean props for 2 variants, union types for 3+**
- **Token-driven styling** instead of hardcoded values

## File Locations
- **Generated components**: `/src/components/ui/`, `/src/components/layout/`
- **Design tokens**: `/design-tokens/`
- **MCP Servers**: `/design-system/mcp-servers/`
- **Configuration**: `.claude-config.json`, `package.json` (claude section)

## Figma MCP Workflow

### Required Process for Component Generation

**ALWAYS follow this sequence:**

1. **Extract Figma Variables**: Use `mcp__figma-dev-mode-mcp-server__get_variable_defs` to get design tokens
2. **Update Design System**: Add/update tokens in `/design-tokens/colors.ts`, `/design-tokens/typography.ts`, `/design-tokens/spacing.ts`
3. **Extract Component Code**: Use `mcp__figma-dev-mode-mcp-server__get_code` to get the component structure
4. **Generate Token-Based Component**: Create component using design system tokens instead of hardcoded values

### Direct Figma Selection Usage
```
User: "Generate my current Figma selection as a HeaderInfo component"

Claude Code automatically:
1. Calls mcp__figma-dev-mode-mcp-server__get_variable_defs (extract design tokens)
2. Updates /design-tokens/ files with new Figma variables  
3. Calls mcp__figma-dev-mode-mcp-server__get_code (get component structure)
4. Generates HeaderInfo.tsx using design system tokens
5. Creates comprehensive Storybook stories
6. Adds proper imports from design-tokens
7. Places files in /src/components/ui/HeaderInfo/
```

### MCP Tools Available
- `mcp__figma-dev-mode-mcp-server__get_code` - Extract component code from Figma selection
- `mcp__figma-dev-mode-mcp-server__get_variable_defs` - Extract design variables/tokens
- `mcp__figma-dev-mode-mcp-server__get_image` - Get visual representation
- `mcp__figma-dev-mode-mcp-server__get_metadata` - Get structure metadata

### Expected Output Structure
Claude Code should generate:
```
src/components/ui/ComponentName/
├── ComponentName.tsx          # Main component with TypeScript
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx     # Jest + accessibility tests
└── index.ts                   # Export file
```

### Required Standards
- **Design Token First**: ALWAYS extract Figma variables before generating components
- **Token Usage**: Import and use design system tokens instead of hardcoded values
- **TypeScript**: Comprehensive interfaces with JSDoc
- **Accessibility**: WCAG compliance, ARIA attributes, semantic HTML
- **Responsive**: Mobile-first using Tailwind breakpoints (xs:375px, sm:640px, md:768px, lg:1024px, xl:1280px)
- **Testing**: Jest + Testing Library + jest-axe for accessibility
- **Figma Sync**: Components must stay in sync with Figma design tokens

## MCP Data Structure
The Figma MCP server provides Claude with:

```json
{
  "componentName": "PaymentCard",
  "responsive": {
    "desktop": { "width": 400, "height": 300, "layout": "..." },
    "mobile": { "width": 350, "height": 280, "layout": "..." }
  },
  "textLayers": [
    { "name": "Amount", "characters": "$299.00", "style": "..." },
    { "name": "Description", "characters": "Monthly Premium", "style": "..." }
  ],
  "designTokens": {
    "colors": { "primary": "#3B82F6", "surface": "#F8FAFC" },
    "spacing": { "padding-16": "16px", "gap-12": "12px" },
    "typography": { "heading": "text-xl font-semibold" }
  },
  "interactions": ["hover", "click", "focus"],
  "variants": ["default", "loading", "success", "error"]
}
```

## Claude Code Capabilities
With this data, Claude Code can generate:

### 1. **Intelligent Component Types**
- **Buttons**: With proper variants, states, loading indicators
- **Cards**: Complex layouts with images, content hierarchy
- **Forms**: Input validation, error states, accessibility
- **Navigation**: Menus, tabs, breadcrumbs with proper keyboard support
- **Data Display**: Tables, lists, charts with responsive behavior

### 2. **Advanced Features**
- **State Management**: React hooks for interactive components
- **Responsive Design**: Mobile-first breakpoint implementation
- **Accessibility**: Screen reader support, keyboard navigation, focus management
- **Type Safety**: Comprehensive TypeScript interfaces
- **Design Tokens**: Automatic token usage from Figma styles

### 3. **Component Structure**
```typescript
interface PaymentCardProps {
  amount: number;
  currency: string;
  description?: string;
  variant: 'default' | 'premium' | 'enterprise';
  paymentMethod: 'card' | 'paypal' | 'crypto';
  onPaymentClick: (method: PaymentMethod) => void;
  isProcessing?: boolean;
  disabled?: boolean;
}
```

## Usage Examples

### From Figma Selection (Recommended)
```bash
# Select component in Figma desktop app, then:
"Generate my current Figma selection as a PrimaryButton component"
"Create a PaymentCard component from my Figma selection"
"Add HeaderInfo component from current selection"
```

### From Figma URL (Alternative)
```bash
# Using specific node IDs
"Generate component from https://figma.com/design/file?node-id=1-2"
"Create Button from figma.com/file/abc123?node-id=1:2"
```

### Expected Output Structure
```
src/components/ui/PaymentCard/
   PaymentCard.tsx          # AI-generated sophisticated component
   PaymentCard.stories.tsx  # Comprehensive Storybook stories
   PaymentCard.test.tsx     # Accessibility and interaction tests
   index.ts                 # Export file
```

## Environment Setup

### Required Environment Variables
```bash
FIGMA_TOKEN=your_figma_personal_access_token
```

### Required Tools
- Node.js 18+
- Claude Code CLI
- Figma personal access token
- Tailwind CSS configured
- Storybook setup
- Testing libraries (@testing-library/react, jest-axe)

## Benefits of Claude Code Integration
- **Any Component Complexity**: Generate sophisticated components beyond simple templates
- **Design Pattern Recognition**: AI identifies UI patterns and implements accordingly
- **Context-Aware Generation**: Proper prop interfaces based on actual design variations
- **Accessibility First**: Automatic ARIA attributes and semantic HTML
- **Responsive Intelligence**: Smart breakpoint implementation
- **Interactive Behavior**: State management for complex components