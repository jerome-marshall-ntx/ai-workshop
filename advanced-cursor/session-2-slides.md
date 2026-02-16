# Advanced Cursor: Context Engineering for Engineers

---

# The Problem

---

## The Greenfield Illusion

AI coding tools are incredible on greenfield projects — build a todo app, a landing page, a new API from scratch, and it feels like magic.

But try using AI on a 500k-line codebase with 10 years of history, custom patterns, and undocumented conventions — and it falls apart.

It uses the wrong patterns. It ignores your conventions. It doesn't know about the helper that already exists. It writes code that technically works but doesn't belong.

You ship a lot more code, but a lot of it is reworking the slop from last week.

---

## The bigger and more complex the codebase, the worse AI performs — unless you know why.

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

Today: the mental model and techniques that close the gap between greenfield magic and brownfield reality.

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

## The Smart Zone vs The Dumb Zone

The context window has a fixed size — typically 200k tokens, about 15,000 lines of code.

As it fills up, AI quality degrades.

- **The Smart Zone** — roughly the first 40% of context usage. AI performs well here.
- **The Dumb Zone** — beyond 40%. AI starts missing things, contradicting itself, producing lower quality output.

Additional reserved space: 23k tokens for auto-compaction, 32k tokens for AI output.

---

## The more you use the context window, the worse the outcomes you'll get.

This is not a model problem. It's a context management problem.

The same model that writes perfect code with focused context will produce slop with a bloated context window.

---

## What Fills Up Your Context

- File reads — every file the agent opens
- Search results
- Tool outputs — terminal commands, MCP responses
- Conversation history — your messages + AI responses
- System instructions, rules, MCP tool definitions

---

## The Too-Many-MCPs Problem

MCP servers are powerful, but each one adds tool definitions to every conversation.

Too many MCP servers means your context window is already 40% full before you even type your first message.

If you have too many MCPs, you are doing all your work in the dumb zone and you're never going to get good results.

The fix: only enable the MCPs you actually need for the current task.

---

## Optimize Your Context Window

Four things to optimize for:

1. **Correctness** — is the information accurate?
2. **Completeness** — does it have everything it needs?
3. **Size** — is it as small as possible while still complete?
4. **Trajectory** — is the conversation heading in the right direction?

---

## Trajectory Matters

If the AI did something wrong and you yelled at it, and it did something wrong again and you yelled at it again — the AI looks at this conversation and thinks: "the pattern here is I do something wrong, then the human yells."

So the next most likely thing is to do something wrong again.

Be mindful of your conversation trajectory. If it's going badly, starting fresh is better than correcting.

---

## Context Problems, Ranked

From worst to least bad:

1. **Incorrect Information** — wrong context leads to confidently wrong code
2. **Missing Information** — gaps lead to guesses and assumptions
3. **Too Much Noise** — bloated context pushes you into the dumb zone

---

# Staying in the Smart Zone

---

## Strategy 1: The Naive Way

Most people use AI this way: start a conversation, keep going until it breaks.

When the agent goes wrong, you try to redirect it mid-conversation: "NO, do it the XYZ way."

The problem: the context is now full of wrong turns, failed attempts, and noise. Resteering wastes context — the AI has to hold both the wrong approach AND your correction.

---

## "You're absolutely right."

That's what AI tells you when it knows it's screwing up.

It's agreeing to get you off its back.

When you hear this, it's time to start over.

---

## Strategy 2: Start Over vs Resteer

Instead of fighting a confused conversation, start fresh with a targeted prompt.

"Same task, but this time use XYZ approach — and don't go down that other path."

Two context windows:
- **Left**: accumulated conversation with wrong turns and corrections
- **Right**: fresh context with "Make sure you use XYZ approach" in the first message

Starting fresh with a targeted prompt often gets better results than resteering.

Use @Past Chats to carry forward what matters without dragging in the full history.

---

## When to Start Fresh vs Continue

**Start fresh when:**
- Switching tasks
- Agent is confused or making the same mistakes
- Finished a logical unit of work

**Continue when:**
- Iterating on the same feature
- Debugging something it just built
- Agent needs context from earlier

---

## Strategy 3: Intentional Compaction

Whether you're on track or off track, compress your context into a file before starting over.

1. Tell the AI: "Summarize everything we've done to progress.md"
2. Include: the approach, steps completed, current problem, relevant files
3. Start a new conversation: "Read progress.md and continue from where we left off"

The new agent gets straight to work instead of having to redo all the searching, file reading, and codebase understanding.

---

## What Eats Up Context

Things that fill your context window fast and should be compacted:

- Looking for files and exploring the codebase
- Understanding code flow
- File edits and diffs
- Test and build output
- JSON tool responses (especially from MCPs)

---

## A Good Compaction

A good compaction is structured and specific — like a well-written bug report:

- **What we're working on**: exactly what the task is
- **The exact files and line numbers** that matter to the problem
- **What works**: known-good paths with specific file names and line numbers
- **What's broken**: the specific failure with the exact code path

Precise enough that someone — or an AI — could pick it up and immediately start working.

---

## Strategy 4: Subagents for Context Isolation

Subagents are not for role-playing (frontend agent, backend agent).

They are for controlling context.

A subagent forks out a new context window that does all the heavy reading, searching, and codebase understanding. It returns a succinct message back to the parent: "the file you want is here."

The parent agent reads that one file and gets straight to work. Its context stays clean.

---

## The /summarize Command

When a conversation gets long, use /summarize to compress the history.

Keeps important context, drops the noise. Lets you keep working without starting over completely.

---

# The Workflow That Changes Everything

---

## Research → Plan → Implement

Build your entire workflow around context management. Three phases, each starting with fresh, focused context:

1. **Research** — understand the system
2. **Plan** — outline the exact steps
3. **Implement** — write the code

Goal: always stay in the smart zone.

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

- Use Plan mode (Shift+Tab to switch)
- Include file names, line numbers, and actual code snippets of what's going to change
- Be explicit about testing steps after every change
- The plan itself is compressed context — intent, files, and approach in a small document
- A well-written plan should be so clear that even a simple model could follow it without screwing up

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

## Don't outsource the thinking. AI cannot replace thinking. It can only amplify the thinking you have done — or the lack of thinking you have done.

---

## There Is No Perfect Prompt

- There is no silver bullet.
- This workflow only works if you read the research and you read the plan.
- A bad plan sends the model off in the wrong direction entirely.
- You, the builder, need to be in back-and-forth with the agent as plans are created.

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
- /security-audit
- /setup-new-feature

Stored in .cursor/commands/ — version-controlled and shareable.

---

## Skills

Packaged domain-specific knowledge and scripts that agents use on demand.

- Portable — works across projects
- Version-controlled — stored as files in your repo
- Executable — includes scripts agents can run
- Progressive — loads resources on demand, keeping context efficient

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
| @Branch | Context about your current work |
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

## Checkpoints & Git Worktrees

**Checkpoints** — automatic snapshots of the agent's changes. Use "Restore Checkpoint" to undo. Think of it as Cmd+Z for AI changes.

**Git Worktrees** — run multiple agents in parallel on different tasks, each in their own worktree. No branch-switching headaches.

---

## Debug Mode

For tricky bugs that are hard to reproduce or understand:

1. Explore and hypothesize — generates multiple theories about root causes
2. Add instrumentation — adds log statements to a debug server
3. Reproduce the bug — asks you to reproduce (keeps you in the loop)
4. Analyze logs — reviews collected logs for the actual root cause
5. Make targeted fix — focused fix based on runtime evidence
6. Verify and clean up — re-run steps, remove instrumentation

Uses runtime evidence, not guesses.

---

## Test-Driven Development

Write tests first, let the agent implement until tests pass.

- The agent runs tests, reads failures, and iterates automatically
- Tests act as a verifiable goal — one of the strongest ways to guide agent behavior
- Describe what you want tested. The agent figures out the implementation.

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

# The Bigger Picture

---

## Key Takeaways

1. **Context is everything** — AI output quality is determined by input quality
2. **Stay in the smart zone** — keep context under ~40%, start fresh often
3. **Research → Plan → Implement** — this workflow keeps you in the smart zone
4. **Don't outsource the thinking** — AI amplifies your thinking, it doesn't replace it. Focus on rules, research, and plans.
5. **Use progressive disclosure** — layer rules from general to specific
6. **Use subagents for context isolation** — heavy reading in subagents, clean main context
7. **Plan with a smart model, build with a fast one**
8. **Share context with your team** — rules, commands, and skills are version-controlled

---

## Plan with a Smart Model, Build with a Fast One

| Phase | Model Choice | Why |
|---|---|---|
| Research | Smart / expensive | Needs deep reasoning to understand the system |
| Planning | Smart / expensive | Needs to make good architectural decisions |
| Implementation | Fast / cheap | Following a well-defined plan is straightforward |

Use Cmd+/ to switch models between phases.

---

## The Growing Rift

Now that you understand context engineering, this makes perfect sense:

There's a widening gap in how engineers feel about AI coding tools.

Mid-level engineers are adopting AI rapidly — it fills knowledge gaps and speeds them up immediately.

Senior and Staff engineers are slower to adopt, or actively resisting.

Both sides are partly right.

---

## Junior & Mid-Level Engineers

Junior and mid-level engineers use a lot of AI.

It fills in some skill gaps.

But it also produces some slop.

Faster output, but not always better output. Without deep understanding, they accept more low-quality, subtly wrong code.

---

## Senior & Staff Engineers

Staff and Principal engineers don't adopt AI because without reps, it doesn't make them that much faster.

They already know the patterns. AI doesn't fill a gap for them.

They work in the biggest, most complex brownfield codebases — where AI struggles most without proper context.

The senior engineers end up hating it more every week because they're cleaning up slop shipped by Cursor the week before. This is not AI's fault. This is not the mid-level engineer's fault. It's a skills gap.

The key insight: AI requires practice to become useful. It's a skill, not a magic button. Pick one tool and get some reps.

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

## This isn't about using AI more. It's about using it better.

---

## Resources

- Cursor Docs — Agent Best Practices: cursor.com/blog/agent-best-practices
- Cursor Docs — Rules: cursor.com/docs/context/rules
- Cursor Docs — MCP: cursor.com/docs/context/mcp
- Cursor Docs — Subagents: cursor.com/docs/context/subagents
- Cursor Docs — Plan Mode: cursor.com/docs/agent/modes#plan
- Cursor Docs — Debug Mode: cursor.com/docs/agent/modes#debug
- How I Use Cursor + Best Tips: builder.io/blog/cursor-tips
- Common Agent Workflows: cursor.com/docs/cookbook/agent-workflows
