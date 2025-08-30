#!/usr/bin/env node

import { spawn } from 'child_process';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

class ComponentGenerator {
  constructor() {
    this.templatesDir = join(ROOT_DIR, 'design-system', 'templates');
    this.componentsDir = join(ROOT_DIR, 'src', 'components');
  }

  // Execute simple Figma extraction
  async extractFromFigma(figmaUrl, componentName) {
    return new Promise((resolve, reject) => {
      console.log(`🔧 Extracting from Figma...`);
      
      const extractor = spawn('node', [
        join(ROOT_DIR, 'design-system', 'mcp-servers', 'figma-server', 'simple-server.js'),
        figmaUrl,
        componentName
      ], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env }
      });

      let stdout = '';
      let stderr = '';

      extractor.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      extractor.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      extractor.on('close', (code) => {
        if (code === 0) {
          try {
            // Look for JSON data in stdout
            const lines = stdout.split('\n');
            const jsonStart = lines.findIndex(line => line.trim() === '📊 Extracted Data:');
            
            if (jsonStart >= 0) {
              // Join all lines after the marker and parse as JSON
              const jsonStr = lines.slice(jsonStart + 1).join('\n').trim();
              const data = JSON.parse(jsonStr);
              resolve(data);
            } else {
              reject(new Error('No JSON data found in output'));
            }
          } catch (error) {
            reject(new Error(`Failed to parse response: ${error.message}`));
          }
        } else {
          reject(new Error(`Extractor failed with code ${code}: ${stderr}`));
        }
      });

      // Timeout after 30 seconds
      setTimeout(() => {
        extractor.kill();
        reject(new Error('Figma extraction timed out'));
      }, 30000);
    });
  }

  // Simplified template rendering without Mustache
  renderTemplate(template, data) {
    let result = template;
    
    // Simple variable substitution
    Object.keys(data).forEach(key => {
      const value = data[key];
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, value || '');
    });
    
    // Handle array iteration for props
    if (data.props && Array.isArray(data.props)) {
      // Replace {{#props}}...{{/props}} blocks
      const propsRegex = /{{#props}}([\s\S]*?){{\/props}}/g;
      result = result.replace(propsRegex, (match, template) => {
        return data.props.map(prop => {
          let propTemplate = template;
          Object.keys(prop).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            propTemplate = propTemplate.replace(regex, prop[key] || '');
          });
          return propTemplate;
        }).join('');
      });
    }
    
    return result;
  }

  // Process Figma data into simple template data
  processFigmaData(figmaData, componentName) {
    console.log('🔄 Processing Figma data...');
    
    const { nodes } = figmaData;
    const firstNode = nodes[0] || {};
    
    // Extract basic information
    const hasTextLayers = nodes.some(node => node.textLayers && node.textLayers.length > 0);
    const textLayers = [];
    
    nodes.forEach(node => {
      if (node.textLayers) {
        textLayers.push(...node.textLayers);
      }
    });

    // Generate simple props
    const props = [];
    if (hasTextLayers && textLayers.length > 0) {
      const firstText = textLayers[0];
      props.push({
        name: 'children',
        type: 'React.ReactNode',
        optional: '?'
      });
    }

    // Determine element type
    const elementType = this.determineElementType(firstNode);
    const category = this.determineCategory(componentName);

    return {
      componentName,
      interfaceName: `${componentName}Props`,
      elementType,
      category,
      description: `${componentName} component generated from Figma design`,
      baseClasses: 'flex items-center justify-center px-4 py-2 rounded-md',
      props,
      hasChildren: hasTextLayers
    };
  }

  determineElementType(node) {
    if (!node || !node.name) return 'div';
    
    const name = node.name.toLowerCase();
    if (name.includes('button')) return 'button';
    if (name.includes('input')) return 'input';
    if (name.includes('link')) return 'a';
    return 'div';
  }

  determineCategory(componentName) {
    const name = componentName.toLowerCase();
    if (name.includes('button') || name.includes('input')) return 'ui';
    return 'ui';
  }

  // Generate component files
  generateComponentFiles(templateData) {
    console.log(`📝 Generating ${templateData.componentName} component files...`);
    
    const { componentName, category } = templateData;
    const componentDir = join(this.componentsDir, category, componentName);
    
    // Ensure directory exists
    if (!existsSync(componentDir)) {
      mkdirSync(componentDir, { recursive: true });
    }

    // Simple component template
    const componentCode = `import React from 'react';
import { cn } from '@/utils/cn';

export interface ${templateData.interfaceName} {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ${componentName} = React.forwardRef<
  HTML${templateData.elementType === 'button' ? 'Button' : 'Div'}Element,
  ${templateData.interfaceName}
>(({ children, className, ...props }, ref) => {
  return (
    <${templateData.elementType}
      ref={ref}
      className={cn(
        "${templateData.baseClasses}",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </${templateData.elementType}>
  );
});

${componentName}.displayName = '${componentName}';

export default ${componentName};`;

    // Simple story template
    const storyCode = `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta = {
  title: '${templateData.category}/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default ${componentName}',
  },
};`;

    // Simple test template
    const testCode = `import React from 'react';
import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders without crashing', () => {
    render(<${componentName}>Test</${componentName}>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<${componentName} className="custom-class">Test</${componentName}>);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('custom-class');
  });
});`;

    // Write files
    writeFileSync(join(componentDir, `${componentName}.tsx`), componentCode);
    writeFileSync(join(componentDir, `${componentName}.stories.tsx`), storyCode);
    writeFileSync(join(componentDir, `${componentName}.test.tsx`), testCode);
    writeFileSync(join(componentDir, 'index.ts'), `export { ${componentName} } from './${componentName}';`);

    console.log(`✅ Generated files in ${componentDir}`);
    return componentDir;
  }

  // Main generation function
  async generate(figmaUrl, componentName) {
    try {
      console.log(`🚀 Generating component: ${componentName}`);
      console.log(`📐 From Figma URL: ${figmaUrl}`);

      // Step 1: Extract data from Figma
      console.log('🔍 Extracting data from Figma...');
      const figmaData = await this.extractFromFigma(figmaUrl, componentName);

      // Step 2: Process Figma data into template data
      const templateData = this.processFigmaData(figmaData, componentName);

      // Step 3: Generate component files
      const componentDir = this.generateComponentFiles(templateData);

      console.log(`\n🎉 Component generation complete!`);
      console.log(`📁 Files generated in: ${componentDir}`);
      console.log(`📝 Run 'npm run storybook' to view the component`);

      return {
        success: true,
        componentDir,
        figmaData: templateData
      };

    } catch (error) {
      console.error(`❌ Generation failed: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Command line interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: node generate-component.js <figma-url> <component-name>');
    console.log('Example: node generate-component.js "https://www.figma.com/file/abc123?node-id=1%3A2" "Button"');
    process.exit(1);
  }

  const [figmaUrl, componentName] = args;
  
  const generator = new ComponentGenerator();
  const result = await generator.generate(figmaUrl, componentName);
  
  process.exit(result.success ? 0 : 1);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default ComponentGenerator;
