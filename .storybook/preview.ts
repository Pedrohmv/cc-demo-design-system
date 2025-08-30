import type { Preview } from "@storybook/react";
import "../app/globals.css"; // Your Tailwind CSS

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "667px" } },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1024px", height: "768px" },
        },
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'autocomplete-valid',
            enabled: false, // Disable for form controls in Storybook
          },
        ],
      },
    },
  },
};

export default preview;
