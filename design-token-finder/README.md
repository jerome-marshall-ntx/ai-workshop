# Design Token Finder - Figma Plugin

A Figma plugin that helps designers quickly search and copy design system tokens (colors, spacing, typography).

## Workshop Setup Instructions

### Prerequisites
- Figma Desktop app installed (required for plugin development)
- Cursor IDE installed

### Loading the Plugin

1. Open Figma Desktop
2. Go to `Plugins > Development > Import plugin from manifest...`
3. Navigate to this folder and select `manifest.json`
4. The plugin will appear in your plugins menu

### Development Workflow

1. Make changes to `ui.html` or `code.js`
2. In Figma, go to `Plugins > Development > Design Token Finder`
3. The plugin will reload with your changes

### Customizing Tokens

Edit the `tokens` object in `ui.html` to add your actual design system tokens:

```javascript
const tokens = {
  colors: [
    { name: "your-color-name", value: "#HEX", category: "Category" }
  ],
  spacing: [
    { name: "space-X", value: "Xpx", multiplier: "Xx" }
  ],
  typography: [
    { name: "font-name", value: "size / line-height", font: "Font Name", preview: "Preview Text" }
  ]
};
```

## Features

- 🔍 Search tokens by name or value
- 🎨 Visual previews (color swatches, spacing bars, typography samples)
- 📋 One-click copy to clipboard
- 🏷️ Category organization
- 💅 Matches Figma's design language
