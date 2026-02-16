# Session 2 – Advanced Cursor: Context Engineering for Engineers

## Flow & Structure (1.5 hrs)

> **Central theme**: Context is everything. The quality of what AI produces is directly determined by the quality of what you put in. Every feature we cover ties back to one idea — how to give the AI the right information at the right time.

> **Approach**: Framework-agnostic. We'll use a demo project to show concepts, but everything applies whether you work in React, Go, Python, or anything else.

---

## Part 1 — Cursor: The AI Code Editor (5 min)

**Goal**: Quick orientation. Make sure everyone knows what Cursor is, the four modes, key shortcuts, and how pricing works. This is foundation-setting so the rest of the session makes sense.

### Cursor Overview

> **SLIDE**: *Cursor: The AI Code Editor — four modes listed with descriptions*

- Cursor is a code editor built around AI — it's VS Code under the hood, but with AI deeply integrated
- Four modes, each designed for different tasks:
  - **Agent** — Complex features, refactoring, multi-file edits. Full autonomy. This is the workhorse.
  - **Ask** — Learning, research, questions. Read-only — it won't change your code.
  - **Plan** — Complex features requiring planning. Creates detailed plans before execution.
  - **Debug** — Tricky bugs and regressions. Uses runtime evidence, not guesses.

### Agent Tools

> **SLIDE**: *Agent Tools screenshot*

- Show the agent tools panel — the tools the agent has access to (file editing, codebase search, terminal, browser, etc.)
- Briefly mention: the agent is built on three components — **instructions** (rules), **tools** (file edit, search, terminal), and **user messages** (your prompts)

### Key Shortcuts

> **SLIDE**: *Key shortcuts table*

| Shortcut | Action |
|---|---|
| `Cmd + I` | Open Agent |
| `Cmd + L` | Open Ask mode |
| `Shift + Tab` | Switch agent modes |
| `Cmd + /` | Switch models |
| `Enter` (while working) | Queue a message |
| `Cmd + Enter` (while working) | Send immediately |

- **Queue vs Send Immediately**: While the agent is working, `Enter` queues your message (it waits until the agent finishes). `Cmd+Enter` sends immediately — useful for urgent redirects.

### Models & Pricing

> **SLIDE**: *Models & Pricing*

- Cursor supports all major AI models — Claude, GPT, Gemini, and more
- **Auto mode** — Cursor picks the best model and switches automatically if performance degrades. Recommended default.
- **Max Mode** — extends context window beyond 200k tokens. Slower and more expensive. Most useful for Gemini 2.5 Flash, Gemini 3 Pro, GPT 4.1.
- Switch models mid-conversation with `Cmd+/`
- In our Org: everyone gets Pro plan with $20 of agent usage + $10 bonus credits
- If you run out, request more in the `cursor-users` channel

**Presenter note**: Keep this section brisk — it's orientation, not deep-dive. The audience needs to know the basics so they can follow along during demos.

---

## Part 2 — The Problem: Why AI Falls Apart on Real Codebases (10 min)

**Goal**: Set the stage with the problem everyone in the room has experienced firsthand — AI is incredible on small or new projects, but struggles on real-world, large codebases. This builds immediate credibility and sets up *why* context engineering matters.

### The Greenfield Illusion

> **SLIDE**: *Left side: "Greenfield / Small Projects" with sparkles — fast, impressive, feels like magic. Right side: "Brownfield / Large Codebases" with storm clouds — slow, wrong patterns, ignores conventions, breaks things.*

- AI coding tools are incredible on greenfield projects — build a todo app, a landing page, a new API from scratch, and it feels like magic
- But try using AI on a 500k-line codebase with 10 years of history, custom patterns, and undocumented conventions — and it falls apart
- It uses the wrong patterns. It ignores your conventions. It doesn't know about the helper that already exists. It writes code that technically works but doesn't belong.
- You ship a lot more code, but a lot of it is reworking the slop from last week

> **SLIDE**: *"The bigger and more complex the codebase, the worse AI performs"*

### It's Not a Model Problem. It's a Context Problem.

- On greenfield: the AI has all the context it needs (there's barely any codebase to know about)
- On brownfield: the AI is missing most of the context — your patterns, your architecture, your unwritten rules, your team conventions
- The AI isn't dumber on big projects. It just **knows less**.

### Why This Matters

- Most of us work in brownfield codebases — that's the reality
- If AI only works on small new projects, it's a toy, not a tool
- The engineers who figure out how to make AI work in *real* codebases will have a massive advantage

### Goals

> **SLIDE**: *Goals — four bullet points*

Frame what we're going to solve today:

- **AI works well in Brownfield codebases** — not just greenfield
- **Solved Complex Problems** — not just simple tasks
- **No Slop** — quality output, not more code to clean up
- **Mental Alignment** — a shared mental model for how to work with AI

**Presenter note**: This opening validates the frustration people feel without blaming the tools or the people. Everyone has experienced the greenfield-vs-brownfield gap. The answer isn't "AI is overhyped" — it's "you need to give it the right context."

---

## Part 3 — The Naive Way to the Smarter Way (10 min)

**Goal**: Before diving into theory, show the audience the practical progression of how people use AI — from naive to smart. This is relatable and gives them immediate takeaways. The theory (context window, smart zone) comes *after*, so it lands harder because they've already seen the symptoms.

### The Naive Way

> **SLIDE**: *Diagram showing a single context window filling up: System Instructions → CLAUDE.md → Tools → User message → Read() → Search() → Write() → Assistant Message → User message: "NO do it XYZ way" → Read() → Search() → Write()...*

- Most people use AI this way: start a conversation, keep going until it breaks
- When the agent goes wrong, you try to redirect it mid-conversation: "NO, do it the XYZ way."
- Problem: the context is now full of wrong turns, failed attempts, and noise
- Resteering wastes context — the AI has to hold both the wrong approach AND your correction

### Slightly Smarter: Start Over vs Re-steer

> **SLIDE**: *Two context windows side by side. Left: accumulated conversation with history. Right: fresh context with "Make sure you use XYZ approach" in the first message*

- Instead of fighting a confused conversation, start fresh with a targeted prompt
- "Same task, but this time use XYZ approach — and don't go down that other path."
- Starting fresh with a targeted prompt often gets better results than resteering
- Use `@Past Chats` to carry forward what matters without dragging in the full history

### How Do You Know It's Time to Start Over?

> **SLIDE**: *"How do you know it's time to start over?"*

Pause for the audience. Then reveal:

### "You're absolutely right."

> **SLIDE**: *"You're absolutely right."*

- That's what AI tells you when it knows it's screwing up
- It's agreeing to get you off its back
- When you hear this, it's time to start over

### Smarter: Intentional Compaction

> **SLIDE**: *Diagram showing: Left side — long conversation with many tool calls → "Summarize progress to progress.md" → progress.md file. Right side — fresh context that reads progress.md and continues from where it left off*

- Whether you're on track or off track, compress your context into a file before starting over
- Tell the agent: "Summarize everything we've done to progress.md"
- Include: the approach, steps completed, current problem, relevant files
- In the new conversation: "Read progress.md and continue from where we left off"
- The new agent gets straight to work instead of having to redo all the searching, file reading, and codebase understanding

### A Good Compaction

> **SLIDE**: *Structured compaction showing: Component Usage Flow → Modal Path (Working) with numbered steps → Message Stream Path (Broken) with numbered steps → Code References with specific file:line references*

A good compaction is structured and specific — like a well-written bug report:
- **What we're working on** — exactly what the task is
- **The exact files and line numbers** that matter to the problem
- **What works** — known-good paths with specific file names and line numbers
- **What's broken** — the specific failure with the exact code path

Precise enough that someone — or an AI — could pick it up and immediately start working.

### The /summarize Command

- When a conversation gets long, use `/summarize` to compress the history
- Keeps important context, drops the noise
- Lets you keep working without starting over completely

**Presenter note**: This section is intentionally practical and relatable. The audience is nodding along because they've lived this. Now when we explain *why* this happens (context theory in the next section), it clicks immediately.

---

## Part 4 — Why Context Is Everything (10 min)

**Goal**: Now that the audience has seen the symptoms and practical fixes, explain *why* it all works this way. This is the conceptual foundation — it should change how they *think* about using AI.

### LLMs Are Stateless

> LLMs are like pure functions:
>
> **What goes in → What comes out**
>
> Put good tokens in and you get better tokens out.

- LLMs have no memory between conversations
- Every response is only as good as what's in the context window
- The context window = system instructions + rules + your messages + tool outputs + file contents + everything else
- Every turn of the loop, the AI is picking the next action — and the *only thing* that influences what comes out is what's in the conversation so far

### Optimize Your Context Window

Four things to optimize for:

1. **Correctness** — is the information accurate?
2. **Completeness** — does it have everything it needs?
3. **Size** — is it as small as possible while still complete?
4. **Trajectory** — is the conversation heading in the right direction?

### Trajectory Matters

- If the AI did something wrong and you yelled at it, and it did it wrong again and you yelled at it again — the AI looks at this conversation and thinks: "the pattern here is I do something wrong, then the human yells."
- So the next most likely thing is to do something wrong again.
- Be mindful of your conversation trajectory — if it's going badly, starting fresh is often better than correcting
- This is *why* the strategies from Part 3 work — you're resetting the trajectory

### Context Problems, Ranked

From worst to least bad:

1. **Incorrect Information** — wrong context leads to confidently wrong code
2. **Missing Information** — gaps lead to guesses and assumptions
3. **Too Much Noise** — bloated context pushes you into the dumb zone

> **SLIDE**: *"The more you use the context window, the worse the outcomes you'll get."*

**Key takeaway**: This is not a model problem. It's a context management problem. The same model that writes perfect code with focused context will produce slop with a bloated context window.

---

## Part 5 — The Dumb Zone (5 min)

**Goal**: Make the "smart zone vs dumb zone" concept concrete. Show what fills up context and why MCPs are a common trap. This gives the audience a visual mental model they'll carry with them.

### What Fills Up Your Context

> **SLIDE**: *What Fills Up Your Context — bullet list*

- System instructions, rules, MCP tool definitions
- File reads — every file the agent opens
- Search results
- Tool outputs — terminal commands, MCP responses
- Conversation history — your messages + AI responses

### The Too-Many-MCPs Problem

> **SLIDE**: *Context window diagram where MCP Tools (shown in blue) takes up a massive portion of the "smart zone", pushing actual work into "the dumb zone"*

- MCP servers are powerful, but each one adds tool definitions to every conversation
- Too many MCP servers = your context window is already 40% full before you even type your first message
- If you have too many MCPs, you are doing all your work in the dumb zone and you're never going to get good results
- **The fix**: Only enable the MCPs you actually need for the current task

### The Smart Zone vs The Dumb Zone

> **SLIDE**: *Context window diagram showing "the smart zone" at the top (~40% usage), "the dumb zone" below, with 168k tokens total, 23k reserved for auto-compact, 32k reserved for output*

- The context window has a fixed size (typically 200k tokens, ~15,000 lines of code)
- As it fills up, the AI's ability to reason about *all* the information degrades
- **The Smart Zone** — roughly the first ~40% of context usage. AI performs well here.
- **The Dumb Zone** — beyond ~40%. AI starts missing things, contradicting itself, producing lower quality output.
- 23k tokens are reserved for auto-compaction (Cursor's automatic summarization)
- 32k tokens are reserved for the AI's response

**Presenter note**: The "smart zone" diagram is the anchor for the whole session. Keep coming back to it: *"This feature helps you stay in the smart zone because..."*

---

## Part 6 — Staying in the Smart Zone (5 min)

**Goal**: Bridge from theory back to practice. Two key techniques for keeping your main context clean: knowing what eats context, and using subagents to isolate heavy work.

### What Eats Up Context

> **SLIDE**: *What Eats Up Context — bullet list*

Things that fill your context window fast and should be compacted:
- Looking for files and exploring the codebase
- Understanding code flow
- File edits and diffs
- Test and build output
- JSON tool responses (especially from MCPs)

### Subagents for Context Isolation

> **SLIDE**: *Diagram showing parent agent spawning a subagent — "Find where XYZ is handled (use a subagent)". The subagent runs in its own context window with Read(), Read(), Read(), Search(), List() calls. Returns a short result: "the file is in src/main/..." back to the parent agent*

- **Subagents are not for role-playing** (frontend agent, backend agent). They are for **controlling context.**
- A subagent forks out a new context window that does all the heavy reading, searching, and codebase understanding
- It returns a succinct message back to the parent — "the file you want is here"
- The parent agent reads that one file and gets straight to work. Its context stays clean.
- Each subagent has its own context window — long research tasks don't consume space in your main conversation
- You can launch multiple subagents in parallel — work on different parts of your codebase without waiting

**Example**: Instead of the main agent reading 20 files to understand authentication (filling up context), it spawns a subagent that reads all 20 files and returns a 10-line summary.

**Demo: Subagents**

1. In the demo project, give the agent a task that requires understanding a system: *"How does the authentication flow work in this project? (use a subagent)"*
2. Show the subagent spinning up in its own context — reading files, searching, exploring
3. Show the succinct result that comes back to the parent agent
4. Point out: the parent's context is still clean — it didn't read 20 files, it got a summary

---

## Part 7 — The Workflow That Changes Everything (15 min)

**Goal**: Teach the most effective workflow pattern for complex tasks. This builds on everything from the previous sections — it's frequent intentional compaction turned into a complete workflow. Your entire approach is built around staying in the smart zone.

### Research → Plan → Implement

> **SLIDE**: *Three phases with arrows: Research → Plan → Implement*

Build your entire workflow around context management. Three phases, each starting with fresh, focused context:

1. **Research** — understand the system
2. **Plan** — outline the exact steps
3. **Implement** — write the code

Goal: always stay in the smart zone.

### Phase 1: Research

**Goal**: Understand how the system works. Find all relevant files. Stay objective.

- Use **Ask mode** (`Cmd+L`, read-only) or a dedicated subagent
- Explore: how does the feature work? What files are involved? What patterns are used?
- **Output**: A summary of findings — relevant files, code flow, architectural patterns
- This phase consumes a lot of context (reading many files) — that's fine, because we'll compact it before moving on

**Demo: Research with Ask Mode + Semantic Search**

1. Open Ask mode (`Cmd+L`)
2. Ask: *"How does user authentication work in this project?"*
3. Show how Ask mode uses **semantic search** — finding code by meaning, not just text matching
4. Point out: semantic search finds relevant code even when you don't know the exact function names or file locations
5. Show how Ask mode explores multiple files without changing anything
6. The output: a summary of findings with relevant file paths

> **Semantic Search** is Cursor's built-in ability to find code by meaning. When you ask "how does auth work?", it doesn't just grep for "auth" — it understands the *concept* and finds related code across your codebase. This powers Ask mode, Agent's codebase exploration, and the search tools.

### Phase 2: Plan

**Goal**: Outline the exact implementation steps.

- Use **Plan mode** (`Shift+Tab` to switch)
- Include: **file names, line numbers, and actual code snippets** of what's going to change
- Be explicit about testing steps after every change
- The plan itself is compressed context — intent, files, and approach in a small document
- A well-written plan should be so clear that even a simple model could follow it without screwing up

**Plan mode workflow**:
1. Agent asks clarifying questions to understand your requirements
2. Researches your codebase to gather relevant context
3. Creates a comprehensive implementation plan
4. You review and edit the plan through chat or markdown files
5. Click to build the plan when ready

Plans are saved by default in your home directory. Click "Save to workspace" to move it to your workspace for team sharing.

**Demo: Plan Mode**

1. Switch to Plan mode (`Shift+Tab`)
2. Describe a feature: *"Add rate limiting to the API endpoints"*
3. Show the agent asking clarifying questions
4. Show it researching the codebase
5. Show the resulting plan — with file names, approach, and steps
6. Review and edit the plan
7. Save it to workspace

### Phase 3: Implement

**Goal**: Go write the code.

- Start a **fresh conversation** with the plan
- If properly planned, implementation is straightforward and expected
- **Keep context under 40%** — if you're running over, break the implementation into smaller chunks
- Each chunk: read the plan → implement that section → verify → move on

### Plan with a Smart Model, Build with a Fast One

| Phase | Model Choice | Why |
|---|---|---|
| Research | Smart / expensive | Needs deep reasoning to understand the system |
| Planning | Smart / expensive | Needs to make good architectural decisions |
| Implementation | Fast / cheap | Following a well-defined plan is straightforward |

Use `Cmd+/` to switch models between phases.

### Don't Outsource the Thinking

> **AI cannot replace thinking. It can only amplify the thinking you have done — or the lack of thinking you have done.**

- There is no perfect prompt. There is no silver bullet.
- This workflow only works if **you** read the research and **you** read the plan
- A bad plan sends the model off in the wrong direction entirely
- You, the builder, need to be in back-and-forth with the agent as plans are created

### The Hierarchy of Leverage

> **SLIDE**: *Pyramid diagram showing cascade of mistakes*

| Level | Impact |
|---|---|
| 1 bad line of Code | = 1 bad line of code |
| 1 bad line of Plan | = 10–100 bad lines of code (wrong solution) |
| 1 bad line of Research | = 1,000+ bad lines of code (misunderstanding the system) |
| 1 bad line of Specification | = 10,000+ bad lines of code (wrong problem) |
| 1 bad line of Rules/CLAUDE.md | = 100,000+ bad lines of code (core infrastructure) |

**Your effort should focus on the highest-leverage parts of the pipeline** — the rules, the research, and the plan. The code is the cheapest thing to fix.

### When to Use Plan Mode vs Agent Mode

| Use Plan Mode | Use Agent Mode |
|---|---|
| Complex features with multiple valid approaches | Quick changes you've done before |
| Tasks that touch many files or systems | Simple, well-defined edits |
| Unclear requirements (need to explore first) | Iterating on something you already planned |
| Architectural decisions (review approach first) | Following an existing plan |

---

## Part 8 — Teaching Cursor About Your Project: Static Context (15 min)

**Goal**: Show how to give Cursor persistent knowledge about your codebase *before* you start a conversation. This is the "Core Infrastructure" layer from the Hierarchy of Leverage — the highest-leverage place to invest your effort. Heavy on demos.

### Static Context: Rules

> **SLIDE**: *Rules types table — Project, User, Team, AGENTS.md*

Rules give Cursor persistent knowledge about your project — loaded at the start of every conversation. They're the most important context you can provide.

| Type | Location | Scope | Who Manages |
|---|---|---|---|
| **Project Rules** | `.cursor/rules/` | This repo only | Version-controlled by team |
| **User Rules** | Cursor Settings | All your projects | You |
| **Team Rules** | Cursor Dashboard | All team members | Team admins |
| **AGENTS.md** | Project root or subdirs | This repo only | Version-controlled by team |

How rules work: LLMs don't retain memory between completions. Rules provide persistent, reusable context at the prompt level. When applied, rule contents are included at the start of the model context — always-on guidance.

**Demo: Rules in Action**

1. Show the `.cursor/rules/` folder in the demo project
2. Show a rule file — walk through the structure (description, globs, content)
3. **Without rules**: Ask the agent to write a component. Show how it uses generic patterns.
4. **With rules**: Same prompt, but now rules tell the agent about project conventions, naming patterns, preferred libraries. Show the difference in output.
5. Key point: *"This is the highest-leverage thing you can do. One good rule file shapes every conversation."*

### Progressive Disclosure Pattern

> **SLIDE**: *Progressive disclosure folder structure*

Don't dump everything into one giant rules file. Put general rules at the root, specific ones in subdirectories. The agent pulls in only what's relevant.

```
.cursor/rules/
  general.mdc       ← always loaded
  frontend.mdc      ← only when working in frontend/
  api.mdc           ← only when working in api/
  testing.mdc       ← only when writing tests
```

This keeps context small and focused — directly tied to staying in the "smart zone."

**Demo**: Show how the agent picks up different rules when working in different parts of the codebase. Open a frontend file — frontend rules activate. Open an API file — API rules activate.

### Custom Commands

> **SLIDE**: *Custom commands list*

- Reusable workflows defined as markdown files in `.cursor/commands/`
- Type `/` in chat to trigger them
- Great for standardizing team processes:

```
.cursor/commands/
  review-code.md
  write-tests.md
  create-pr.md
  setup-new-feature.md
```

**Demo: Custom Commands**

1. Show the `.cursor/commands/` folder
2. Open a command file — show it's just markdown with instructions
3. Type `/` in chat — show the commands appear
4. Run `/review-code` or `/write-tests` — show the agent following the command's workflow
5. Key point: *"This is how you standardize workflows across your team. Everyone gets the same review process."*

### Skills

> **SLIDE**: *Skills — four properties listed*

Packaged domain-specific knowledge and scripts that agents use on demand.

- **Portable** — works across projects (can be installed via GitHub links)
- **Version-controlled** — stored as files in your repo
- **Executable** — includes scripts agents can run
- **Progressive** — loads resources on demand, keeping context efficient

When Cursor starts, it automatically discovers skills from skill directories and makes them available to the agent. The agent decides when they're relevant based on context. You can also invoke them manually with `/` in Agent chat.

**Demo: Skills**

1. Show a skill file — walk through the structure (SKILL.md with instructions and optional scripts)
2. Type `/` in Agent chat — show skills appearing alongside commands
3. Invoke a skill — show the agent loading it and using its instructions
4. Key point: *"Skills are like portable expertise. You write them once, and any agent on any project can use them."*

---

## Part 9 — Dynamic Context & Extending Cursor (10 min)

**Goal**: Cover how to precisely control context *during* a conversation. @ Mentions let you surgically add context. MCP connects Cursor to external tools. Both tie back to context management — add only what you need, when you need it.

### @ Mentions: Choosing What Goes Into Context

> **SLIDE**: *@ Mentions table*

| Mention | What It Does | When to Use |
|---|---|---|
| `@Files & Folders` | Reference entire files or directories | When the agent needs full file context |
| `@Code` | Reference specific code sections | When you need precision (better than full files) |
| `@Docs` | Pull in documentation | When working with a library or API |
| `@Branch / @Commit` | Context about your current work | "Review my changes" or "What am I working on?" |
| `@Past Chats` | Reference earlier conversations | When starting fresh but needing prior context |

- Use `@Code` over `@Files` when possible — more precise = less context waste
- Navigate suggestions using arrow keys, press `Enter` to select
- Large files and folders are automatically condensed to fit within context limits

**Demo: @ Mentions**

1. Show `@Files` — reference a full file, show it appearing in context
2. Show `@Code` — select a specific function. Point out: *"This adds 10 lines to context instead of 500. That's the difference between smart zone and dumb zone."*
3. Show `@Docs` — pull in documentation for a library the project uses
4. Show `@Branch` — ask *"Review the changes on this branch"* — the agent sees your recent work
5. Show `@Past Chats` — start a fresh conversation but reference an earlier one for continuity

### MCP Servers

> **SLIDE**: *MCP Servers — what they connect to*

MCP (Model Context Protocol) connects Cursor to external tools and data. Instead of explaining your project repeatedly, integrate directly.

Examples:
- **Figma MCP** — design-to-code conversion
- **Database connections** — query schemas and data
- **Internal documentation** — pull in wiki/docs directly
- **CI/CD pipelines** — check build status, deploy

How it works: MCP servers expose capabilities through the protocol. Cursor supports three transport methods (stdio for local, SSE/HTTP for remote). Servers can provide tools, prompts, resources, and more.

**Remember the too-many-MCPs problem**: each MCP adds tool definitions to context. Only enable what you need.

**Demo: MCP in Action**

1. Show Cursor Settings → MCP configuration
2. Show an MCP server that's enabled (e.g., Figma MCP or Context7 for docs)
3. In a conversation, show the agent using the MCP tool — pulling in external data without you having to explain it
4. Key point: *"MCPs are powerful, but remember — each one fills your context. Only enable what you need for the current task."*

---

## Part 10 — More Features (5 min)

**Goal**: Quick coverage of remaining powerful features. These are "good to know" — show briefly, don't deep-dive.

### Checkpoints & Git Worktrees

- **Checkpoints**: Automatic snapshots of the agent's changes. Use "Restore Checkpoint" to undo. Think of it as `Cmd+Z` for AI changes. Stored locally, separate from Git.
- **Git Worktrees**: Run multiple agents in parallel on different tasks, each in their own worktree. No branch-switching headaches. Cursor automatically creates and manages worktrees.

**Quick demo**: Show how to restore a checkpoint after the agent makes a change.

### Browser Integration

- Agent can control a web browser for testing, visual debugging, accessibility audits, design-to-code conversion
- Full access to console logs and network traffic
- Screenshots integrated directly — the agent actually *sees* the browser state as images
- Works without installing external tools

**Quick demo**: Show the agent opening a browser, taking a screenshot, and identifying a visual issue.

---

## Part 11 — The Bigger Picture & What's Next (10 min)

**Goal**: Zoom out. Now that the audience has the techniques, show the human side of AI adoption — the growing rift, why it exists, and why context engineering is the bridge. End with a forward-looking perspective.

### Key Takeaways

> **SLIDE**: *8 key takeaways*

1. **Context is everything** — AI output quality is determined by input quality
2. **Stay in the smart zone** — keep context under ~40%, start fresh often
3. **Research → Plan → Implement** — this workflow keeps you in the smart zone
4. **Don't outsource the thinking** — AI amplifies your thinking, it doesn't replace it. Focus on rules, research, and plans.
5. **Use progressive disclosure** — layer rules from general to specific
6. **Use subagents for context isolation** — heavy reading in subagents, clean main context
7. **Plan with a smart model, build with a fast one**
8. **Share context with your team** — rules, commands, and skills are version-controlled

### The Growing Rift

> **SLIDE**: *Graph showing "Love AI" vs "Hate AI" — Mid-Level engineers trending upward, Senior+ engineers trending downward over time*

Now that you understand context engineering, this rift makes perfect sense:

- Mid-level and junior engineers are adopting AI rapidly — it fills knowledge gaps and speeds them up
- Senior/Staff/Principal engineers are slower to adopt, or actively resisting
- Both sides are partly right

### Junior & Mid-Level Engineers

> **SLIDE**: *"Junior/Mid-level engineers use a lot of AI — It fills in some skill gaps — But it also produces some slop"*

- Get immediate value — AI fills knowledge gaps
- But without deep understanding, they accept more "slop" (low-quality, subtly wrong code)
- Faster output, but not always better output

### Senior & Staff Engineers

> **SLIDE**: *"Staff/Principal Engineers don't adopt AI because without reps it doesn't make them that much faster"*

- Already know the patterns — AI doesn't fill a gap for them
- Work in the biggest, most complex brownfield codebases — where AI struggles most without proper context
- The senior engineers end up hating it more every week because they're cleaning up slop shipped by Cursor the week before
- This is not AI's fault. This is not the mid-level engineer's fault. It's a skills gap.
- The key insight: **AI requires reps (practice) to become useful.** It's a skill, not a magic button. Pick one tool and get some reps.

### The Bridge

- The gap between "AI skeptics" and "AI enthusiasts" is really a **skills gap in context engineering**
- Everything we covered today — the smart zone, compaction, rules, the research-plan-implement workflow — that's the bridge
- Once you master context engineering, AI becomes genuinely useful even in the largest, most complex codebases

### What's Next

> **SLIDE**: *"Coding Agents Will Be Commoditized"*

- The AI tools themselves will become commoditized — every IDE will have agents
- **The hard part is the transformation**: changing how teams work, how you plan, how you review
- The engineers and teams who figure out **context engineering** and **workflow transformation** will pull ahead

> **SLIDE**: *"This isn't about using AI anymore. It's about using it better."*

---

## Session Timeline (90 min)

| Time | Section | Duration |
|---|---|---|
| 0:00 | Part 1 — Cursor: The AI Code Editor | 5 min |
| 0:05 | Part 2 — The Problem: Why AI Falls Apart on Real Codebases | 10 min |
| 0:15 | Part 3 — The Naive Way to the Smarter Way | 10 min |
| 0:25 | Part 4 — Why Context Is Everything | 10 min |
| 0:35 | Part 5 — The Dumb Zone | 5 min |
| 0:40 | Part 6 — Staying in the Smart Zone (Subagents demo) | 5 min |
| 0:45 | Part 7 — The Workflow That Changes Everything (Semantic Search, Plan Mode demos) | 15 min |
| 1:00 | Part 8 — Teaching Cursor: Static Context (Rules, Commands, Skills demos) | 15 min |
| 1:15 | Part 9 — Dynamic Context (@ Mentions, MCP demos) | 10 min |
| 1:25 | Part 10 — More Features (Checkpoints, Browser) | 5 min |
| 1:30 | Part 11 — The Bigger Picture & What's Next | 10 min |

**Note**: Timeline adds to ~95 min. If running tight on time, trim Part 10 demos (checkpoints/browser can be brief show-and-tell) and keep Part 9 MCP demo short. The core demos (subagents, semantic search, plan mode, rules, @ mentions) should not be cut.

---

## Demo Summary

Quick reference for all live demos and which features they cover:

| Part | Demo | Features Shown |
|---|---|---|
| Part 6 | Subagent research task | **Subagents**, context isolation |
| Part 7 | Ask mode + codebase exploration | **Semantic search**, Ask mode |
| Part 7 | Plan mode feature planning | **Plan mode**, model switching |
| Part 8 | Rules with/without comparison | **Rules**, progressive disclosure |
| Part 8 | Running a custom command | **Custom commands** |
| Part 8 | Invoking a skill | **Skills** |
| Part 9 | @ Mentions walkthrough | **@ Mentions** (@Files, @Code, @Docs, @Branch, @Past Chats) |
| Part 9 | MCP tool usage | **MCP servers** |
| Part 10 | Checkpoint restore | Checkpoints |
| Part 10 | Browser visual debugging | Browser integration |

---

## Slide Reference Guide

Quick reference for which slide/image goes where:

| Section | Slide | Image File |
|---|---|---|
| Part 2 — Greenfield Illusion | Greenfield vs Brownfield comparison | *NEW SLIDE NEEDED* |
| Part 2 — Why | "The bigger and more complex the codebase..." | *NEW SLIDE NEEDED* |
| Part 3 — Naive Way | Work until context runs out | `SCR-20260213-oxdy.png` |
| Part 3 — Start Over | Fresh context vs resteer | `SCR-20260213-oxqz.png` |
| Part 3 — Compaction | Intentional compaction diagram | `SCR-20260213-oyfq.png` |
| Part 3 — Good Compaction | Structured compaction example | `SCR-20260213-ozhq.png` |
| Part 5 — Too Many MCPs | MCP tools filling context | `SCR-20260213-pbvs.png` |
| Part 5 — Smart Zone | Context window zones diagram | `SCR-20260213-pbmm.png` |
| Part 5 — Noise | "The more you use the context window..." | `SCR-20260213-pbdz.png` |
| Part 6 — Subagents | Managing context with subagents | `SCR-20260213-pctt.png` |
| Part 7 — Workflow | Research → Plan → Implement | `SCR-20260213-pjll.png` |
| Part 7 — Hierarchy | Hierarchy of Leverage pyramid | `SCR-20260213-piqm.png` |
| Part 11 — Growing Rift | Love AI vs Hate AI graph | `SCR-20260213-pkgb.png` |
| Part 11 — Junior/Mid-level | "fills in some skill gaps / produces some slop" | `SCR-20260213-pkdn.png` |
| Part 11 — Senior+ | "without reps it doesn't make them that much faster" | `SCR-20260213-pkap.png` |
| Part 11 — What's Next | "Coding Agents Will Be Commoditized" | `SCR-20260213-pjll.png` |

---

## Notes for Presenter

- **The new flow is: orientation → problem → practical strategies → theory → techniques → workflow → static context → dynamic context → features → big picture.** Strategies come *before* theory so the audience has already felt the pain before you explain why it happens. The theory lands much harder this way.
- **The "smart zone" diagram is the anchor.** Keep coming back to it: *"This feature helps you stay in the smart zone because..."*
- **The Hierarchy of Leverage is the second anchor.** When talking about rules, plans, or research, point back to the pyramid: *"This is why we spend time here — one bad line at this level cascades into thousands of bad lines of code."*
- **Every advanced feature gets a live demo.** Rules, skills, subagents, semantic search, @ mentions, and MCP all have dedicated demo moments. Don't just talk about them — show them.
- **Semantic search is woven into the Research demo**, not a standalone section. It's most impactful when shown in the context of actual codebase exploration.
- **Save the rift for the end.** After 80+ minutes of techniques, the rift becomes an "aha moment" — the audience connects the dots themselves.
- **Don't live-code a full app.** Use the demo project as a playground to show individual concepts.
- **Show, don't tell.** For each concept, either demo it live or show a screenshot.
- **Acknowledge the diversity.** Frontend, backend, QA — the context management principles are the same regardless of stack.
- **Leave room for questions.** The audience cares about *their* codebases. Be ready for "how would I do this in my project?" questions.
- **End on transformation, not features.** The last slide reframes the whole session: this isn't about Cursor specifically, it's about changing how you work.
