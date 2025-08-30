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
      textLayers: []
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

      this.extractTextLayers(document, nodeInfo.textLayers);
      data.nodes.push(nodeInfo);
      data.textLayers.push(...nodeInfo.textLayers);
    }

    return data;
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

// Create server instance
const figmaServer = new FigmaServer();

const server = new Server(
  { name: 'figma-server', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// Handle initialize request
server.setRequestHandler('initialize', async () => {
  return {
    protocolVersion: '2024-11-05',
    capabilities: { tools: {} },
    serverInfo: { name: 'figma-server', version: '1.0.0' }
  };
});

// Handle tools/list
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'get_figma_selection',
        description: 'Extract component data from Figma selection URL',
        inputSchema: {
          type: 'object',
          properties: {
            selectionUrl: { type: 'string' },
            componentName: { type: 'string' }
          },
          required: ['selectionUrl', 'componentName']
        }
      }
    ]
  };
});

// Handle tools/call
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'get_figma_selection') {
    try {
      const { fileId, nodeIds } = figmaServer.parseSelectionUrl(args.selectionUrl);
      const nodeData = await figmaServer.getNodeData(fileId, nodeIds);
      const componentData = figmaServer.extractComponentData(nodeData, args.componentName);
      
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(componentData, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Error: ${error.message}`
        }],
        isError: true
      };
    }
  }

  throw new Error(`Unknown tool: ${name}`);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('Figma MCP Server started successfully');
}

main().catch(console.error);