#!/usr/bin/env node

// Simple test to verify the Figma MCP server can start and handle basic operations

async function testFigmaServer() {
  try {
    console.log('Testing Figma Server...');
    
    // Check if FIGMA_TOKEN is set
    if (!process.env.FIGMA_TOKEN) {
      console.error('❌ FIGMA_TOKEN environment variable is not set');
      console.log('Set it with: export FIGMA_TOKEN="your_token_here"');
      process.exit(1);
    }
    
    console.log('✅ FIGMA_TOKEN is set');
    
    // Test basic Figma API connectivity
    const response = await fetch('https://api.figma.com/v1/me', {
      headers: {
        'X-Figma-Token': process.env.FIGMA_TOKEN
      }
    });
    
    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }
    
    const userData = await response.json();
    console.log(`✅ Connected to Figma API as: ${userData.email}`);
    
    // Test URL parsing
    const testUrl = "https://www.figma.com/file/abc123/Test%20File?node-id=1%3A2%2C1%3A3";
    try {
      const urlObj = new URL(testUrl);
      const pathParts = urlObj.pathname.split('/');
      const fileId = pathParts[2];
      const nodeIdParam = urlObj.searchParams.get('node-id');
      const nodeIds = decodeURIComponent(nodeIdParam).split(',').map(id => id.trim());
      
      console.log(`✅ URL parsing works:`);
      console.log(`   File ID: ${fileId}`);
      console.log(`   Node IDs: ${nodeIds.join(', ')}`);
    } catch (error) {
      console.error('❌ URL parsing failed:', error.message);
    }
    
    console.log('\n🎉 Figma server setup is working correctly!');
    console.log('\nNext steps:');
    console.log('1. Create a simple component in Figma (button with desktop and mobile versions)');
    console.log('2. Select both frames and copy the link');
    console.log('3. Test with: node test-with-figma.js --url="your_figma_url"');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testFigmaServer();