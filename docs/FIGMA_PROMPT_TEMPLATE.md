# Universal Figma Component Generation Prompt

## For Teams Using Different Claude Interfaces

### Simple Prompt (Works in Claude Code automatically):
```
"Generate [ComponentName] from [figma-url]"
```

### Extended Prompt (For Cursor or other interfaces):
```
"Generate a [ComponentName] component from [figma-url].

Use the MCP Figma server at design-system/mcp-servers/figma-server/ to extract design data. Follow the guidelines in docs/COMPONENT_GUIDELINES.md to create:

- ComponentName.tsx (TypeScript component with proper interface)
- ComponentName.stories.tsx (Storybook stories)  
- ComponentName.test.tsx (Jest + accessibility tests)
- index.ts (exports)

Place in src/components/ui/ComponentName/ directory. Use mobile-first responsive design with Tailwind CSS."
```

### Examples:
```
Simple: "Generate PaymentCard from https://www.figma.com/file/abc123?node-id=1:2,1:3"

Extended: "Generate a PaymentCard component from https://www.figma.com/file/abc123?node-id=1:2,1:3. Use the MCP Figma server to extract design data and follow docs/COMPONENT_GUIDELINES.md standards."
```

Both will produce identical results - the extended version just makes the instructions explicit for interfaces that don't auto-read project configuration.