# Effective Sub-Agents: A Practical Guide

## What Sub-Agents Actually Are

Sub-agents are **not** role-playing characters (a "frontend agent" or "backend agent"). They are **context isolation tools**. Think of them like sending an assistant to do research in another room — they come back with a summary instead of dumping all their notes on your desk.

Each sub-agent gets its own context window (its own "desk space"). The heavy, messy work of reading files, running commands, and exploring code stays in their window. Your main conversation stays clean and in the **smart zone**.

---

## The Golden Rule

> **A sub-agent should exist to protect your main context window from noisy, token-heavy work — not to give a task a fancy title.**

If the task is quick and simple, just do it in the main agent. If it generates a lot of intermediate output (reading many files, running tests, exploring code), that's when a sub-agent earns its keep.

---

## File Format

Sub-agent files live in `.cursor/agents/` (for the current project) or `~/.cursor/agents/` (for all your projects). Each file is a Markdown file with YAML frontmatter at the top:

```markdown
---
name: my-agent-name
description: When to use this agent. Be specific.
model: fast
---

The prompt body goes here. This is the instruction set the sub-agent follows.
```

---

## Anatomy of an Effective Sub-Agent File

Get these things right, **in this order**, and your sub-agent will perform well.

### 1. Name (Required to be useful)

- Use lowercase letters and hyphens only (e.g., `code-reviewer`, `test-runner`)
- Make it obvious what the agent does from the name alone
- This is what you type after `/` to invoke it (e.g., `/code-reviewer`)

**Good**: `security-auditor`, `api-tester`, `migration-planner`
**Bad**: `helper`, `agent-1`, `my-thing`

### 2. Description (Most Important Field)

This is how the main agent decides whether to delegate work to your sub-agent. A vague description means your agent never gets used. A specific one means it gets triggered at exactly the right time.

**Write your description as if answering: "When exactly should this agent be called?"**

| Quality | Example |
|---------|---------|
| Bad | "Helps with code" |
| Okay | "Reviews code for issues" |
| Good | "Reviews pull request changes for security vulnerabilities, performance regressions, and missing error handling. Use when code changes touch authentication, payment processing, or database queries." |

**Tips**:
- Include the phrase **"Use when..."** or **"Use proactively when..."** to give the main agent a clear trigger
- Mention specific file types, features, or scenarios
- If you want it used automatically, say so: "Use proactively" or "Always use for..."

### 3. Model Selection

| Value | What It Means | Best For |
|-------|---------------|----------|
| `inherit` | Uses whatever model the main agent is using | Most sub-agents (safe default) |
| `fast` | Uses a faster, cheaper model | Exploration, searching, simple validation |
| A specific model ID | Locks to one model | When you need a particular model's strengths |

**Rule of thumb**: Use `fast` for sub-agents that mostly read and search (like explorers or test runners). Use `inherit` for sub-agents that need to reason deeply (like planners or security auditors).

### 4. Optional Flags

- **`readonly: true`** — The sub-agent can't edit files. Good for reviewers, auditors, and explorers.
- **`is_background: true`** — The sub-agent runs without blocking. The main agent keeps working and checks back later. Good for long-running tasks like test suites.

### 5. The Prompt Body (The Instructions)

This is the main instruction set. Structure it like this, in this order:

#### a) Role Statement (1-2 sentences)
Tell the agent **who it is** and **what it specializes in**.

```markdown
You are a security expert who audits code for vulnerabilities before deployment.
```

#### b) Trigger Behavior (What to do when invoked)
A numbered list of steps the agent should follow. Keep it to **5-7 steps max**.

```markdown
When invoked:
1. Identify which files were changed
2. Check for common vulnerabilities (injection, XSS, auth bypass)
3. Verify no secrets are hardcoded
4. Review input validation and sanitization
5. Check error handling doesn't leak sensitive info
```

#### c) Output Format (What to return)
Tell the agent exactly how to structure its response. This is critical — the main agent needs to quickly parse what comes back.

```markdown
Report your findings as:
- **Critical** — Must fix before deploying
- **High** — Fix soon
- **Medium** — Address when possible
- **Clean** — No issues found (state this explicitly)
```

#### d) Boundaries (What NOT to do)
Prevent the agent from going off-track.

```markdown
Do not:
- Suggest architectural redesigns
- Fix issues yourself (report only)
- Review code style or formatting (that's not your job)
```

---

## Complete Example: A Well-Structured Sub-Agent

```markdown
---
name: verifier
description: Validates completed work by running tests and checking implementations. Use after tasks are marked done to confirm they actually work. Use proactively when implementation steps are completed.
model: fast
readonly: true
---

You are a skeptical validator. Your job is to verify that work claimed as complete actually functions correctly.

When invoked:
1. Identify what was claimed to be completed
2. Check that the implementation exists in the expected files
3. Run relevant tests or verification steps
4. Look for edge cases that may have been missed
5. Verify the feature works end-to-end, not just in isolation

Report your findings as:
- **Verified** — What was tested and confirmed working
- **Incomplete** — What was claimed but is missing or broken
- **Edge Cases** — Potential issues not yet addressed

Do not accept claims at face value. Test everything. If tests don't exist, say so explicitly.
```

---

## Ordering Checklist

When creating a new sub-agent, go through this checklist in order:

1. **Is a sub-agent the right tool?** If the task is quick and single-purpose, use a skill or slash command instead.
2. **Name** — Is it clear and descriptive? Would someone understand the purpose from the name alone?
3. **Description** — Does it specify *when* to use this agent? Does it mention specific scenarios or triggers?
4. **Model** — Does the task need deep reasoning (`inherit`) or is it mostly reading/searching (`fast`)?
5. **Flags** — Should it be read-only? Should it run in the background?
6. **Role statement** — Is it one focused sentence, not a paragraph?
7. **Steps** — Are there 5-7 clear, ordered steps? Not 15 vague ones?
8. **Output format** — Will the main agent know exactly how to read the response?
9. **Boundaries** — Have you told it what NOT to do?

---

## Common Patterns

### Explorer / Researcher
- **Purpose**: Understand a system before you change it
- **Model**: `fast` (lots of reading, light reasoning)
- **Flags**: `readonly: true`
- **Returns**: Summary of findings with file paths and code flow

### Verifier / Validator
- **Purpose**: Confirm that completed work actually functions
- **Model**: `fast`
- **Flags**: `readonly: true`
- **Returns**: What passed, what's broken, what's missing

### Test Runner
- **Purpose**: Run tests and report results
- **Model**: `fast`
- **Flags**: `is_background: true` (tests can take a while)
- **Returns**: Pass/fail counts, failure summaries, suggested fixes

### Planner
- **Purpose**: Create an implementation plan from research findings
- **Model**: `inherit` (needs deep reasoning)
- **Returns**: Step-by-step plan with file names, line numbers, and code snippets

### Security Auditor
- **Purpose**: Review code for vulnerabilities
- **Model**: `inherit` (nuanced reasoning required)
- **Flags**: `readonly: true`
- **Returns**: Findings by severity level

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | What to Do Instead |
|---|---|---|
| **Too many sub-agents** (10+) | The main agent can't decide which to use | Start with 2-3, add only when there's a clear gap |
| **Vague descriptions** | Agent never delegates to it | Be specific: "Use when X happens" |
| **Giant prompts** (1000+ words) | Slower, harder to maintain, dilutes focus | Keep under 300 words. Be direct. |
| **Role-play agents** ("frontend agent", "backend agent") | Sub-agents aren't for personas, they're for context isolation | Name them by *task*, not by *identity* |
| **Duplicating what the main agent does** | Adds overhead with no benefit | Only isolate work that generates noisy output |
| **No output format specified** | Returns are unpredictable and hard to parse | Always define the expected response structure |

---

## How Sub-Agents Fit Into the Workflow

Sub-agents are most powerful in the **Research** and **Verify** phases of the Research - Plan - Implement workflow:

1. **Research Phase** — Spawn an explorer sub-agent to read 20 files and return a 10-line summary. Your main context stays clean.
2. **Plan Phase** — The main agent uses the summary to create a focused plan (no sub-agent needed here usually).
3. **Implement Phase** — The main agent follows the plan. After each major step, spawn a verifier sub-agent to confirm the work.

This keeps your main conversation in the **smart zone** throughout the entire process.

---

## Quick Reference

```
.cursor/agents/my-agent.md    <-- project-level (shared with team)
~/.cursor/agents/my-agent.md   <-- user-level (personal, all projects)
```

**Invoke explicitly**: Type `/agent-name` followed by your instruction
**Invoke naturally**: "Use the verifier to check this works"
**Auto-delegation**: Write a good description and the main agent will use it on its own
