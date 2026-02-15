# Cursor Quick Reference Card

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Open Agent Chat | `Cmd/Ctrl + L` |
| Inline Chat | `Cmd/Ctrl + K` |
| Toggle File Explorer | `Cmd/Ctrl + B` |
| Toggle Command Palette | `Cmd/Ctrl + Shift + P` |

## Key Concepts

### Plan Mode
- Switch to "Plan" before building
- AI creates structured plan first
- Review, then execute

### Agent Chat (`Cmd/Ctrl + L`)
- Main conversation with AI
- Describe what you want to build
- AI generates code and makes changes

### Context Window
- AI's "working memory"
- Watch the percentage gauge
- Keep under 80% for best results
- Start new chat for new features

### Rules Files
- Persistent preferences
- Applied to every conversation
- Use for consistent styling/patterns

### Ask Mode
- Switch to "Ask" for explanations
- AI acts as coding tutor
- Learn while building

## Common Prompts

### Starting a Project
```
"Create a [type of app] using [technology]"
"Build a [feature] for [purpose]"
```

### Fixing Issues
```
"When I [action], [problem happens]. Fix this."
"Make [element] [desired behavior]"
```

### Learning
```
"Explain how [feature] works like I'm a beginner"
"What does [code concept] do?"
```

### Iterating
```
"Make [element] [change]"
"Add [feature] to [component]"
"Change [style] to [new style]"
```

## Best Practices

1. **Plan first** - Use Plan mode for complex projects
2. **Iterate small** - Make one change at a time
3. **New chat = fresh start** - Start new chat for new features
4. **Ask questions** - Use AI to learn, not just generate
5. **Use rules** - Encode preferences for consistency
6. **Test often** - Preview and test after each change

## Figma Plugin Development

### Loading a Plugin
1. Open Figma Desktop
2. `Plugins > Development > Import plugin from manifest...`
3. Select `manifest.json`
4. Plugin appears in `Plugins > Development`

### File Structure
```
plugin-name/
├── manifest.json  (plugin config)
├── ui.html         (interface)
└── code.js         (Figma API)
```

### Reloading After Changes
- Go to `Plugins > Development > [Your Plugin]`
- Plugin reloads automatically

## Troubleshooting

**AI not responding?**
- Check internet connection
- Verify you're signed in
- Try starting new chat

**Code has errors?**
- Ask AI to fix: "This code has errors. Fix them."
- Check browser console (F12)
- Review error messages

**Plugin won't load?**
- Ensure Figma Desktop (not web)
- Check manifest.json syntax
- Verify file paths are correct

## Resources

- Cursor Docs: [cursor.com/docs](https://cursor.com/docs)
- Figma Plugin API: [figma.com/plugin-docs](https://www.figma.com/plugin-docs/)
- Cursor Community: [cursor.com/community](https://cursor.com/community)

---

**Remember:** Your imagination is the only limitation! 🚀
