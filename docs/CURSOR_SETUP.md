# Cursor Setup for Design System Component Generation

## Overview
This guide enables Cursor users to generate components from Figma designs using the same workflow as Claude Code.

## Cursor Configuration

### 1. Rules File
The `.cursorrules` file provides automatic context to Cursor about:
- Project structure and component generation workflow
- MCP server integration for Figma data extraction
- Component guidelines and standards to follow

### 2. Usage Pattern
In Cursor, use the same simple prompt pattern:

```
"Generate PaymentCard from https://www.figma.com/file/abc123?node-id=1:2,1:3"
```

Cursor will automatically:
- Read the project rules from `.cursorrules`
- Use MCP Figma server to extract design data
- Follow guidelines in `docs/COMPONENT_GUIDELINES.md`
- Generate complete component with all required files

### 3. MCP Server Integration
Cursor should be able to use the MCP server at:
```
design-system/mcp-servers/figma-server/index.js
```

If MCP integration doesn't work, Cursor can:
1. Call the simple server directly: `node design-system/mcp-servers/figma-server/simple-server.js [url] [name]`
2. Use the extracted JSON data to generate components

### 4. Environment Setup
Ensure `FIGMA_TOKEN` environment variable is set:
```bash
export FIGMA_TOKEN=your_figma_personal_access_token
```

## Mixed Team Workflow

### For Claude Code Users:
```
"Generate PaymentCard from [figma-url]"
```

### For Cursor Users:  
```
"Generate PaymentCard from [figma-url]"
```

**Same prompt, same output!** Both tools will:
- Extract Figma design data
- Generate TypeScript component with proper interface
- Create Storybook stories and Jest tests
- Place files in correct directory structure

## Troubleshooting

### If MCP Server Doesn't Work in Cursor:
1. **Manual extraction**: Run the simple server manually and provide JSON to Cursor
2. **Fallback prompt**: Include explicit instructions if `.cursorrules` isn't being read
3. **Guidelines reference**: Tell Cursor to read `docs/COMPONENT_GUIDELINES.md`

### Example Fallback Prompt:
```
"Generate PaymentCard component from [figma-url]. 

Follow guidelines in docs/COMPONENT_GUIDELINES.md. Extract design data using the MCP Figma server, create TypeScript component with proper interface, Storybook stories, and Jest tests. Place in src/components/ui/PaymentCard/"
```

## Benefits
- **Consistent output** across Claude Code and Cursor
- **Same workflow** for all team members  
- **No training needed** - same simple prompts work everywhere
- **Shared guidelines** ensure component quality