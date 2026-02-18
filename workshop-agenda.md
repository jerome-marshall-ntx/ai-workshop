# Cursor Workshop Part 2: Hands-On Session (60 mins)

## Workshop Flow

```
Section 1: Setting the Stage (5 mins)
    ↓
Section 2: Introduction to Cursor (10 mins)
    ↓
Section 3: Live Demo - Space Invaders (15 mins)
    ↓
Section 4: Hands-On Build - Design Token Finder Plugin (25 mins)
    ↓
Section 5: Wrap-Up & Q&A (5 mins)
```

---

## Section 1: Setting the Stage (5 mins)

_Before we touch any tools, let's understand the landscape._

### How Software Gets Built (2 mins)

**The Traditional Journey (Simplified)**

```
IDEA → DESIGN → BUILD → TEST → SHIP → MAINTAIN
```

| Phase        | What Happens                     | Who's Involved        |
| ------------ | -------------------------------- | --------------------- |
| **Idea**     | Define the problem, gather needs | Product, Stakeholders |
| **Design**   | Create mockups, user flows       | Designers, UX         |
| **Build**    | Write the actual code            | Engineers             |
| **Test**     | Find and fix bugs                | QA, Engineers         |
| **Ship**     | Release to users                 | DevOps, Engineers     |
| **Maintain** | Monitor, fix, improve            | Everyone              |

**Key insight:** There's often a gap between Design and Build. Mockups show _what it looks like_, but not _how it behaves_. This creates back-and-forth.

---

### The Personal Software Era (2 mins)

_Source: [Lee Robinson - Personal Software](https://leerob.com/personal-software)_

**The Irony of "Personal" Computing**

Personal computers became mainstream in the 90s. But the software wasn't very _personal_ at all. Operating systems and office suites were built for everyone — one-size-fits-all.

Want to do one small thing? You had to wade through hundreds of menus and features you didn't need.

**AI Has Changed Everything**

| Before                       | Now                       |
| ---------------------------- | ------------------------- |
| Learn a programming language | Describe what you want    |
| Deal with complex tools      | AI handles the complexity |
| Figure out deployment        | Just build and use it     |
| Software adapts to no one    | Software adapts to YOU    |

**The "Home-Cooked Software" Mindset**

> "Creating software now feels like cooking. If you want a meal for yourself, you can do that without needing a professional chef. The results might not compare to a top restaurant, but that's not the point. Your home-cooked software is exactly what you need, without extra fuss or cost."

**Example:** Lee wanted to track his baby's sleep and eating patterns. He didn't need user profiles, badges, or subscription tiers. So he built his own app — exactly what he needed, nothing more.

**This is where we're headed:**

- You won't search "best Chrome extension for X"
- You'll just _build_ what you need in 5 minutes
- Designers, marketers, product managers — anyone can create software

**Today:** We learn to cook. 🍳

---

### The Building Blocks of the Web (1 min)

Every website and web app is built with just **three technologies**:

| Technology     | What It Does | Think of it as...     |
| -------------- | ------------ | --------------------- |
| **HTML**       | Structure    | The skeleton          |
| **CSS**        | Styling      | The skin and clothes  |
| **JavaScript** | Behavior     | The brain and muscles |

**Example:**

- HTML: "There's a button here"
- CSS: "It's blue, rounded, has padding"
- JavaScript: "When clicked, submit the form"

**Good news:** You don't need to learn these. Cursor handles them for you. You just describe what you want in plain English.

---

### What We're Doing Today (1 min)

**We are NOT:**

- ❌ Becoming software engineers
- ❌ Building production-grade systems
- ❌ Learning databases, servers, or deployment

**We ARE:**

- ✅ Learning to **cook our own software**
- ✅ Building a fun game to understand the workflow
- ✅ Creating a **personal tool** that solves a real problem for you

**Think of it as:** Learning to cook at home — not becoming a professional chef.

**By the end of this session:** You'll have built a working Figma plugin that you can use tomorrow. And more importantly, you'll know how to build the next thing you need.

---

## Section 2: Introduction to Cursor (10 mins)

### The Story of Cursor (3 mins)

- Born from VS Code - forked and rebuilt with AI-first philosophy
- What is an IDE? A specialized environment where developers write, test, and debug code
- The paradigm shift: From "learning to code" to "learning to instruct AI"
- **Key message:** Personal software era - your imagination is the only limitation

### Cursor Interface Tour (7 mins)

- Editor Panel, File Explorer, Agent Chat, Inline Chat
- Plan Mode vs Agent Mode
- Context Window (AI's working memory)
- Keyboard shortcuts

**See:** `slides/section-1-cursor-intro.md` for detailed slide content

---

## Section 3: Live Demo - Space Invaders (15 mins)

_Watch Cursor in action before we build together._

Live demonstration following the video workflow:

1. **New Project** (2 mins) - Create empty folder, open in Cursor
2. **Plan Mode** (3 mins) - Describe the game in plain English, review the plan
3. **Preview and Iterate** (5 mins) - Test game, fix issues with natural language
4. **Git Checkpoint** (1 min) - Save progress (quick mention)
5. **Ask Mode** (2 mins) - Use AI to explain how the code works
6. **Rules File** (2 mins) - Encode preferences for consistency

**See:** `demo-script/space-invaders-demo.md` for detailed script

### Key Takeaways:

- **Plan first, then build** - Think before coding
- **Iterate in small steps** - Build → Test → Improve
- **New chat = fresh memory** - Be intentional about context
- **Ask AI to explain** - Learn while building, don't just accept blindly

---

## Section 4: Hands-On Build - Design Token Finder Plugin (25 mins)

### Project Overview

Build a Figma plugin that helps designers quickly search and copy design system tokens (colors, spacing, typography).

### Build Timeline:

#### Phase 1: Plugin Setup (5 mins)

1. Create `manifest.json` (plugin configuration)
2. Create basic folder structure
3. Load plugin in Figma Desktop
4. Verify plugin appears in menu

**Files to create:**

- `manifest.json` - Plugin configuration
- `ui.html` - The interface (HTML/CSS/JS)
- `code.js` - Figma API communication

**See:** `design-token-finder/` folder for starter template

#### Phase 2: Build the UI (15 mins)

**Prompt for Cursor:**

> "Create a Figma plugin UI (ui.html) for a Design Token Finder.
> Include: search bar, tabs for Colors/Spacing/Typography,
> token cards with name, value, preview, and copy button.
> Use Figma's plugin UI styling. Make it look polished."

**What AI will generate:**

- HTML structure with tabs
- CSS matching Figma's design language
- JavaScript for search, filtering, copy functionality
- Sample token data structure

**Live coding with attendees:**

- Walk through the generated code
- Explain the structure (HTML/CSS/JS)
- Show how search and filtering works
- Test copy functionality

#### Phase 3: Add Real Tokens (5 mins)

Replace sample data with actual design system tokens:

- Pull colors from your documentation
- Add spacing scale values
- Include typography tokens

**Show how easy it is to expand:**

- Add more tokens later
- Add new categories
- Customize styling

**See:** `design-token-finder/ui.html` for complete implementation

---

## Section 5: Wrap-Up and Q&A (5 mins)

### Recap

- Cursor turns natural language into working code
- Start with a plan, iterate in small steps
- You just built a real Figma plugin!

### The "Personal Software" Mindset

- You now have an AI engineer by your side
- Identify friction in your workflow
- Build tools that solve YOUR specific problems
- Your design system + AI = custom tooling

### Challenge for Attendees

> "This week, identify ONE repetitive task in your workflow.
> Try building a small tool with Cursor to automate it."

### Resources

- Cursor docs: cursor.com/docs
- Figma Plugin API: figma.com/plugin-docs
- Your plugin code: Take it home and expand it!

---

## Prerequisites Checklist

**Required:**

- [ ] Cursor IDE installed (cursor.com/download)
- [ ] Figma Desktop app (required for plugin development)
- [ ] Figma account (free tier works)

**Nice to have:**

- [ ] Design system documentation URL open
- [ ] A few token values ready to input

**Not required:**

- Git knowledge
- Node.js/npm
- Prior coding experience

---

## Facilitator Prep Checklist

### Before the Workshop:

1. **Test plugin loading**
   - Load `design-token-finder/manifest.json` in Figma Desktop
   - Verify plugin appears and runs
   - Test copy functionality

2. **Gather real tokens**
   - Collect 10-15 tokens from your design system
   - Have them ready to paste during Phase 3
   - Include colors, spacing, typography examples

3. **Practice Space Invaders demo**
   - Run through the demo script once
   - Time yourself to ensure 20 mins
   - Prepare for common questions

4. **Prepare backup**
   - Have `backup-standalone/index.html` ready
   - If plugin loading fails, use standalone version
   - Same functionality, just opens in browser

### Common Issues to Anticipate:

- **Figma Desktop required** - Web version doesn't support plugin development
- **Plugin reload** - Must reload plugin after code changes
- **File paths** - Ensure manifest.json path is correct when loading
- **Copy permissions** - Browser may require user interaction for clipboard

### Backup Plan:

If Figma plugin setup proves difficult:

1. Switch to standalone HTML version (`backup-standalone/index.html`)
2. Open in browser instead
3. Same code, same functionality
4. Can convert to plugin later

---

## Workshop Materials

All materials are in this repository:

- `design-token-finder/` - Complete Figma plugin code
- `backup-standalone/` - Standalone HTML version (backup)
- `slides/section-1-cursor-intro.md` - Presentation slides
- `demo-script/space-invaders-demo.md` - Demo script
- `workshop-agenda.md` - This file

---

## Success Metrics

After this workshop, attendees should be able to:

- ✅ Navigate Cursor's interface confidently
- ✅ Use Plan mode to structure projects
- ✅ Iterate on code using natural language
- ✅ Build a simple Figma plugin
- ✅ Understand how to expand their plugin
- ✅ Feel empowered to build personal tools

---

Remember: Your imagination is the only limitation!
