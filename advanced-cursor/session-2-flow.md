# Session 2 – Advanced Cursor for Engineers

## Flow & Structure (1.5 hrs)

> **Central theme**: Context is everything.
> Every feature we cover ties back to one idea — how to give the AI the right information at the right time, especially in large, complex codebases.

> **Approach**: Framework-agnostic. We'll use a demo project to show concepts, but everything applies whether you work in React, Go, Python, or anything else. The focus is on Cursor's features, not the tech stack.

---

## Part 1 — Quick Cursor Walkthrough (10 min)

**Goal**: Get everyone on the same page before going deep.

- Quick tour of the Cursor interface
- The four Agent modes: **Agent**, **Ask**, **Plan**, **Debug** — what each does and when to use it
- The key shortcut trio: `Cmd+I` (Agent), `Cmd+L` (Ask), `Shift+Tab` (switch modes)
- Models and `Cmd+/` to switch — brief mention of Auto mode

**Demo**: Open the demo project, show how switching between modes changes what the AI can do (Ask = read-only, Agent = full edit access).

---

## Part 2 — Why Context Is Everything (10 min)

**Goal**: Frame the entire session. Explain *why* advanced Cursor usage is really about context management.

- LLMs are stateless — every response is only as good as what's in the context window
- The **"Smart Zone vs Dumb Zone"** concept — as context fills up (~40%), quality starts dropping
- What fills up your context window: file reads, search results, tool outputs, conversation history
- The consequence: on small tasks it feels fine, but on larger codebases or complex features, things fall apart — and that's a context problem, not a model problem

**Show**: A visual/diagram of the context window filling up, smart zone vs dumb zone (from workshop slides). This is the "aha moment" that reframes how people think about using AI.

---

## Part 3 — Static Context: Teaching Cursor About Your Project (20 min)

**Goal**: Show how to give Cursor persistent knowledge about your codebase *before* you even start a conversation.

### 3a — Rules (Project, User, Team)

- **Project Rules** (`.cursor/rules/`) — version-controlled, scoped to the repo. This is where you put coding standards, architecture decisions, framework preferences.
- **User Rules** — personal preferences that follow you across all projects
- **Team Rules** — org-wide standards managed from the dashboard (available on Team/Enterprise plans)
- **AGENTS.md** — a simpler markdown alternative to `.cursor/rules`

**Demo**: Show a `.cursor/rules/` folder in the demo project with a few rules. Show how the agent's behavior changes with and without them.

### 3b — Progressive Disclosure Pattern

- The key insight: don't dump everything into one giant rules file
- Instead, put a general rules file at the root, and more specific ones in subdirectories
- The agent pulls in only what's relevant to where it's working — this keeps context small and focused

**Demo**: Show a rules structure like:
```
.cursor/
  rules/
    general.mdc          ← always loaded
    frontend.mdc         ← only when working in frontend/
    api.mdc              ← only when working in api/
    testing.mdc          ← only when writing tests
```

### 3c — Custom Commands

- Reusable workflows defined as markdown files in `.cursor/commands/`
- Great for standardizing team processes: code review checklists, PR creation, test generation
- Type `/` in chat to trigger them

**Demo**: Show 2–3 example commands (e.g., `/review-code`, `/write-tests`). Run one to show how it works.

### 3d — Skills & Subagents (overview)

- **Skills** = packaged knowledge + scripts that agents can use on demand
- **Subagents** = specialized agents that run in their *own* context window — this is a context management tool (more on this in Part 4)

**Demo**: Show how to invoke a skill with `/` in chat. Briefly show that subagents appear as separate tasks.

---

## Part 4 — Dynamic Context: Working Smart in Large Codebases (25 min)

**Goal**: This is the core of the session. Show how to manage context *during* a conversation — the techniques that make Cursor actually work for complex tasks.

### 4a — Choosing What Goes Into Context

- **@Files & Folders** — reference specific files or directories
- **@Code** — reference specific code sections (more precise than full files)
- **@Docs** — pull in documentation
- **@Branch** — give the agent context about your current work
- **@Past Chats** — reference earlier conversations without copy-pasting

**Demo**: Show how referencing a specific function with `@Code` vs an entire file makes a big difference in response quality.

### 4b — When to Start a New Conversation

- **Start fresh when**: switching tasks, agent is confused, finished a logical unit of work
- **Continue when**: iterating on the same feature, debugging something it just built, agent needs earlier context
- Use `@Past Chats` to carry forward what matters without dragging in the full history

**Show**: Example of a conversation going off track, and how starting fresh with a targeted prompt gets better results.

### 4c — Plan Mode as Context Compression

- Plan Mode researches your codebase, asks clarifying questions, and creates a detailed plan *before* writing code
- The plan itself is a form of **compressed context** — it captures intent, relevant files, and approach in a small, reviewable document
- `Shift+Tab` to switch to Plan Mode

**The Research → Plan → Implement pattern**:
1. **Research** — agent explores the codebase, finds relevant files and code flow
2. **Plan** — compresses findings into a step-by-step plan with file names and code snippets
3. **Implement** — follows the plan in a fresh, focused context window

**Demo**: Use Plan Mode on the demo project. Show how the plan captures the key files and approach, and how you can review/edit it before building.

### 4d — Subagents for Context Isolation

- The key insight: **subagents are not for role-playing (frontend agent, backend agent). They are for controlling context.**
- A subagent can go explore a large part of the codebase, read dozens of files, and return a short summary — keeping the parent agent's context clean
- Foreground (blocks until done) vs Background (works independently)

**Demo**: Show an agent spawning a subagent to research how a feature works in the codebase. The subagent reads many files but only a concise answer comes back to the main agent.

### 4e — The `/summarize` Command

- When a conversation gets long, use `/summarize` to compress the history
- Keeps important context, drops the noise — lets you keep working without starting over

**Demo**: Show a long-ish conversation, run `/summarize`, show how the context gets compressed.

---

## Part 5 — Extending Cursor & Practical Workflows (15 min)

**Goal**: Cover the remaining powerful features, tied back to the context theme.

### 5a — MCP Servers

- MCP (Model Context Protocol) connects Cursor to external tools and data — databases, APIs, documentation, design tools
- Instead of explaining your project repeatedly, integrate directly
- Runs via stdio (local) or HTTP/SSE (remote)
- Example: connecting to a Figma MCP, a database, or your internal documentation

**Demo**: Show an MCP server connected in the demo project. Show how the agent can pull external data into its context without you copy-pasting.

### 5b — Checkpoints & Git Worktrees

- **Checkpoints** — automatic snapshots of the agent's changes. Use "Restore Checkpoint" to undo. Think of it as Cmd+Z for AI changes.
- **Git Worktrees** — run multiple agents in parallel on different tasks, each in their own worktree. No branch-switching headaches.

**Demo**: Make a change with the agent, restore a checkpoint. Briefly show how worktrees let you run parallel agents.

### 5c — Debug Mode

- For tricky bugs: agent generates hypotheses, adds log statements, asks you to reproduce, analyzes logs, then makes a targeted fix
- Uses *runtime evidence* instead of guessing

**Show**: Briefly walk through the Debug Mode flow (screenshot or quick demo).

### 5d — Test-Driven Development

- Write tests first (or describe what you want tested), let the agent implement until tests pass
- The agent runs tests, reads failures, and iterates automatically
- Tests act as a *verifiable goal* — one of the strongest ways to guide agent behavior

**Demo**: Show a quick TDD cycle — describe a test, agent implements, tests pass.

---

## Part 6 — Best Practices & Wrap-up (10 min)

**Goal**: Leave people with actionable takeaways they can use on Monday.

### Key Takeaways

1. **Plan before you build** — especially for anything non-trivial. Use Plan Mode.
2. **Don't outsource the thinking** — AI amplifies your thinking, it doesn't replace it. Review plans and research.
3. **Keep context small and focused** — use rules, subagents, @mentions, and fresh conversations to stay in the "smart zone"
4. **Use progressive disclosure** — layer your rules from general to specific, don't dump everything at once
5. **Plan with a smart model, build with a fast one** — use `Cmd+/` to switch. Save credits and time.
6. **Share context with your team** — project rules, commands, and skills are all version-controlled. Put them in your repo.
7. **Start fresh often** — new task = new conversation. Use `@Past Chats` to carry forward what matters.

### Must-Know Shortcuts

| Shortcut | What it does |
|---|---|
| `Cmd+I` | Open Agent |
| `Cmd+L` | Open Ask mode |
| `Shift+Tab` | Switch agent modes |
| `Cmd+/` | Switch models |
| `Enter` (while agent is working) | Queue a message |
| `Cmd+Enter` (while agent is working) | Send immediately |

### Resources

- [Cursor Docs – Agent Best Practices](https://cursor.com/blog/agent-best-practices)
- [Cursor Docs – Rules](https://cursor.com/docs/context/rules)
- [Cursor Docs – MCP](https://cursor.com/docs/context/mcp)
- [How I Use Cursor + Best Tips](https://www.builder.io/blog/cursor-tips)

---

## Session Timeline (90 min)

| Time | Section | Duration |
|---|---|---|
| 0:00 | Part 1 — Quick Cursor Walkthrough | 10 min |
| 0:10 | Part 2 — Why Context Is Everything | 10 min |
| 0:20 | Part 3 — Static Context (Rules, Commands, Skills) | 20 min |
| 0:40 | Part 4 — Dynamic Context (@ mentions, Plan Mode, Subagents) | 25 min |
| 1:05 | Part 5 — Extending Cursor (MCP, Checkpoints, Debug, TDD) | 15 min |
| 1:20 | Part 6 — Best Practices & Wrap-up | 10 min |

---

## Notes for Presenter

- **Don't live-code a full app.** Use the demo project as a playground to show individual concepts. Switch between topics fluidly.
- **Show, don't tell.** For each concept, either demo it live or show a screenshot. The audience remembers what they see.
- **The "smart zone" diagram is the anchor.** Keep coming back to it — "this feature helps you stay in the smart zone because..."
- **Acknowledge the diversity.** Frontend, backend, QA — the context management principles are the same regardless of stack.
- **Leave room for questions.** The audience cares about *their* codebases. Be ready for "how would I do this in my project?" questions.
