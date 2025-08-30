#!/usr/bin/env node

// Simple test to verify MCP server functionality
import { spawn } from 'child_process';

function testMcpServer() {
  console.log('🧪 Testing Figma MCP Server...');
  
  if (!process.env.FIGMA_TOKEN) {
    console.error('❌ FIGMA_TOKEN environment variable is required');
    console.log('Set it with: export FIGMA_TOKEN="your_token_here"');
    process.exit(1);
  }

  const server = spawn('node', ['index.js'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env }
  });

  let stdout = '';
  let stderr = '';

  server.stdout.on('data', (data) => {
    stdout += data.toString();
    console.log('STDOUT:', data.toString());
  });

  server.stderr.on('data', (data) => {
    stderr += data.toString();
    console.log('STDERR:', data.toString());
  });

  server.on('close', (code) => {
    console.log(`\n📊 Test Results:`);
    console.log(`Exit code: ${code}`);
    console.log(`STDOUT length: ${stdout.length}`);
    console.log(`STDERR length: ${stderr.length}`);
    
    if (stderr.includes('Figma MCP Server started successfully')) {
      console.log('✅ Server started successfully');
    } else {
      console.log('❌ Server failed to start');
    }
  });

  // Send a simple tools/list request
  setTimeout(() => {
    console.log('📤 Sending tools/list request...');
    const request = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {}
    };
    
    server.stdin.write(JSON.stringify(request) + '\n');
    
    // Give it time to respond then close
    setTimeout(() => {
      server.kill('SIGTERM');
    }, 2000);
  }, 1000);
}

testMcpServer();