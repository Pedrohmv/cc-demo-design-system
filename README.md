# Design System with Claude Code Integration

An intelligent design system that generates React components from Figma designs using MCP (Model Context Protocol) and Claude Code.

## 🚀 Overview

This project transforms Figma designs into production-ready React components using:

- **MCP Figma Server**: Extracts comprehensive design data from Figma
- **Claude Code Integration**: AI-powered component generation
- **TypeScript + Tailwind**: Modern, type-safe component architecture
- **Full Accessibility**: WCAG compliant components with proper ARIA support

## 🏗️ Architecture

```
Figma Design → MCP Server → Design Data → Claude Code → React Component
```

1. **Figma MCP Server** (`/design-system/mcp-servers/figma-server/`)
   - Extracts design tokens, responsive variants, text layers
   - Connects to Figma API for comprehensive data extraction

2. **Claude Code Integration** (`.claude-config.json`, `package.json`)
   - Automatic component generation from simple prompts
   - Direct MCP server integration without intermediate scripts
   - Intelligent analysis of design patterns and component types

3. **Component Guidelines** (`/docs/COMPONENT_GUIDELINES.md`)
   - Ensures consistent component structure and quality
   - Defines accessibility, responsive design, and testing standards

## 📦 Generated Component Structure

```
src/components/ui/ComponentName/
├── ComponentName.tsx          # AI-generated component with TypeScript
├── ComponentName.stories.tsx  # Comprehensive Storybook stories  
├── ComponentName.test.tsx     # Jest + accessibility tests
└── index.ts                   # Export file
```

## 🛠️ Quick Start

### Prerequisites

```bash
# Required environment variables
export FIGMA_TOKEN=your_figma_personal_access_token

# Install dependencies
npm install
```

### Generate a Component (Direct Claude Code)

Simply provide Claude Code with a **Figma URL** and **Component Name**:

```
"Generate a PaymentCard component from https://www.figma.com/file/ABC123?node-id=1:2,1:3"
```

**Claude Code automatically:**
- 📊 Extracts design data via MCP Figma server
- 🧠 Analyzes responsive variants, text layers, design tokens  
- 🎯 Generates complete component with TypeScript interfaces
- 🧪 Creates comprehensive tests and Storybook stories
- 📁 Places files in correct directory structure

**Examples:**
```
"Generate PrimaryButton from [figma-url]"
"Create ContactForm component from [figma-url]" 
"Build NavigationHeader from [figma-url]"
```

**No scripts needed** - Claude Code handles everything automatically! ✨

### Development

```bash
# Start Next.js development server
npm run dev

# Start Storybook for component development
npm run storybook

# Run linting
npm run lint

# Build design tokens
npm run design-tokens:build
```

## 🎨 What Claude Code Generates

### Intelligent Component Types
- **Buttons**: Variants, loading states, accessibility
- **Cards**: Complex layouts, responsive design
- **Forms**: Validation, error handling, type safety
- **Navigation**: Keyboard support, ARIA attributes
- **Data Display**: Tables, lists with proper semantics

### Advanced Features
- **TypeScript Interfaces**: Comprehensive prop definitions
- **Responsive Design**: Mobile-first breakpoint implementation
- **Accessibility**: WCAG compliance, screen reader support
- **State Management**: React hooks for interactions
- **Design Tokens**: Automatic Figma style extraction
- **Testing**: Jest + Testing Library + accessibility tests

### Example Generated Interface
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
  className?: string;
}
```

## 📁 Project Structure

```
├── docs/
│   ├── CLAUDE.md                    # Claude Code workflow documentation
│   ├── COMPONENT_GUIDELINES.md     # Component generation guidelines
│   └── DESIGN_PRINCIPLES.md        # Design system principles
├── design-system/
│   └── mcp-servers/
│       └── figma-server/           # MCP server for Figma integration
├── .claude-config.json            # Claude Code configuration
├── scripts/                       # Build and utility scripts
├── src/
│   └── components/                 # Generated components
│       ├── ui/                    # UI components (buttons, cards, etc.)
│       └── layout/                # Layout components (headers, grids, etc.)
└── design-tokens/                 # Extracted design tokens
```

## 🎯 Benefits Over Traditional Approaches

### vs. Programmatic Generation
- **Unlimited Complexity**: Generate any component type, not just templates
- **Context Awareness**: AI understands design intent and patterns
- **Intelligent Defaults**: Proper prop interfaces based on design variations

### vs. Manual Coding  
- **Speed**: Minutes instead of hours for complex components
- **Consistency**: Follows design system patterns automatically
- **Quality**: Built-in accessibility, testing, and documentation

### vs. Design-to-Code Tools
- **Flexibility**: Not limited to specific design patterns
- **Code Quality**: Production-ready, maintainable components
- **Integration**: Works with existing React/TypeScript workflows

## 🔧 Configuration

### Environment Variables
```bash
FIGMA_TOKEN=your_figma_personal_access_token
```

### MCP Server Configuration
The Figma MCP server provides structured data including:
- Design tokens (colors, spacing, typography)
- Responsive variants (desktop/mobile)
- Text layers for prop generation
- Layout and interaction patterns

## 📚 Documentation

- **[Claude Code Workflow](docs/CLAUDE.md)**: Complete workflow documentation
- **[Component Guidelines](docs/COMPONENT_GUIDELINES.md)**: Component generation standards
- **[Design Principles](docs/DESIGN_PRINCIPLES.md)**: Design system principles

## 🧪 Testing

```bash
# Component tests
npm run test:components

# Visual regression tests  
npm run test:visual
```

## 🚀 Deployment

```bash
# Build production application
npm run build

# Build Storybook for component documentation
npm run build-storybook
```

## 🤝 Contributing

1. Add new component guidelines to `docs/COMPONENT_GUIDELINES.md`
2. Update MCP server for additional Figma data extraction
3. Enhance Claude Code prompts for better component generation

## 🎉 Result

Generate sophisticated, accessible, production-ready React components from any Figma design in minutes, not hours. Claude Code understands your design intent and creates components that follow your exact specifications with proper TypeScript interfaces, comprehensive testing, and full accessibility support.