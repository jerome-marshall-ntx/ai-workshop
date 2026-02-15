// Figma Plugin Code
// This file handles communication between the plugin UI and Figma

figma.showUI(__html__, { width: 400, height: 600 });

// Handle messages from the UI
figma.ui.onmessage = (msg) => {
  if (msg.type === 'copy-token') {
    // Copy token value to clipboard
    figma.notify(`Copied ${msg.tokenName}: ${msg.tokenValue}`);
  }
  
  if (msg.type === 'close-plugin') {
    figma.closePlugin();
  }
};
