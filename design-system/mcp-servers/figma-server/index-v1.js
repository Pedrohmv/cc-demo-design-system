#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

class FigmaServer {
  constructor() {
    this.figmaToken = process.env.FIGMA_TOKEN;
    if (!this.figmaToken) {
      console.error('FIGMA_TOKEN environment variable is required');
      process.exit(1);
    }
  }

  async getFigmaFile(fileId) {
    console.log(`Fetching Figma file: ${fileId}`);
    const response = await fetch(`https://api.figma.com/v1/files/${fileId}`, {
      headers: { 'X-Figma-Token': this.figmaToken }
    });
    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status}`);
    }
    return await response.json();
  }

  async getNodeData(fileId, nodeIds) {
    console.log(`Fetching nodes: ${nodeIds.join(', ')}`);
    const response = await fetch(
      `https://api.figma.com/v1/files/${fileId}/nodes?ids=${nodeIds.join(',')}`,
      { headers: { 'X-Figma-Token': this.figmaToken } }
    );
    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status}`);
    }
    return await response.json();
  }

  parseSelectionUrl(url) {
    const urlObj = new URL(url);
    const fileId = urlObj.pathname.split('/')[2];
    const nodeIdParam = urlObj.searchParams.get('node-id');
    if (!nodeIdParam) {
      throw new Error('No node-id parameter found in URL');
    }
    const nodeIds = decodeURIComponent(nodeIdParam).split(',').map(id => id.trim());
    return { fileId, nodeIds };
  }

  extractComponentData(nodeData, componentName) {
    const data = {
      componentName,
      nodes: [],
      textLayers: [],
      responsive: { desktop: null, mobile: null }
    };

    for (const [nodeId, node] of Object.entries(nodeData.nodes)) {
      if (!node || !node.document) continue;
      
      const document = node.document;
      const nodeInfo = {
        id: nodeId,
        name: document.name,
        type: document.type,
        width: document.absoluteBoundingBox?.width || 0,
        height: document.absoluteBoundingBox?.height || 0,
        textLayers: []
      };

      // Determine if desktop or mobile
      if (this.isDesktopVariant(document)) {
        data.responsive.desktop = nodeInfo;
      } else if (this.isMobileVariant(document)) {
        data.responsive.mobile = nodeInfo;
      }

      this.extractTextLayers(document, nodeInfo.textLayers);
      data.nodes.push(nodeInfo);
      data.textLayers.push(...nodeInfo.textLayers);
    }

    return data;
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

  extractTextLayers(node, textLayers) {
    if (node.type === 'TEXT') {
      textLayers.push({
        id: node.id,
        name: node.name,
        characters: node.characters,
        fontSize: node.style?.fontSize || 16
      });
    }

    if (node.children) {
      for (const child of node.children) {
        this.extractTextLayers(child, textLayers);
      }
    }
  }
}

// Initialize the server
const figmaServer = new FigmaServer();
const server = new Server(
  {
    name: 'figma-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
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
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'get_figma_selection') {
    try {
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
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  throw new Error(`Unknown tool: ${name}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Figma MCP Server v1.0 started successfully');
}

main().catch(console.error);