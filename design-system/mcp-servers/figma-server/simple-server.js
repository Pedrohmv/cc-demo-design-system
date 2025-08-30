#!/usr/bin/env node

// Simple Figma extraction server without MCP complexity
// For now, let's just create a direct extraction tool

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

class FigmaExtractor {
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
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
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
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
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
      responsive: { desktop: null, mobile: null },
      styles: {}
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
        textLayers: [],
        styles: this.extractAllStyles(document)
      };

      // Determine if desktop or mobile based on name/size
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

  extractAllStyles(node) {
    return {
      cornerRadius: node.cornerRadius,
      rectangleCornerRadii: node.rectangleCornerRadii,
      fills: node.fills,
      strokes: node.strokes,
      strokeWeight: node.strokeWeight,
      effects: node.effects,
      opacity: node.opacity,
      blendMode: node.blendMode,
      layoutMode: node.layoutMode,
      paddingLeft: node.paddingLeft,
      paddingRight: node.paddingRight,
      paddingTop: node.paddingTop,
      paddingBottom: node.paddingBottom
    };
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
        fontSize: node.style?.fontSize || 16,
        fontWeight: node.style?.fontWeight || 400
      });
    }

    if (node.children) {
      for (const child of node.children) {
        this.extractTextLayers(child, textLayers);
      }
    }
  }

  extractButtonElements(node, elements = []) {
    // Look for elements that look like buttons
    if (node.name && (
      node.name.toLowerCase().includes('button') ||
      node.name.toLowerCase().includes('btn') ||
      (node.type === 'RECTANGLE' && node.fills && node.fills.length > 0)
    )) {
      elements.push({
        id: node.id,
        name: node.name,
        type: node.type,
        styles: this.extractAllStyles(node),
        boundingBox: node.absoluteBoundingBox
      });
    }

    if (node.children) {
      for (const child of node.children) {
        this.extractButtonElements(child, elements);
      }
    }

    return elements;
  }

  async extractFromUrl(figmaUrl, componentName) {
    try {
      const { fileId, nodeIds } = this.parseSelectionUrl(figmaUrl);
      const nodeData = await this.getNodeData(fileId, nodeIds);
      const componentData = this.extractComponentData(nodeData, componentName);
      
      console.log('✅ Extraction successful');
      return componentData;
    } catch (error) {
      console.error('❌ Extraction failed:', error.message);
      throw error;
    }
  }
}

// Export for use in other files
export default FigmaExtractor;

// If run directly, test with command line arguments
if (import.meta.url === `file://${process.argv[1]}`) {
  async function main() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
      console.log('Usage: node simple-server.js <figma-url> <component-name>');
      process.exit(1);
    }

    const [figmaUrl, componentName] = args;
    const extractor = new FigmaExtractor();
    
    try {
      const result = await extractor.extractFromUrl(figmaUrl, componentName);
      console.log('\n📊 Extracted Data:');
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Failed:', error.message);
      process.exit(1);
    }
  }

  main();
}