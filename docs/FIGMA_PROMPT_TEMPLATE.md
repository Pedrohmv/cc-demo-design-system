# Figma MCP Component Generation Prompts

## Direct Figma Selection (Recommended)

### Simple Figma Selection Prompt:
```
"Generate my current Figma selection as a [ComponentName] component"
```

### Extended Figma Selection Prompt:
```
"Generate my current Figma selection as a [ComponentName] component.

IMPORTANT: Always follow this sequence:
1. Extract Figma variables using mcp__figma-dev-mode-mcp-server__get_variable_defs
2. Update design system tokens in /design-tokens/ 
3. Extract component code using mcp__figma-dev-mode-mcp-server__get_code
4. Generate component using design tokens instead of hardcoded values

Create complete component structure in /src/components/ui/ComponentName/ with:
- ComponentName.tsx (using design tokens from /design-tokens/)
- ComponentName.stories.tsx (comprehensive Storybook stories)
- ComponentName.test.tsx (Jest + accessibility tests)
- index.ts (exports)

Follow docs/COMPONENT_GUIDELINES.md for implementation standards."
```

## Alternative: Figma URL Method

### Simple URL Prompt:
```
"Generate [ComponentName] from [figma-url]"
```

### Extended URL Prompt:
```
"Generate a [ComponentName] component from [figma-url].

CRITICAL: Always extract design tokens first:
1. Use mcp__figma-dev-mode-mcp-server__get_variable_defs to get Figma variables
2. Update /design-tokens/colors.ts, /design-tokens/typography.ts files
3. Use mcp__figma-dev-mode-mcp-server__get_code to get component structure
4. Import and use design tokens in component instead of hardcoded values

Follow complete MCP workflow from docs/COMPONENT_GUIDELINES.md."
```

## Examples

### Current Selection Examples:
```
Simple: "Generate my current Figma selection as a HeaderInfo component"

Extended: "Generate my current Figma selection as a PaymentCard component. Extract design tokens first, update design system, then create component using tokens."
```

### URL Examples:
```
Simple: "Generate Button from https://figma.com/design/file?node-id=1-2"

Extended: "Generate a PrimaryButton component from https://figma.com/file/abc123?node-id=1:2. Always extract Figma variables first, update design tokens, then generate component using design system tokens."
```

## Key Workflow Reminders

### ALWAYS Include This Sequence:
1. **Extract Figma Variables**: `mcp__figma-dev-mode-mcp-server__get_variable_defs`
2. **Update Design System**: Add tokens to `/design-tokens/` files  
3. **Extract Component**: `mcp__figma-dev-mode-mcp-server__get_code`
4. **Use Design Tokens**: Import and use tokens instead of hardcoded values

### Example Token Usage:
```typescript
// ❌ Don't use hardcoded values:
<div className="text-[#2d5f3a]">

// ✅ Use design system tokens:
import { colors } from '../../../design-tokens/colors';
<div style={{ color: colors['primary-green-darkest'] }}>
```

## For Different Development Environments

### Claude Code (Built-in MCP):
- Use simple prompts - MCP integration is automatic
- Focus on component requirements and design token usage

### Other Interfaces:
- Use extended prompts to be explicit about MCP workflow
- Emphasize the design token extraction sequence
- Reference docs/COMPONENT_GUIDELINES.md for standards

Both approaches will produce token-based components that maintain perfect design-to-code synchronization.