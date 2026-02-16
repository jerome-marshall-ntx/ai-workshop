# Advanced Cursor: Context Engineering for Engineers

---

# Cursor: The AI Code Editor

Cursor is a code editor built around AI

Four modes, each designed for different tasks:

- **Agent** — Complex features, refactoring, multi-file edits. Full autonomy.
- **Ask** — Learning, research, questions. Read-only, no changes.
- **Plan** — Complex features requiring planning. Creates detailed plans before execution.
- **Debug** — Tricky bugs and regressions. Uses runtime evidence, not guesses.

---

# Agent Tools

---

# Key Shortcuts

| Shortcut | Action |
|---|---|
| Cmd + I | Open Agent |
| Cmd + L | Open Ask mode |
| Shift + Tab | Switch agent modes |
| Cmd + / | Switch models |
| Enter (while working) | Queue a message |
| Cmd + Enter (while working) | Send immediately |

---

# Models & Pricing

Cursor supports all major AI models — Claude, GPT, Gemini, and more.

- **Auto mode** — Cursor picks the best model and switches automatically if performance degrades
- **Max Mode** — extends context window beyond 200k tokens (slower, more expensive)
- Switch models mid-conversation

In our Org: Everyone gets Pro plan with $20 of agent usage + $10 bonus credits.

---

# The Problem

---

## The Greenfield Illusion

AI coding tools are incredible on greenfield projects — it feels like magic.

But try using AI on a 500k-line codebase with 10 years of history, custom patterns, and undocumented conventions — and it falls apart.

It uses the wrong patterns. It ignores your conventions. It doesn't know about the helper that already exists. It writes code that technically works but doesn't belong.

You ship a lot more code, but a lot of it is reworking the slop from last week.

*Source: GitClear 2025; Uplevel 2024*

---

## The bigger and more complex the codebase, the worse AI performs

---

## It's Not a Model Problem. It's a Context Problem.

On greenfield: the AI has all the context it needs. There's barely any codebase to know about.

On brownfield: the AI is missing most of the context — your patterns, your architecture, your unwritten rules, your team conventions.

The AI isn't dumber on big projects. It just knows less.

---

## Why This Matters

Most of us work in brownfield codebases. That's the reality.

If AI only works on small new projects, it's a toy, not a tool.

The engineers who figure out how to make AI work in real codebases will have a massive advantage.

---

## Goals

- AI works well in Brownfield codebases
- Solved Complex Problems
- No Slop
- Mental Alignment

---

# The Naive Way

Most people use AI this way: start a conversation, keep going until it breaks.

When the agent goes wrong, you try to redirect it mid-conversation: "NO, do it the XYZ way."

The problem: the context is now full of wrong turns, failed attempts, and noise.

Resteering wastes context — the AI has to hold both the wrong approach AND your correction.

---

# Slightly Smarter

## Start over vs Re-steer

Instead of fighting a confused conversation, start fresh with a targeted prompt.

"Same task, but this time use XYZ approach — and don't go down that other path."

Starting fresh with a targeted prompt often gets better results than resteering.

Use @Past Chats to carry forward what matters without dragging in the full history.

*Source: Liu et al. "Lost in the Middle" 2023; correction-in-context research*

---

# How do you know its time to start over?

---

# "You're absolutely right."

That's what AI tells you when it knows it's screwing up.

It's agreeing to get you off its back.

When you hear this, it's time to start over.

*Source: SycEval 2025 — sycophancy occurs 58% of cases; Wei et al. EMNLP 2025*

---

# Smarter: Intentional Compaction

Whether you're on track or off track, compress your context into a file before starting over.

1. Tell the AI: "Summarize everything we've done to progress.md"
2. Include: the approach, steps completed, current problem, relevant files
3. Start a new conversation: "Read progress.md and continue from where we left off"

The new agent gets straight to work instead of having to redo all the searching, file reading, and codebase understanding.

---

# A Good Compaction

A good compaction is structured and specific — like a well-written bug report:

- **What we're working on** — exactly what the task is
- **The exact files and line numbers** that matter to the problem
- **What works** — known-good paths with specific file names and line numbers
- **What's broken** — the specific failure with the exact code path

Precise enough that someone — or an AI — could pick it up and immediately start working.

---

# The /summarize Command

When a conversation gets long, use /summarize to compress the history.

Keeps important context, drops the noise. Lets you keep working without starting over completely.

---

# Why Context Is Everything

---

## LLMs Are Stateless

LLMs are like pure functions:

**What goes in → What comes out**

Put good tokens in and you get better tokens out.

They have no memory between conversations. Every response is only as good as what's in the context window.

Every turn of the loop, the AI is picking the next action — and the only thing that influences what comes out is what's in the conversation so far.

---

## Optimize Your Context Window

Four things to optimize for:

1. **Correctness** — is the information accurate?
2. **Completeness** — does it have everything it needs?
3. **Size** — is it as small as possible while still complete?
4. **Trajectory** — is the conversation heading in the right direction?

---

## Trajectory Matters

If the AI did something wrong and you yelled at it, and it did something wrong again and you yelled at it again — the AI looks at this conversation and thinks:

"the pattern here is I do something wrong, then the human yells."

So the next most likely thing is to do something wrong again.

Be mindful of your conversation trajectory. If it's going badly, starting fresh is better than correcting.

*Source: Amazon Science 2024 — trajectory degrades with accumulated context*

---

## Context Problems, Ranked

From worst to least bad:

1. **Incorrect Information** — wrong context leads to confidently wrong code
2. **Missing Information** — gaps lead to guesses and assumptions
3. **Too Much Noise** — bloated context pushes you into the dumb zone

---

## The more you use the context window, the worse the outcomes you'll get.

This is not a model problem. It's a context management problem.

The same model that writes perfect code with focused context will produce slop with a bloated context window.

*Source: Amazon Science 2024 — 13.9–85% performance drop as input length increases; Liu et al. "Lost in the Middle" 2023*

---

# The Dumb Zone

---

## What Fills Up Your Context

- System instructions, rules, MCP tool definitions
- File reads — every file the agent opens
- Search results
- Tool outputs — terminal commands, MCP responses
- Conversation history — your messages + AI responses

---

## The Too-Many-MCPs Problem

MCP servers are powerful, but each one adds tool definitions to every conversation.

Too many MCP servers means your context window is already 40% full before you even type your first message.

If you have too many MCPs, you are doing all your work in the dumb zone and you're never going to get good results.

The fix: only enable the MCPs you actually need for the current task.

---

## The Smart Zone vs The Dumb Zone

The context window has a fixed size — typically 200k tokens, about 15,000 lines of code.

As it fills up, AI quality degrades.

- **The Smart Zone** — roughly the first 40% of context usage. AI performs well here.
- **The Dumb Zone** — beyond 40%. AI starts missing things, contradicting itself, producing lower quality output.

Additional reserved space: 23k tokens for auto-compaction, 32k tokens for AI output.

*Source: Amazon Science 2024; Liu et al. "Lost in the Middle" 2023; Hsieh et al. 2024*

---

# Staying in the Smart Zone

---

## What Eats Up Context

Things that fill your context window fast and should be compacted:

- Looking for files and exploring the codebase
- Understanding code flow
- File edits and diffs
- Test and build output
- JSON tool responses (especially from MCPs)

---

## Subagents for Context Isolation

Subagents are not for role-playing (frontend agent, backend agent).

They are for controlling context.

A subagent forks out a new context window that does all the heavy reading, searching, and codebase understanding. It returns a succinct message back to the parent: "the file you want is here."

The parent agent reads that one file and gets straight to work. Its context stays clean.

---

# The Workflow That Changes Everything

---

## Research → Plan → Implement

Build your entire workflow around context management. Three phases, each starting with fresh, focused context:

1. **Research** — understand the system
2. **Plan** — outline the exact steps
3. **Implement** — write the code

Goal: always stay in the smart zone.

*Source: arxiv.org/abs/2508.08322; arxiv.org/abs/2512.08769*

---

## Phase 1: Research

Understand how the system works. Find all relevant files. Stay objective.

- Use Ask mode (read-only) or a dedicated subagent
- Explore: how does the feature work? What files are involved? What patterns are used?
- Output: a summary of findings — relevant files, code flow, architectural patterns

This phase consumes a lot of context. That's fine — we'll compact it before moving on.

---

## Phase 2: Plan

Outline the exact implementation steps.

1. Use Plan mode (Shift+Tab to switch)
2. Include file names, line numbers, and actual code snippets of what's going to change
3. Be explicit about testing steps after every change
4. The plan itself is compressed context — intent, files, and approach in a small document
5. A well-written plan should be so clear that even a simple model could follow it without screwing up

Plan mode workflow: agent asks clarifying questions → researches codebase → creates plan → you review and edit → click to build.

---

## Phase 3: Implement

Go write the code.

- Start a fresh conversation with the plan
- If properly planned, implementation is straightforward and expected
- Keep context under 40%
- Break large implementations into smaller chunks

Each chunk: read the plan → implement that section → verify → move on.

---

## Plan with a Smart Model, Build with a Fast One

| Phase | Model Choice | Why |
|---|---|---|
| Research | Smart / expensive | Needs deep reasoning to understand the system |
| Planning | Smart / expensive | Needs to make good architectural decisions |
| Implementation | Fast / cheap | Following a well-defined plan is straightforward |

---

## Don't outsource the thinking.

AI cannot replace thinking. It can only amplify the thinking you have done — or the lack of thinking you have done.

*Source: METR 2025 — experienced devs 19% slower with AI; CHI 2025 — AI trust correlates with less critical thinking*

---

## The Hierarchy of Leverage

Where mistakes happen and how far they cascade:

| Level | Impact |
|---|---|
| 1 bad line of Code | = 1 bad line of code |
| 1 bad line of Plan | = 10–100 bad lines of code (wrong solution) |
| 1 bad line of Research | = 1,000+ bad lines of code (misunderstanding the system) |
| 1 bad line of Specification | = 10,000+ bad lines of code (wrong problem) |
| 1 bad line of Rules/CLAUDE.md | = 100,000+ bad lines of code (core infrastructure) |

Your effort should focus on the highest-leverage parts of the pipeline.

---

## When to Use Plan Mode vs Agent Mode

| Use Plan Mode | Use Agent Mode |
|---|---|
| Complex features with multiple approaches | Quick changes you've done before |
| Tasks touching many files or systems | Simple, well-defined edits |
| Unclear requirements | Iterating on an existing plan |
| Architectural decisions | Following a well-defined plan |

---

# Teaching Cursor About Your Project

## Static and Dynamic Context

---

## Static Context: Rules

Rules give Cursor persistent knowledge about your project — loaded at the start of every conversation.

| Type | Location | Scope |
|---|---|---|
| Project Rules | .cursor/rules/ | This repo only, version-controlled |
| User Rules | Cursor Settings | All your projects |
| Team Rules | Cursor Dashboard | All team members |
| AGENTS.md | Project root | This repo only, version-controlled |

---

## Progressive Disclosure Pattern

Don't dump everything into one giant rules file.

Put general rules at the root. Specific ones in subdirectories. The agent pulls in only what's relevant.

```
.cursor/rules/
  general.mdc       ← always loaded
  frontend.mdc      ← only when working in frontend/
  api.mdc           ← only when working in api/
  testing.mdc       ← only when writing tests
```

This keeps context small and focused — staying in the smart zone.

---

## Custom Commands

Reusable workflows defined as markdown files. Type / in chat to trigger them.

Great for standardizing team processes:
- /review-code
- /write-tests
- /create-pr
- /setup-new-feature

Stored in .cursor/commands/ — version-controlled and shareable.

---

## Skills

Packaged domain-specific knowledge and scripts that agents use on demand.

- **Portable** — works across projects
- **Version-controlled** — stored as files in your repo
- **Executable** — includes scripts agents can run
- **Progressive** — loads resources on demand, keeping context efficient

Agents discover skills automatically. You can also invoke them manually with / in chat.

---

# Dynamic Context & Extending Cursor

---

## @ Mentions

Precisely control what goes into context during a conversation:

| Mention | What It Does |
|---|---|
| @Files & Folders | Reference entire files or directories |
| @Code | Reference specific code sections (more precise) |
| @Docs | Pull in documentation |
| @Branch / @Commit | Context about your current work |
| @Past Chats | Reference earlier conversations |

Use @Code over @Files when possible — more precise means less context waste.

---

## MCP Servers

MCP (Model Context Protocol) connects Cursor to external tools and data.

Instead of explaining your project repeatedly, integrate directly:
- Figma designs
- Database connections
- Internal documentation
- CI/CD pipelines

Remember: each MCP adds tool definitions to context. Only enable what you need.

---

# More Features

---

## Checkpoints & Git Worktrees

**Checkpoints** — automatic snapshots of the agent's changes. Use "Restore Checkpoint" to undo. Think of it as Cmd+Z for AI changes.

**Git Worktrees** — run multiple agents in parallel on different tasks, each in their own worktree. No branch-switching headaches.

---

## Browser Integration

The agent can control a web browser:
- Testing web applications
- Visual debugging
- Accessibility audits
- Design-to-code conversion

Full access to console logs and network traffic. The agent sees the browser as screenshots — it actually looks at the page.

Works without installing external tools.

---

# Key Takeaways

1. **Context is everything** — AI output quality is determined by input quality
2. **Stay in the smart zone** — keep context under ~40%, start fresh often
3. **Research → Plan → Implement** — this workflow keeps you in the smart zone
4. **Don't outsource the thinking** — AI amplifies your thinking, it doesn't replace it. Focus on rules, research, and plans.
5. **Use progressive disclosure** — layer rules from general to specific
6. **Use subagents for context isolation** — heavy reading in subagents, clean main context
7. **Plan with a smart model, build with a fast one**
8. **Share context with your team** — rules, commands, and skills are version-controlled

---

# The Growing Rift

Now that you understand context engineering, this makes perfect sense:

There's a widening gap in how engineers feel about AI coding tools.

- **Mid-level engineers** — adopting AI rapidly — it fills knowledge gaps and speeds them up immediately.
- **Senior and Staff engineers** — slower to adopt, or actively resisting.

Both sides are partly right.

*Source: Stack Overflow 2025 — 55.5% juniors use AI daily vs seniors; 46% distrust AI accuracy*

---

## Junior & Mid-Level Engineers

Junior and mid-level engineers use a lot of AI.

It fills in some skill gaps.

But it also produces some slop.

Faster output, but not always better output.

Without deep understanding, they accept more low-quality, subtly wrong code.

*Source: Microsoft/Accenture 2024 — juniors gain more from Copilot; GitClear 2025 — AI code resembles less-experienced patterns*

---

## Senior & Staff Engineers

Staff and Principal engineers don't adopt AI because without reps, it doesn't make them that much faster.

They already know the patterns. AI doesn't fill a gap for them.

They work in the biggest, most complex brownfield codebases — where AI struggles most without proper context.

The senior engineers end up hating it more every week because they're cleaning up slop shipped by Cursor the week before. This is not AI's fault. This is not the mid-level engineer's fault. It's a skills gap.

The key insight: AI requires practice to become useful. It's a skill, not a magic button. Pick one tool and get some reps.

*Source: Uplevel 2024 — 41% more bugs, rework falls on seniors; METR 2025 — experienced devs slower with AI; Stack Overflow 2025*

---

## The Bridge

The gap between "AI skeptics" and "AI enthusiasts" is really a skills gap in context engineering.

Everything we covered today — the smart zone, compaction, rules, the research-plan-implement workflow — that's the bridge.

Once you master context engineering, AI becomes genuinely useful even in the largest, most complex codebases.

---

# What's Next

---

## Coding Agents Will Be Commoditized

Every IDE will have them. The tools are not the moat.

Team and workflow transformation will be the hard part.

The engineers and teams who figure out context engineering and workflow transformation will pull ahead.

---

## This isn't about using AI anymore.

## It's about using it better.

---

# References

Full sources in `session-2-research-sources.md`. Key citations:

| Claim | Source |
|---|---|
| Context degrades performance | Amazon Science 2024 · arxiv.org/abs/2510.05381 |
| Lost in the Middle | Liu et al. 2023 · arxiv.org/abs/2307.03172 |
| AI sycophancy | SycEval 2025 · arxiv.org/abs/2502.08177 |
| Junior vs senior adoption | Stack Overflow 2025 · survey.stackoverflow.co/2025 |
| AI code quality / slop | GitClear 2025; Uplevel 2024 |
| Don't outsource thinking | METR 2025 · arxiv.org/abs/2507.09089 |
| Research → Plan → Implement | arxiv.org/abs/2508.08322; arxiv.org/abs/2512.08769 |
