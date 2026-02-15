# Cursor Workshop Part 2: Hands-On Session

A 60-minute hands-on workshop introducing designers to Cursor IDE and building a practical Figma plugin.

## Workshop Structure

- **Section 1:** Introduction to Cursor (10 mins)
- **Section 2:** Space Invaders Demo (20 mins)
- **Section 3:** Build Design Token Finder Plugin (25 mins)
- **Section 4:** Wrap-Up & Q&A (5 mins)

## Quick Start

### For Facilitators

1. **Review the agenda:** `workshop-agenda.md`
2. **Practice the demo:** Follow `demo-script/space-invaders-demo.md`
3. **Prepare tokens:** Gather real tokens from your design system (see `sample-tokens.json`)
4. **Test plugin:** Load `design-token-finder/manifest.json` in Figma Desktop

### For Attendees

**Prerequisites:**
- Cursor IDE installed ([cursor.com/download](https://cursor.com/download))
- Figma Desktop app installed
- Figma account (free tier works)

**No coding experience required!**

## Workshop Materials

### Core Files
- `workshop-agenda.md` - Complete workshop agenda and timing
- `slides/section-1-cursor-intro.md` - Presentation slides for Section 1
- `demo-script/space-invaders-demo.md` - Detailed demo script

### Plugin Code
- `design-token-finder/` - Complete Figma plugin
  - `manifest.json` - Plugin configuration
  - `ui.html` - Plugin interface (HTML/CSS/JS)
  - `code.js` - Figma API communication
  - `README.md` - Plugin setup instructions

### Backup
- `backup-standalone/index.html` - Standalone HTML version (if plugin setup fails)

### Reference
- `sample-tokens.json` - Sample token data structure

## Loading the Plugin in Figma

1. Open Figma Desktop
2. Go to `Plugins > Development > Import plugin from manifest...`
3. Navigate to `design-token-finder/` folder
4. Select `manifest.json`
5. Plugin will appear in `Plugins > Development > Design Token Finder`

## Customizing Tokens

Edit the `tokens` object in `design-token-finder/ui.html` to add your actual design system tokens:

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

## Workshop Goals

After this workshop, attendees will:
- ✅ Understand Cursor's interface and key features
- ✅ Know how to use Plan mode and Agent chat
- ✅ Be able to iterate on code using natural language
- ✅ Have built a working Figma plugin
- ✅ Feel empowered to build personal tools

## Key Concepts

### Plan Mode
Think before building. Describe what you want, review the plan, then execute.

### Iteration
Build → Test → Improve. Use natural language to describe issues and fixes.

### Context Management
- New chat = fresh memory
- Keep context window under 80%
- Use rules files for persistent preferences

### Learning
Don't just accept code - ask AI to explain how it works. Use Ask mode as your tutor.

## Resources

- [Cursor Documentation](https://cursor.com/docs)
- [Figma Plugin API](https://www.figma.com/plugin-docs/)
- [Figma Plugin Examples](https://www.figma.com/community/plugins)

## Support

If you encounter issues:
1. Check `workshop-agenda.md` for common issues
2. Use `backup-standalone/index.html` as fallback
3. Ensure Figma Desktop (not web) is being used

## License

This workshop material is provided for educational purposes.
