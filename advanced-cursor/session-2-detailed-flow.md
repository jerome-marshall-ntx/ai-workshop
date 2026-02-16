# Session 2 – Advanced Cursor: Context Engineering for Engineers

## Flow & Structure (1.5 hrs)

> **Central theme**: Context is everything. The quality of what AI produces is directly determined by the quality of what you put in. Every feature we cover ties back to one idea — how to give the AI the right information at the right time.

> **Approach**: Framework-agnostic. We'll use a demo project to show concepts, but everything applies whether you work in React, Go, Python, or anything else.

---

## Part 1 — The Problem: Why AI Falls Apart on Real Codebases (10 min)

**Goal**: Set the stage with the problem everyone in the room has experienced firsthand — AI is incredible on small or new projects, but struggles on real-world, large codebases. This builds immediate credibility and sets up *why* context engineering matters.

### The Greenfield Illusion

> **SLIDE**: *Left side: "Greenfield / Small Projects" with sparkles — fast, impressive, feels like magic. Right side: "Brownfield / Large Codebases" with storm clouds — slow, wrong patterns, ignores conventions, breaks things.*

- AI coding tools are incredible on greenfield projects — build a todo app, a landing page, a new API from scratch, and it feels like magic
- But try using AI on a 500k-line codebase with 10 years of history, custom patterns, and undocumented conventions — and it falls apart
- It uses the wrong patterns. It ignores your conventions. It doesn't know about the helper that already exists. It writes code that technically works but doesn't belong.
- You ship a lot more code, but a lot of it is reworking the slop from last week

> **SLIDE**: *"The bigger and more complex the codebase, the worse AI performs — unless you know why."*

### It's Not a Model Problem. It's a Context Problem.

- On greenfield: the AI has all the context it needs (there's barely any codebase to know about)
- On brownfield: the AI is missing most of the context — your patterns, your architecture, your unwritten rules, your team conventions
- The AI isn't dumber on big projects. It just **knows less**.

### Why This Matters to Everyone in This Room

- Most of us work in brownfield codebases — that's the reality
- If AI only works on small new projects, it's a toy, not a tool
- The engineers who figure out how to make AI work in *real* codebases will have a massive advantage
- Today: the mental model and techniques that close the gap between "greenfield magic" and "brownfield reality"

**Presenter note**: This opening validates the frustration people feel without blaming the tools or the people. Everyone has experienced the greenfield-vs-brownfield gap. The answer isn't "AI is overhyped" — it's "you need to give it the right context."

---

## Part 2 — Why Context Is Everything (15 min)

**Goal**: This is the conceptual foundation for everything else. Explain *why* advanced AI usage is really about context management. This section should change how the audience *thinks* about using AI — before we show them any features.

### LLMs Are Stateless

> LLMs are like pure functions:
>
> **what goes in → what comes out**
>
> Put good tokens in and you get better tokens out.

- LLMs have no memory between conversations
- Every response is only as good as the information in the context window
- The context window = system instructions + rules + your messages + tool outputs + file contents + everything else
- Every turn of the loop, the AI is picking the next action — and the *only thing* that influences what comes out is what's in the conversation so far

### The Smart Zone vs The Dumb Zone

> **SLIDE**: *Context window diagram showing "the smart zone" at the top (~40% usage), "the dumb zone" below, with 168k tokens total, 23k reserved for auto-compact, 32k reserved for output*

- The context window has a fixed size (typically 200k tokens, ~15,000 lines of code)
- As it fills up, the AI's ability to reason about *all* the information degrades
- **The "Smart Zone"**: roughly the first ~40% of context usage — the AI performs well here
- **The "Dumb Zone"**: beyond ~40% — the AI starts missing things, contradicting itself, producing lower quality output
- 23k tokens are reserved for auto-compaction (Cursor's automatic summarization)
- 32k tokens are reserved for the AI's response

> **SLIDE**: *"The more you use the context window, the worse the outcomes you'll get."*

**Key takeaway**: This is not a model problem. It's a context management problem. The same model that writes perfect code with focused context will produce slop with a bloated context window.

### What Fills Up Your Context

- File reads (every file the agent opens)
- Search results
- Tool outputs (terminal commands, MCP responses)
- Conversation history (your messages + AI responses)
- System instructions, rules, MCP tool definitions

### The Too-Many-MCPs Problem

> **SLIDE**: *Context window diagram where MCP Tools (shown in blue) takes up a massive portion of the "smart zone", pushing actual work into "the dumb zone"*

- MCP servers are powerful, but each one adds tool definitions to every conversation
- Too many MCP servers = your context window is already 40% full before you even type your first message
- If you have too many MCPs in your coding agent, you are doing all your work in the dumb zone
- **The fix**: Only enable the MCPs you actually need for the current task

### Optimize Your Context Window For

1. **Correctness** — is the information accurate?
2. **Completeness** — does it have everything it needs?
3. **Size** — is it as small as possible while still complete?
4. **Trajectory** — is the conversation heading in the right direction?

### Trajectory Matters

- If you told the agent to do something, it did it wrong, you yelled at it, it did it wrong again, and you yelled at it again — the AI looks at this conversation and says "the pattern here is: I do something wrong, the human yells, I do something wrong, the human yells." So the next most likely thing is to do something wrong again.
- Be mindful of your conversation trajectory — if it's going badly, starting fresh is often better than correcting

### Context Problems, Ranked (worst to least bad)

1. **Incorrect Information** — wrong context leads to confidently wrong code
2. **Missing Information** — gaps lead to guesses and assumptions
3. **Too Much Noise** — bloated context pushes you into the dumb zone

**Presenter note**: Keep coming back to the "smart zone" diagram throughout the session. For every feature you show, tie it back: *"This feature helps you stay in the smart zone because..."*

---

## Part 3 — Staying in the Smart Zone: Context Management Strategies (15 min)

**Goal**: Teach the practical techniques for managing context — from naive to advanced. This is the "how to cleverly avoid the dumb zone" section.

### Strategy 1: The Naive Way — Work Until You Run Out

> **SLIDE**: *Diagram showing a single context window filling up: System Instructions → CLAUDE.md → Tools → User message → Read() → Search() → Write() → Assistant Message → User message: "NO do it XYZ way" → Read() → Search() → Write() → User message... Resteering in context: "NO use XYZ Approach"*

- Most people use AI this way: start a conversation, keep going until it breaks
- When the agent goes wrong, you try to redirect it mid-conversation
- Problem: the context is now full of wrong turns, failed attempts, and noise
- Resteering wastes context — the AI has to hold both the wrong approach AND your correction

### "You're absolutely right."

> That's what AI tells you when it knows it's screwing up. It's agreeing to get you off its back.
>
> When you hear this, it's time to start over.

### Strategy 2: Start Over vs Resteer

> **SLIDE**: *Two context windows side by side. Left: accumulated conversation with history. Right: fresh context with "Make sure you use XYZ approach" in the first message*

- Most people discover this pretty early in their AI exploration — sometimes it's better to just start fresh
- Instead of fighting a confused conversation, start a new one with a targeted prompt: "Same task, but this time use XYZ approach, and don't go down that other path"
- **When to start fresh**: switching tasks, agent is confused, finished a logical unit of work
- **When to continue**: iterating on the same feature, debugging something it just built, agent needs earlier context
- Use `@Past Chats` to reference previous work without dragging in the full history

### Strategy 3: Intentional Compaction

> **SLIDE**: *Diagram showing: Left side — long conversation with many tool calls → "Summarize progress to progress.md" → progress.md file. Right side — fresh context that reads progress.md and continues from where it left off*

- Whether you're on track or off track, you can take your existing context window and compress it down into a file
- Tell the agent: "Summarize everything we've done to progress.md"
- Include: the approach, steps completed, current problem, relevant files
- In the new conversation: "Read progress.md and continue from where we left off"
- The new agent gets straight to work instead of having to redo all the searching, file reading, and codebase understanding

### What Goes Into a Good Compaction

Things that eat up context (and should be compacted):
- Looking for files / exploring the codebase
- Understanding code flow
- Edits to files (diffs)
- Test/build output
- JSON tool responses (especially from MCPs)

### Example: A Good Compaction

> **SLIDE**: *Structured compaction showing: Component Usage Flow → Modal Path (Working) with numbered steps → Message Stream Path (Broken) with numbered steps → Code References with specific file:line references*

A good compaction is structured and specific:
- **What we're working on** — exactly what the task is
- **The exact files and line numbers** that matter to the problem
- **What works**: the known-good paths, with specific file names and line numbers
- **What's broken**: the specific failure, with the exact code path
- Think of it like a well-written bug report — precise enough that someone (or an AI) could pick it up and immediately start working

### Strategy 4: Subagents for Context Isolation

> **SLIDE**: *Diagram showing parent agent spawning a subagent — "Find where XYZ is handled (use a subagent)". The subagent runs in its own context window with Read(), Read(), Read(), Search(), List() calls. Returns a short result: "the file is in src/main/..." back to the parent agent*

- **Subagents are not for role-playing** (frontend agent, backend agent, QA agent). They are for **controlling context.**
- A subagent forks out a new context window that goes and does all the heavy reading, searching, and codebase understanding
- It returns a really succinct message back to the parent agent — "the file you want is here"
- The parent agent can read that one file and get straight to work
- The parent agent's context stays clean

**Example**: Instead of the main agent reading 20 files to understand authentication (filling up context), it spawns a subagent that reads all 20 files and returns a 10-line summary.

### The `/summarize` Command

- When a conversation gets long, use `/summarize` to compress the history
- Keeps important context, drops the noise
- Lets you keep working without starting over completely

**Demo flow**:
1. Show a conversation that's getting long
2. Run `/summarize` — show how context gets compressed
3. Show starting a new conversation with `@Past Chats` to carry forward key context

---

## Part 4 — The Research → Plan → Implement Workflow (15 min)

**Goal**: Teach the most effective workflow pattern for complex tasks. This builds on everything from Part 3 — it's frequent intentional compaction turned into a complete workflow. Your entire approach is built around staying in the smart zone.

### Frequent Intentional Compaction as a Workflow

- Don't wait until context is full to manage it
- Build your entire workflow around context management
- Three phases, each designed to start with fresh, focused context:

### Phase 1: Research

**Goal**: Understand how the system works. Find all relevant files. Stay objective.

- Use **Ask mode** (read-only) or a dedicated subagent
- Explore the codebase: how does the current feature work? What files are involved? What patterns does the codebase use?
- **Output**: A summary of findings — relevant files, code flow, architectural patterns
- This phase can consume a lot of context (reading many files) — that's fine, because we'll compact it before moving on

### Phase 2: Plan

**Goal**: Outline the exact implementation steps.

- Use **Plan mode** (`Shift+Tab` to switch)
- Take the research findings and create a detailed, step-by-step plan
- Include: **file names, line numbers, and actual code snippets** of what's going to change
- Be explicit about testing steps after every change
- The plan is a form of **compressed context** — it captures intent, relevant files, and approach in a small, reviewable document
- A well-written plan should be so clear that even a simple model could follow it without screwing up

**Plan mode workflow**:
1. Agent asks clarifying questions to understand your requirements
2. Researches your codebase to gather relevant context
3. Creates a comprehensive implementation plan
4. You review and edit the plan through chat or markdown files
5. Click to build the plan when ready

Plans are saved by default in your home directory. Click "Save to workspace" to move it to your workspace for team sharing.

### Phase 3: Implement

**Goal**: Go write the code.

- Start a **fresh conversation** with the plan
- If properly planned, the implementation is straightforward and expected
- **Keep context under 40%** — if you're running over, break the implementation into smaller chunks
- Each chunk: read the plan → implement that section → verify → move on

### Don't Outsource the Thinking

> **AI cannot replace thinking. It can only amplify the thinking you have done — or the lack of thinking you have done.**

- There is no perfect prompt. There is no silver bullet.
- This workflow only works if **you** read the research and **you** read the plan
- A bad plan doesn't just produce a few bad lines of code — it sends the model off in the wrong direction entirely
- You, the builder, need to be in back-and-forth with the agent, reading the plans as they're created
- If you need peer review, send the plan to someone: "Does this look right? Is this the right approach?"

### The Hierarchy of Leverage

> **SLIDE**: *Pyramid diagram from top to bottom:*
> - *1 Bad Line of Code == 1 Bad Line of Code*
> - *1 Bad Line of Plan == 10-100 Bad Lines of Code (Wrong Solution)*
> - *1 Bad Line of Research == 1000+ Bad Lines of Code (Misunderstanding the System)*
> - *1 Bad Line of Specification == 10000+ Bad Lines of Code (Wrong Problem)*
> - *1 Bad Line of Command/CLAUDE.md == 100000+ Bad Lines of Code (Core Infrastructure)*
>
> *Arrow: "Human Effort and Focus on the HIGHEST LEVERAGE parts of the pipeline"*

This is why the Research → Plan → Implement workflow matters:
- A mistake in your **rules/CLAUDE.md** (core infrastructure) cascades into 100,000+ lines of bad code
- A mistake in your **specification** (wrong problem) cascades into 10,000+ lines
- A mistake in **research** (misunderstanding the system) cascades into 1,000+ lines
- A mistake in the **plan** (wrong solution) cascades into 10-100 lines
- A mistake in **code** is just one line

**Your effort should focus on the highest-leverage parts of the pipeline** — the rules, the research, and the plan. The code is the cheapest thing to fix.

### When to Use Plan Mode vs Agent Mode

| Use Plan Mode | Use Agent Mode |
|---|---|
| Complex features with multiple valid approaches | Quick changes you've done before |
| Tasks that touch many files or systems | Simple, well-defined edits |
| Unclear requirements (need to explore first) | Iterating on something you already planned |
| Architectural decisions (review approach first) | Following an existing plan |

**Demo**: Use Plan Mode on the demo project. Show:
1. How the agent asks clarifying questions
2. How it researches the codebase
3. The resulting plan with file names and approach
4. Review/edit the plan
5. Start implementation in a fresh Agent mode conversation

---

## Part 5 — Teaching Cursor About Your Project (15 min)

**Goal**: Show how to give Cursor persistent knowledge about your codebase *before* you start a conversation. This is the "Core Infrastructure" layer from the Hierarchy of Leverage — the highest-leverage place to invest your effort.

### 5a — Rules (Project, User, Team)

Rules provide persistent instructions that shape how the agent works with your code. They're included at the start of every model context — always-on guidance.

| Type | Location | Scope | Who Manages |
|---|---|---|---|
| **Project Rules** | `.cursor/rules/` | This repo only | Version-controlled by team |
| **User Rules** | Cursor Settings | All your projects | You |
| **Team Rules** | Cursor Dashboard | All team members | Team admins |
| **AGENTS.md** | Project root or subdirs | This repo only | Version-controlled by team |

**Demo**: Show a `.cursor/rules/` folder with a few rules. Show how the agent's behavior changes with vs without them.

### 5b — Progressive Disclosure Pattern

- Don't dump everything into one giant rules file
- Put general rules at the root, specific ones in subdirectories
- The agent pulls in only what's relevant to where it's working

```
.cursor/
  rules/
    general.mdc          ← always loaded
    frontend.mdc         ← only when working in frontend/
    api.mdc              ← only when working in api/
    testing.mdc          ← only when writing tests
```

This keeps context small and focused — directly tied to staying in the "smart zone."

### 5c — Custom Commands

- Reusable workflows defined as markdown files in `.cursor/commands/`
- Type `/` in chat to trigger them
- Great for standardizing team processes:

```
.cursor/
  commands/
    review-code.md
    write-tests.md
    create-pr.md
    security-audit.md
    setup-new-feature.md
```

**Demo**: Show 2–3 example commands. Run `/review-code` or `/write-tests` to show the workflow.

### 5d — Skills

- Packaged domain-specific knowledge + scripts that agents can use on demand
- Portable, version-controlled, executable
- Agents discover skills automatically and use them when relevant
- Can also be manually invoked with `/` in Agent chat

**Demo**: Briefly show invoking a skill from the `/` menu.

---

## Part 6 — Dynamic Context & Extending Cursor (10 min)

**Goal**: Cover how to precisely control context during a conversation, plus the remaining powerful features — always tied back to context management.

### 6a — @ Mentions: Choosing What Goes Into Context

| Mention | What it does | When to use |
|---|---|---|
| `@Files & Folders` | Reference entire files or directories | When the agent needs full file context |
| `@Code` | Reference specific code sections | When you need precision (better than full files) |
| `@Docs` | Pull in documentation | When working with a library or API |
| `@Branch` | Context about your current work | "Review my changes" or "What am I working on?" |
| `@Past Chats` | Reference earlier conversations | When starting fresh but needing prior context |

- Use `@Code` over `@Files` when possible — more precise = less context waste

### 6b — MCP Servers

- MCP (Model Context Protocol) connects Cursor to external tools and data
- Instead of explaining your project repeatedly, integrate directly
- Examples: Figma MCP, database connections, internal documentation, CI/CD
- **Remember the too-many-MCPs problem**: each MCP adds tool definitions to context. Only enable what you need.

### 6c — Checkpoints & Git Worktrees

- **Checkpoints**: Automatic snapshots of the agent's changes. Use "Restore Checkpoint" to undo. Think of it as `Cmd+Z` for AI changes.
- **Git Worktrees**: Run multiple agents in parallel on different tasks, each in their own worktree. No branch-switching headaches.

### 6d — Debug Mode

For tricky bugs that are hard to reproduce or understand:
1. **Explore and hypothesize** — agent generates multiple hypotheses about root causes
2. **Add instrumentation** — adds log statements to a local debug server
3. **Reproduce the bug** — asks you to reproduce (keeps you in the loop)
4. **Analyze logs** — reviews collected logs for the actual root cause
5. **Make targeted fix** — focused fix based on runtime evidence
6. **Verify and clean up** — re-run reproduction steps, remove instrumentation

Uses runtime evidence, not guesses.

### 6e — Test-Driven Development

- Write tests first (or describe what you want tested), let the agent implement until tests pass
- The agent runs tests, reads failures, and iterates automatically
- Tests act as a **verifiable goal** — one of the strongest ways to guide agent behavior

### 6f — Browser Integration

- Agent can control a web browser for testing, visual debugging, accessibility audits, design-to-code
- Full access to console logs and network traffic
- Screenshots integrated directly — agent *sees* the browser state as images
- Works without installing external tools

---

## Part 7 — The Bigger Picture & What's Next (10 min)

**Goal**: Zoom out. Now that the audience has the techniques, show the human side of AI adoption — the growing rift, why it exists, and why context engineering is the bridge. End with a forward-looking perspective.

### Key Takeaways

1. **Context is everything** — the quality of AI output is determined by the quality of what you put in
2. **Stay in the smart zone** — keep context under ~40%. Start fresh conversations often.
3. **Research → Plan → Implement** — this workflow keeps you in the smart zone across complex tasks
4. **Don't outsource the thinking** — AI amplifies your thinking, it doesn't replace it. Focus your effort on the highest-leverage parts: rules, research, and plans.
5. **Use progressive disclosure** — layer rules from general to specific
6. **Use subagents for context isolation** — let them do the heavy reading, keep your main context clean
7. **Plan with a smart model, build with a fast one** — use `Cmd+/` to switch
8. **Share context with your team** — project rules, commands, and skills are all version-controlled

### Plan vs Build Model Strategy

| Phase | Model Choice | Why |
|---|---|---|
| Research | Smart/expensive model | Needs deep reasoning to understand the system |
| Planning | Smart/expensive model | Needs to make good architectural decisions |
| Implementation | Fast/cheap model | Following a well-defined plan is straightforward |

### The Growing Rift

> **SLIDE**: *Graph showing "Love AI" vs "Hate AI" — Mid-Level engineers trending upward, Senior+ engineers trending downward over time*

Now that you understand context engineering, this rift makes perfect sense:

- Mid-level and junior engineers are adopting AI rapidly — it fills knowledge gaps and speeds them up
- Senior/Staff/Principal engineers are slower to adopt, or actively resisting
- Both sides are partly right

> **SLIDE**: *"Junior/Mid-level engineers use a lot of AI — It fills in some skill gaps — But it also produces some slop"*

- Junior/Mid-level engineers get immediate value — AI fills knowledge gaps
- But without deep understanding, they accept more "slop" (low-quality, subtly wrong code)
- Faster output, but not always better output

> **SLIDE**: *"Staff/Principal Engineers don't adopt AI because without reps it doesn't make them that much faster"*

- Senior+ engineers already know the patterns — AI doesn't fill a gap for them
- They work in the biggest, most complex brownfield codebases — where AI struggles most without proper context
- Without investing time to learn context engineering, AI genuinely doesn't help much
- The senior engineers end up hating it more every week because they're cleaning up slop shipped by Cursor the week before
- This is not AI's fault. This is not the mid-level engineer's fault. It's a skills gap.
- The key insight: **AI requires reps (practice) to become useful.** It's a skill, not a magic button. Pick one tool and get some reps.

### The Bridge

- The gap between "AI skeptics" and "AI enthusiasts" is really a **skills gap in context engineering**
- Everything we covered today — the smart zone, compaction, rules, the research-plan-implement workflow — that's the bridge
- Once you master context engineering, AI becomes genuinely useful even in the largest, most complex codebases

### What's Next

> **SLIDE**: *"What's Next — Coding Agents Will Be Commoditized — Team/Workflow Transformation will be the hard part — If you can't figure this out, you're hosed"*

- The AI tools themselves will become commoditized — every IDE will have agents
- **The hard part is the transformation**: changing how teams work, how you plan, how you review
- The engineers and teams who figure out **context engineering** and **workflow transformation** will pull ahead
- This isn't about using AI more — it's about using it *better*

### Resources

- [Cursor Docs – Agent Best Practices](https://cursor.com/blog/agent-best-practices)
- [Cursor Docs – Rules](https://cursor.com/docs/context/rules)
- [Cursor Docs – MCP](https://cursor.com/docs/context/mcp)
- [Cursor Docs – Subagents](https://cursor.com/docs/context/subagents)
- [Cursor Docs – Plan Mode](https://cursor.com/docs/agent/modes#plan)
- [Cursor Docs – Debug Mode](https://cursor.com/docs/agent/modes#debug)
- [How I Use Cursor + Best Tips](https://www.builder.io/blog/cursor-tips)
- [Common Agent Workflows](https://cursor.com/docs/cookbook/agent-workflows)

**Presenter note**: The rift section lands much harder here. The audience has spent 80 minutes learning context engineering — now when you show the rift, they immediately connect the dots: "Oh, *that's* why senior engineers are frustrated. They're working in brownfield and nobody taught them this." It becomes a call to action, not just an observation.

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

**Note**: Timeline adds to ~90 min. If running tight on time, trim Part 6 demos — those sections can be more "show and tell" than deep dives.

---

## Slide Reference Guide

Quick reference for which slide/image goes where:

| Section | Slide | Image File |
|---|---|---|
| Part 1 — Greenfield Illusion | Greenfield vs Brownfield comparison | *NEW SLIDE NEEDED* |
| Part 1 — Why | "The bigger and more complex the codebase..." | *NEW SLIDE NEEDED* |
| Part 2 — Smart Zone | Context window zones diagram | `SCR-20260213-pbmm.png` |
| Part 2 — Noise | "The more you use the context window..." | `SCR-20260213-pbdz.png` |
| Part 2 — Too Many MCPs | MCP tools filling context | `SCR-20260213-pbvs.png` |
| Part 3 — Naive Way | Work until context runs out | `SCR-20260213-oxdy.png` |
| Part 3 — Start Over | Fresh context vs resteer | `SCR-20260213-oxqz.png` |
| Part 3 — Compaction | Intentional compaction diagram | `SCR-20260213-oyfq.png` |
| Part 3 — Good Compaction | Structured compaction example | `SCR-20260213-ozhq.png` |
| Part 3 — Subagents | Managing context with subagents | `SCR-20260213-pctt.png` |
| Part 4 — Hierarchy | Hierarchy of Leverage pyramid | `SCR-20260213-piqm.png` |
| Part 4 — Workflow | Research → Plan → Implement | `SCR-20260213-pjll.png` |
| Part 7 — Growing Rift | Love AI vs Hate AI graph | `SCR-20260213-pkgb.png` |
| Part 7 — Junior/Mid-level | "fills in some skill gaps / produces some slop" | `SCR-20260213-pkdn.png` |
| Part 7 — Senior+ | "without reps it doesn't make them that much faster" | `SCR-20260213-pkap.png` |
| Part 7 — What's Next | "Coding Agents Will Be Commoditized" | `SCR-20260213-pjll.png` |

---

## Notes for Presenter

- **The flow mirrors a natural narrative arc**: Problem → Why it happens → How to fix it (strategies) → The complete workflow → Setting up your project → Tools & features → The bigger picture. Each part builds on the last.
- **Start with the greenfield-vs-brownfield gap, not the rift.** This is the universal experience — everyone has felt it. It immediately builds credibility and frames the entire session as solving a real problem.
- **The "smart zone" diagram is the anchor.** Keep coming back to it: *"This feature helps you stay in the smart zone because..."*
- **The Hierarchy of Leverage is the second anchor.** When talking about rules, plans, or research, point back to the pyramid: *"This is why we spend time here — one bad line at this level cascades into thousands of bad lines of code."*
- **Save the rift for the end.** After 80 minutes of techniques, the rift becomes an "aha moment" — the audience connects the dots themselves. "Oh, that's why senior engineers are frustrated. They work in brownfield. Nobody taught them context engineering."
- **Don't live-code a full app.** Use the demo project as a playground to show individual concepts.
- **Show, don't tell.** For each concept, either demo it live or show a screenshot.
- **Acknowledge the diversity.** Frontend, backend, QA — the context management principles are the same regardless of stack.
- **Leave room for questions.** The audience cares about *their* codebases. Be ready for "how would I do this in my project?" questions.
- **The compaction example matters.** Show the "good compaction" slide and walk through why it's structured that way. People need to see what "good" looks like.
- **End on transformation, not features.** The last slide ("Coding Agents Will Be Commoditized") reframes the whole session: this isn't about Cursor specifically, it's about changing how you work.
