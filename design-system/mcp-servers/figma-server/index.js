#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

class FigmaServer {
  constructor() {
    this.figmaToken = process.env.FIGMA_TOKEN;
    if (!this.figmaToken) {
      console.error('FIGMA_TOKEN environment variable is required');
      process.exit(1);
    }
  }

  async getFigmaFile(fileId) {
    try {
      console.log(`Fetching Figma file: ${fileId}`);
      const response = await fetch(`https://api.figma.com/v1/files/${fileId}`, {
        headers: {
          'X-Figma-Token': this.figmaToken
        }
      });

      if (!response.ok) {
        throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching Figma file:', error);
      throw error;
    }
  }

  async getNodeData(fileId, nodeIds) {
    try {
      console.log(`Fetching nodes: ${nodeIds.join(', ')} from file: ${fileId}`);
      const nodeIdsParam = nodeIds.join(',');
      const response = await fetch(
        `https://api.figma.com/v1/files/${fileId}/nodes?ids=${nodeIdsParam}`,
        {
          headers: {
            'X-Figma-Token': this.figmaToken
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching Figma nodes:', error);
      throw error;
    }
  }

  parseSelectionUrl(url) {
    try {
      // Parse Figma URL to extract file ID and node IDs
      // Format: https://www.figma.com/file/FILE_ID/title?node-id=NODE_IDS
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      const fileId = pathParts[2]; // /file/FILE_ID/title
      
      const nodeIdParam = urlObj.searchParams.get('node-id');
      if (!nodeIdParam) {
        throw new Error('No node-id parameter found in URL');
      }

      // Node IDs can be comma-separated or use %2C encoding
      const nodeIds = decodeURIComponent(nodeIdParam).split(',').map(id => id.trim());

      return { fileId, nodeIds };
    } catch (error) {
      console.error('Error parsing Figma URL:', error);
      throw new Error(`Invalid Figma URL format: ${error.message}`);
    }
  }

  extractComponentData(nodeData, componentName) {
    const extractedData = {
      componentName,
      variants: {},
      designTokens: {
        colors: {},
        typography: {},
        spacing: {}
      },
      responsive: {
        desktop: null,
        mobile: null
      },
      textLayers: [],
      props: {}
    };

    // Process each node in the response
    for (const [nodeId, node] of Object.entries(nodeData.nodes)) {
      if (!node || !node.document) continue;

      const document = node.document;
      console.log(`Processing node: ${document.name} (${document.type})`);

      // Determine if this is desktop or mobile based on name or size
      const isDesktop = this.isDesktopVariant(document);
      const isMobile = this.isMobileVariant(document);

      if (isDesktop) {
        extractedData.responsive.desktop = this.extractNodeStyles(document);
      } else if (isMobile) {
        extractedData.responsive.mobile = this.extractNodeStyles(document);
      }

      // Extract text layers for props
      this.extractTextLayers(document, extractedData.textLayers);

      // Extract design tokens
      this.extractDesignTokens(document, extractedData.designTokens);
    }

    // Generate props from text layers
    extractedData.props = this.generatePropsFromTextLayers(extractedData.textLayers);

    return extractedData;
  }

  isDesktopVariant(node) {
    const name = node.name.toLowerCase();
    return name.includes('desktop') || name.includes('web') || 
           (node.absoluteBoundingBox && node.absoluteBoundingBox.width > 600);
  }

  isMobileVariant(node) {
    const name = node.name.toLowerCase();
    return name.includes('mobile') || name.includes('phone') || 
           (node.absoluteBoundingBox && node.absoluteBoundingBox.width <= 400);
  }

  extractNodeStyles(node) {
    return {
      width: node.absoluteBoundingBox?.width || 0,
      height: node.absoluteBoundingBox?.height || 0,
      backgroundColor: this.convertFigmaColor(node.backgroundColor),
      borderRadius: node.cornerRadius || 0,
      padding: this.extractPadding(node),
      layout: this.extractLayout(node)
    };
  }

  extractTextLayers(node, textLayers) {
    if (node.type === 'TEXT') {
      textLayers.push({
        id: node.id,
        name: node.name,
        characters: node.characters,
        style: {
          fontSize: node.style?.fontSize || 16,
          fontWeight: node.style?.fontWeight || 400,
          lineHeight: node.style?.lineHeightPx || node.style?.fontSize * 1.2,
          color: this.convertFigmaColor(node.fills?.[0]?.color)
        }
      });
    }

    // Recursively process children
    if (node.children) {
      for (const child of node.children) {
        this.extractTextLayers(child, textLayers);
      }
    }
  }

  extractDesignTokens(node, tokens) {
    // Extract colors from fills
    if (node.fills) {
      for (const fill of node.fills) {
        if (fill.type === 'SOLID' && fill.color) {
          const colorHex = this.convertFigmaColor(fill.color);
          if (colorHex) {
            tokens.colors[`color-${Object.keys(tokens.colors).length + 1}`] = colorHex;
          }
        }
      }
    }

    // Extract spacing from layout
    if (node.layoutMode) {
      if (node.paddingLeft !== undefined) {
        tokens.spacing[`padding-${node.paddingLeft}`] = `${node.paddingLeft}px`;
      }
      if (node.itemSpacing !== undefined) {
        tokens.spacing[`gap-${node.itemSpacing}`] = `${node.itemSpacing}px`;
      }
    }

    // Process children
    if (node.children) {
      for (const child of node.children) {
        this.extractDesignTokens(child, tokens);
      }
    }
  }

  generatePropsFromTextLayers(textLayers) {
    const props = {};
    
    for (const textLayer of textLayers) {
      const name = textLayer.name.toLowerCase();
      
      if (name.includes('title') || name.includes('heading')) {
        props.title = { type: 'string', required: true };
      } else if (name.includes('description') || name.includes('body')) {
        props.description = { type: 'string', required: false };
      } else if (name.includes('button') || name.includes('cta') || name.includes('label')) {
        props.label = { type: 'string', required: true };
      } else {
        // Generic text prop based on layer name
        const propName = name.replace(/\s+/g, '');
        props[propName] = { type: 'string', required: false };
      }
    }

    return props;
  }

  convertFigmaColor(figmaColor) {
    if (!figmaColor) return null;
    
    const r = Math.round((figmaColor.r || 0) * 255);
    const g = Math.round((figmaColor.g || 0) * 255);
    const b = Math.round((figmaColor.b || 0) * 255);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  extractPadding(node) {
    return {
      top: node.paddingTop || 0,
      right: node.paddingRight || 0,
      bottom: node.paddingBottom || 0,
      left: node.paddingLeft || 0
    };
  }

  extractLayout(node) {
    return {
      layoutMode: node.layoutMode || 'NONE',
      itemSpacing: node.itemSpacing || 0,
      mainAxisAlignItems: node.primaryAxisAlignItems || 'MIN',
      crossAxisAlignItems: node.counterAxisAlignItems || 'MIN',
      layoutWrap: node.layoutWrap || 'NO_WRAP'
    };
  }
}

// Initialize the server
const figmaServer = new FigmaServer();
const server = new Server(
  {
    name: 'figma-server',
    version: '1.0.0'
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// Define available tools
server.setRequestHandler('tools/list', async (request) => {
  return {
    tools: [
      {
        name: 'get_figma_selection',
        description: 'Extract component data from Figma selection URL',
        inputSchema: {
          type: 'object',
          properties: {
            selectionUrl: {
              type: 'string',
              description: 'Figma selection URL with file ID and node IDs'
            },
            componentName: {
              type: 'string',
              description: 'Name for the component to generate'
            }
          },
          required: ['selectionUrl', 'componentName']
        }
      },
      {
        name: 'get_design_tokens',
        description: 'Extract design tokens from Figma file',
        inputSchema: {
          type: 'object',
          properties: {
            fileId: {
              type: 'string',
              description: 'Figma file ID'
            }
          },
          required: ['fileId']
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'get_figma_selection': {
        console.log(`Extracting Figma selection: ${args.selectionUrl}`);
        const { fileId, nodeIds } = figmaServer.parseSelectionUrl(args.selectionUrl);
        const nodeData = await figmaServer.getNodeData(fileId, nodeIds);
        const componentData = figmaServer.extractComponentData(nodeData, args.componentName);
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(componentData, null, 2)
            }
          ]
        };
      }

      case 'get_design_tokens': {
        console.log(`Extracting design tokens from file: ${args.fileId}`);
        const fileData = await figmaServer.getFigmaFile(args.fileId);
        
        // Extract design tokens from the file
        const tokens = {
          colors: {},
          typography: {},
          spacing: {}
        };
        
        // Process the file's document to extract tokens
        if (fileData.document) {
          figmaServer.extractDesignTokens(fileData.document, tokens);
        }
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(tokens, null, 2)
            }
          ]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    console.error(`Error executing tool ${name}:`, error);
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`
        }
      ]
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('Figma MCP Server started successfully');
}

main().catch(console.error);