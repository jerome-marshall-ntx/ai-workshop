# Prerequisites — AI Agent Skills Workshop

## For attendees

### Step 1: Install an agent with Skill support

Pick ONE (latest version at workshop time — the test in Step 3 is the real gate, not a version number):

1. **Cursor** — [cursor.com/download](https://cursor.com/download), Mac/Windows/Linux, sign in.
2. **Claude Code** — [muse.ai](https://muse.ai), install per docs, sign in.

**Verification:** Agent opens and responds to a plain prompt (e.g. "Say hello.").

---

### Step 2: Confirm Skill loading works

1. Create a folder for the workshop skill:
   - Cursor: `<your-project>/.cursor/skills/my-first-skill/` (project) or `~/.cursor/skills/` (personal)
   - Claude Code: `~/.claude/skills/my-first-skill/`
2. Copy `exercise/my-first-skill-DRAFT-SKILL.md` into it as `SKILL.md`.
3. Ask your agent something matching its description (e.g. "Review this empty-state copy: …").

**Verification:** The agent uses the Skill (it should follow the BEFORE → AFTER + reason format) instead of answering generically.

---

### Step 3: Test your setup (day before)

- [ ] Agent installed, signed in, responds.
- [ ] Skill test above produces BEFORE → AFTER output.
- [ ] Wifi works (needed only for agent connection, nothing else).
- [ ] Optional: one real sample from your work (a message, a checklist, notes) ready to paste.

---

## Troubleshooting

### Agent doesn't pick up the Skill
- Check the folder path and that the file is named exactly `SKILL.md`.
- Check the `description` line says when to use it — that sentence is the trigger.
- Start a new chat/session (fresh context) and retry.

### Agent is slow or errors
- Check internet connection and sign-in state.
- Retry with a shorter sample.

### Nothing works on the day
- Don't debug — pair with a neighbor, or use the paper mode in `exercise/DRAFT-exercise.md`. You'll test after the workshop.

---

## What you DON'T need

❌ Figma (this workshop is text-first)
❌ Any MCP server installed (the MCP section is conceptual; the demo and exercise are pure SKILL.md)
❌ Git, Node.js, terminal knowledge
❌ Any coding experience
❌ API keys or admin permissions

---

## Day of workshop

**Bring:**
- Laptop with agent + Skill test passing
- One real sample from your work (optional but recommended)

**We'll provide:**
- 1-page style guide for the live demo
- Before/after screenshot fallback if the live demo misbehaves
- Skeleton + prompt sheet (`exercise/`)

---

## Facilitator dry-check (against sibling conventions)

- Mirrors `../setup-instructions.md`: attendee steps with verification lines, troubleshooting, DON'T-need list, day-of section.
- Deviations (deliberate): no Figma step, no MCP server install — text-only stack per tickets 02/06.
- Still open (fog, not this ticket): pre-workshop email text, slide copy, facilitator script.
