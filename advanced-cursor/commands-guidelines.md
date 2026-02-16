# Writing Effective Custom Commands: A Practical Guide

## What Commands Actually Do

Commands are **reusable workflows** you trigger by typing `/` in the chat input. They're like design templates — instead of recreating the same layout from scratch every time, you build it once and reuse it with a click.

Think of commands as saved recipes. You write down the steps once ("how to do a code review," "how to set up a new feature"), and every time you type `/code-review`, Cursor follows those steps. No more retyping the same instructions across conversations.

Without commands, you repeat yourself. With good commands, you type `/` and get consistent, reliable results every time.

---

## How Commands Differ from Rules and Sub-Agents

Before diving in, it helps to understand where commands fit:

| Feature | What It Does | Analogy |
|---|---|---|
| **Rules** | Persistent context loaded automatically into every conversation | Onboarding docs a new hire reads on day one |
| **Sub-Agents** | Specialized workers that run in isolation and return results | Sending an assistant to do research in another room |
| **Commands** | Reusable workflows triggered manually with `/` | A saved recipe you pull out when you need it |

Rules shape *how* the AI behaves. Sub-agents handle *where* work happens. Commands define *what* to do — step by step.

---

## Where Commands Live

Commands can be stored in three locations:

| Location | Path | Who It's For |
|---|---|---|
| **Project commands** | `.cursor/commands/` in your project root | Your project team — checked into git, shared with everyone |
| **Global commands** | `~/.cursor/commands/` in your home directory | You personally — available across all your projects |
| **Team commands** | Created in the Cursor Dashboard by admins | Your entire organization — automatically synced to all members |

When you type `/` in the chat input, Cursor pulls commands from **all three locations** and shows them in the autocomplete list.

---

## Creating Your First Command

1. Create a `.cursor/commands/` directory in your project root
2. Add `.md` files with descriptive names (e.g., `review-code.md`, `write-tests.md`)
3. Write plain Markdown content describing what the command should do
4. Type `/` in chat — your commands appear automatically

Here's what a typical commands folder looks like:

```
.cursor/
└── commands/
    ├── code-review.md
    ├── create-pr.md
    ├── run-tests-and-fix.md
    ├── setup-new-feature.md
    └── security-audit.md
```

**Naming tip**: Use lowercase letters and hyphens. The filename becomes the command name — `code-review.md` becomes `/code-review`. Make it obvious what the command does from the name alone.

---

## Anatomy of a Well-Structured Command

Commands are plain Markdown files — no special frontmatter required (unlike rules). But the **order and structure** of your content matters enormously. The AI reads top-to-bottom and pays the most attention to what comes first.

Here's the recommended order, from top to bottom:

### 1. Title & Overview (What is this command?)

Start with a clear heading and a 1-2 sentence description of what this command accomplishes. This grounds the AI before it reads the details.

```markdown
# Code Review Checklist
Review the current changes for bugs, security issues, and adherence to project conventions.
```

Keep this brief. The AI doesn't need a history lesson — it needs to know the goal.

### 2. Context & Scope (What should the AI focus on?)

Tell the AI what to look at and what's in scope. This prevents it from going too broad or too narrow.

```markdown
## Scope
- Review only staged or recently changed files
- Focus on logic, security, and error handling
- Don't review formatting or style (the linter handles that)
```

This is especially important because without scope, the AI might try to review your entire codebase or fixate on trivial issues.

### 3. Steps (What to do, in order)

The core of the command. Write a numbered list of clear, sequential steps. This is the "recipe" the AI follows.

```markdown
## Steps
1. Identify all changed files
2. For each file, check for:
   - Unhandled error cases
   - Security vulnerabilities (SQL injection, XSS, exposed secrets)
   - Missing input validation
   - Performance concerns (N+1 queries, unnecessary re-renders)
3. Check that new code follows existing patterns in the codebase
4. Verify test coverage for new functionality
5. Summarize findings with severity levels
```

**Tips for writing good steps:**
- Keep it to **5-8 steps** — more than that and the AI loses focus
- Each step should be a single, clear action
- Use sub-bullets for detail within a step, not extra top-level steps
- Order matters — put the most important checks first

### 4. Output Format (How should the AI respond?)

Tell the AI exactly how to structure its response. Without this, you get inconsistent, rambling output. With it, you get clean, scannable results.

```markdown
## Output Format
Organize findings by severity:

### Critical (must fix before merging)
- [file:line] Description of the issue

### Warning (should fix soon)
- [file:line] Description of the issue

### Suggestion (nice to have)
- [file:line] Description of the suggestion

### Summary
- Total issues found: X critical, Y warnings, Z suggestions
- Overall assessment: Ready to merge / Needs changes
```

This is one of the most impactful sections. A well-defined output format transforms a command from "sometimes useful" to "reliably useful."

### 5. Constraints & Boundaries (What NOT to do)

Prevent the AI from going off-track. Call out specific things the command should avoid.

```markdown
## Constraints
- Do NOT modify any files — this is a review only
- Do NOT flag style issues that the linter already catches
- Do NOT suggest complete rewrites — focus on targeted fixes
- Keep the review focused on the diff, not the entire codebase
```

### 6. Examples or References (Optional, but powerful)

If relevant, point to files or patterns in your codebase that represent the standard the AI should measure against.

```markdown
## References
- For our API pattern, see `src/app/api/users/route.ts`
- For our testing approach, see `src/components/UserCard/UserCard.test.tsx`
- For error handling conventions, see `src/lib/errors.ts`
```

---

## Content Order Checklist

When writing a new command, include sections in this order:

```
1. Title & Overview    — what this command does (1-2 sentences)
2. Context & Scope     — what to focus on, what's in/out of scope
3. Steps               — the ordered actions to perform (5-8 steps)
4. Output Format       — exactly how to structure the response
5. Constraints         — what NOT to do
6. References          — example files or patterns to follow (optional)
```

Not every command needs all six sections. A simple command might only need a title, steps, and output format. But when in doubt, follow the order above.

---

## Using Parameters

Commands accept additional context typed after the command name. Anything you type after `/command-name` is included as input to the command.

```
/code-review focus on the authentication changes in the auth/ directory
```

```
/create-pr this addresses ticket DX-523 and adds rate limiting
```

To write commands that work well with parameters, write your steps generically enough to apply to whatever context the user provides:

```markdown
# Create Pull Request
Create a well-structured pull request for the current branch changes.

## Steps
1. Run `git diff` to identify all changes on the current branch
2. Analyze the changes to understand what was added, modified, or removed
3. Draft a PR title that summarizes the change in one line
4. Write a PR description with:
   - A summary of what changed and why
   - Any breaking changes or migration steps
   - Testing notes
5. Create the PR using the `gh` CLI tool
```

The user can then type `/create-pr this fixes the login timeout bug from issue #42` and that extra context gets woven into the workflow naturally.

---

## Sizing Guidelines

| Guideline | Reason |
|---|---|
| Keep each command **under 200 lines** | Commands should be focused, not encyclopedic |
| Aim for **50-100 lines** per command | Long enough to be thorough, short enough to stay focused |
| **5-8 steps** in the Steps section | More than 8 and the AI starts losing the thread |
| Output format: **specific but not rigid** | Give structure without over-constraining |

---

## Writing Style That Works

Commands respond best to the same writing principles as rules:

- **Direct** — "Check for security vulnerabilities" not "You might want to look at security"
- **Specific** — "Run `npm test` and report failures" not "Make sure tests work"
- **Structured** — Numbered lists and bullet points over paragraphs
- **Action-oriented** — Every step should start with a verb: Check, Run, Identify, Create, Report

### Good Command Writing

```markdown
## Steps
1. Identify all changed files using `git diff --name-only`
2. Check each file for unhandled error cases
3. Verify input validation exists for all user-facing endpoints
4. Run the test suite and report any failures
5. Summarize findings by severity level
```

### Bad Command Writing

```markdown
## Steps
It would be good to start by looking at what files have changed. You can use git
for this. Then you should probably check for errors and things like that. Testing
is also important, so maybe run the tests too. At the end, let me know what you found.
```

The first version is 5 clear actions. The second is vague, wishy-washy, and leaves the AI guessing.

---

## Complete Example: A Well-Structured Command

```markdown
# Security Audit

Review the current codebase or recent changes for security vulnerabilities and compliance issues.

## Scope
- Focus on authentication, authorization, and data handling
- Check for common OWASP Top 10 vulnerabilities
- Review environment variable usage and secret management

## Steps
1. Identify files that handle authentication, user input, or database queries
2. Check for injection vulnerabilities (SQL injection, XSS, command injection)
3. Verify that all API endpoints require proper authentication
4. Check that sensitive data is not logged or exposed in error messages
5. Review environment variable usage — ensure no secrets are hardcoded
6. Check file upload handling for path traversal and size limits
7. Verify CORS configuration is restrictive, not permissive

## Output Format
### Critical Vulnerabilities
- [file:line] Description and recommended fix

### Potential Risks
- [file:line] Description and recommended mitigation

### Good Practices Found
- Brief notes on security measures already in place

### Summary
- Risk level: Critical / High / Medium / Low
- Number of issues found by category
- Top 3 priorities to address first

## Constraints
- Do NOT modify any files — report findings only
- Do NOT flag theoretical risks that require unlikely attack vectors
- Focus on actionable findings, not security theater
```

---

## Common Command Patterns

### Review / Audit Commands
- **Purpose**: Analyze code without changing it
- **Key section**: Output format with severity levels
- **Always include**: "Do NOT modify any files" in constraints

### Setup / Scaffold Commands
- **Purpose**: Create files, install dependencies, configure tools
- **Key section**: Ordered steps with specific file paths and contents
- **Always include**: Verification step at the end ("confirm everything works")

### Fix / Debug Commands
- **Purpose**: Find and resolve issues
- **Key section**: Steps that start with diagnosis before jumping to fixes
- **Always include**: "Explain what you changed and why" in output format

### PR / Git Workflow Commands
- **Purpose**: Automate pull request and version control workflows
- **Key section**: Clear parameters for what context the user will provide
- **Always include**: Safety constraints ("Do NOT force push", "Do NOT merge")

### Test Commands
- **Purpose**: Run tests, analyze failures, fix broken tests
- **Key section**: How to handle and report failures
- **Always include**: "Report results before making changes" in constraints

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | What to Do Instead |
|---|---|---|
| **No output format** | Responses are inconsistent and hard to scan | Always define how the response should be structured |
| **Too many steps** (15+) | AI loses focus partway through | Keep to 5-8 steps; split complex workflows into multiple commands |
| **Vague instructions** | AI guesses — and guesses wrong | Be specific: name tools, file paths, and exact actions |
| **No constraints** | AI goes off-track, modifies files it shouldn't | Always set boundaries for what's out of scope |
| **Giant catch-all commands** | One command trying to do everything | Create focused, single-purpose commands |
| **Duplicating what rules do** | Commands shouldn't encode project identity or conventions | Use commands for *workflows*, rules for *conventions* |

---

## Organizing Your Commands

Start small. A good starting set of commands for most projects:

```
.cursor/commands/
  code-review.md         ← Review changes before merging
  create-pr.md           ← Create a pull request with a proper description
  run-tests-and-fix.md   ← Run tests, diagnose failures, and fix them
  setup-new-feature.md   ← Scaffold files and boilerplate for a new feature
```

**Add commands as you notice patterns** — if you keep typing the same multi-step instruction in chat, that's a command waiting to be written.

---

## Quick-Start Template

Here's a minimal but effective template for creating a new command:

```markdown
# [Command Name]
[One sentence describing what this command does.]

## Scope
- [What to focus on]
- [What's out of scope]

## Steps
1. [First action]
2. [Second action]
3. [Third action]
4. [Fourth action]
5. [Report/summarize findings]

## Output Format
[How the response should be structured]

## Constraints
- [What NOT to do]
- [Boundaries and safety rails]
```

Start with this. Refine as you use the command and notice what's missing or what the AI gets wrong. Commands, like rules, are living documents — iterate on them.
