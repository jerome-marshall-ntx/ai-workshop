# Session 2 – Advanced Cursor for Engineers

## Flow & Structure (1.5 hrs)

> **Central theme**: Context is everything.
> Every feature we cover ties back to one idea — how to give the AI the right information at the right time, especially in large, complex codebases.

> **Approach**: Framework-agnostic. We'll use a demo project to show concepts, but everything applies whether you work in React, Go, Python, or anything else. The focus is on Cursor's features, not the tech stack.

---

## Part 1 — The Problem: Why AI Falls Apart on Real Codebases (10 min)

**Goal**: Set the stage with the problem everyone has experienced — AI is incredible on new projects but struggles on real-world, large codebases.

- The greenfield illusion: magic on new projects, falls apart on brownfield
- You ship more code, but a lot of it is reworking the slop from last week
- It's not a model problem — it's a **context problem**
- The AI isn't dumber on big projects. It just knows less.

---

## Part 2 — Why Context Is Everything (15 min)

**Goal**: Frame the entire session. Explain *why* advanced Cursor usage is really about context management.

- LLMs are stateless — every response is only as good as what's in the context window
- The **"Smart Zone vs Dumb Zone"** concept — as context fills up (~40%), quality starts dropping
- What fills up your context: file reads, search results, tool outputs, conversation history
- The too-many-MCPs problem: all your work happens in the dumb zone
- Optimize for: correctness, completeness, size, and **trajectory**
- Trajectory matters — if the conversation is going badly, starting fresh is better than correcting
- Context problems ranked: incorrect info (worst) → missing info → too much noise

**Show**: Smart zone diagram. This is the anchor for the whole session.

---

## Part 3 — Staying in the Smart Zone: Context Management Strategies (15 min)

**Goal**: Teach the practical techniques for managing context — from naive to advanced.

- **Strategy 1: The Naive Way** — work until you run out, resteer when it goes wrong
- **"You're absolutely right"** — that's the AI telling you it's time to start over
- **Strategy 2: Start Over** — fresh context with a targeted prompt beats fighting a confused conversation
- **Strategy 3: Intentional Compaction** — compress progress to a file before starting fresh. The new agent gets straight to work.
- What makes a good compaction: exact files, line numbers, what works, what's broken
- **Strategy 4: Subagents** — not for role-playing, for controlling context. Heavy reading in a subagent, clean parent context.
- `/summarize` — compress history without starting over completely

---

## Part 4 — The Research → Plan → Implement Workflow (15 min)

**Goal**: Teach the most effective workflow for complex tasks — frequent intentional compaction turned into a complete system.

- **Research**: understand the system, find files, stay objective. Compact before moving on.
- **Plan**: outline exact steps with file names, line numbers, and code snippets. A well-written plan should be so clear that even a simple model could follow it.
- **Implement**: fresh conversation, follow the plan, stay under 40%.
- **Don't outsource the thinking** — AI amplifies your thinking, it doesn't replace it. Read the plans.
- The Hierarchy of Leverage: mistakes cascade — 1 bad line of research = 1,000+ bad lines of code
- When to use Plan Mode vs Agent Mode

**Demo**: Plan Mode on the demo project. Show the full cycle.

---

## Part 5 — Teaching Cursor About Your Project (15 min)

**Goal**: Give Cursor persistent knowledge — the "Core Infrastructure" layer from the Hierarchy of Leverage.

- **Rules** (Project, User, Team, AGENTS.md) — always-on guidance
- **Progressive Disclosure** — general rules at root, specific in subdirectories. Only pull in what's relevant.
- **Custom Commands** — reusable workflows via `/` in chat
- **Skills** — packaged knowledge + scripts, discovered automatically

**Demo**: Show rules folder, show behavior with/without rules, run a command.

---

## Part 6 — Dynamic Context & Extending Cursor (10 min)

**Goal**: Cover real-time context control and remaining powerful features.

- **@ Mentions** — `@Code` over `@Files` for precision, `@Past Chats` for continuity
- **MCP Servers** — external integrations (remember: only enable what you need)
- **Checkpoints & Git Worktrees** — undo AI changes, run parallel agents
- **Debug Mode** — runtime evidence, not guesses
- **TDD** — tests as verifiable goals for agents
- **Browser** — visual debugging, design-to-code

---

## Part 7 — The Bigger Picture & What's Next (10 min)

**Goal**: Zoom out. Show the human side — the growing rift, why it exists, and why context engineering is the bridge.

- Key takeaways (8 points)
- Plan with a smart model, build with a fast one
- The growing rift: mid-level adopts fast (fills gaps, produces slop), senior resists (already knows patterns, cleans up slop)
- It's not AI's fault. It's a skills gap. Pick one tool and get some reps.
- The bridge: context engineering closes the gap
- What's next: tools will be commoditized, team/workflow transformation is the hard part

---

## Session Timeline (90 min)

| Time | Section | Duration |
|---|---|---|
| 0:00 | Part 1 — The Problem: Why AI Falls Apart on Real Codebases | 10 min |
| 0:10 | Part 2 — Why Context Is Everything | 15 min |
| 0:25 | Part 3 — Staying in the Smart Zone: Context Management Strategies | 15 min |
| 0:40 | Part 4 — The Research → Plan → Implement Workflow | 15 min |
| 0:55 | Part 5 — Teaching Cursor About Your Project (Rules, Commands, Skills) | 15 min |
| 1:10 | Part 6 — Dynamic Context & Extending Cursor | 10 min |
| 1:20 | Part 7 — The Bigger Picture & What's Next | 10 min |

---

## Notes for Presenter

- **The flow follows a narrative arc**: Problem → Why → Strategies → Workflow → Setup → Tools → Big Picture. Each part builds on the last.
- **The "smart zone" diagram is the anchor.** Keep coming back to it — "this feature helps you stay in the smart zone because..."
- **Don't live-code a full app.** Use the demo project as a playground to show individual concepts.
- **Show, don't tell.** For each concept, either demo it live or show a screenshot.
- **Acknowledge the diversity.** Frontend, backend, QA — the principles are the same regardless of stack.
- **Leave room for questions.** The audience cares about *their* codebases.
