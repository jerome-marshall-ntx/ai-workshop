# Writing Effective Cursor Rules: A Practical Guide

## What Rules Actually Do

Rules are **persistent instructions** loaded at the start of every AI conversation. They're how you teach Cursor about your project, your team's conventions, and the way things should be done.

Think of rules like onboarding documentation for a new team member — except this team member reads them fresh every single morning. Rules solve the problem of having to repeat yourself: "No, we use snake_case here," "No, we have a utility for that already," "No, that's not how we structure components."

Without rules, every conversation starts from zero. With good rules, every conversation starts informed.

---

## Why Order Matters

Rules are injected at the **beginning** of the AI's context window. This is prime real estate — the AI pays the most attention to what comes first (and last). Information buried in the middle gets less weight.

This means:

1. **The most critical instructions should come first** — identity, constraints, hard requirements
2. **Supporting details come after** — patterns, examples, preferences
3. **Reference material goes last** — file paths, links, edge cases

If you put your most important rule at the bottom of a 400-line file, the AI is more likely to miss it than if it were at the top.

---

## The Anatomy of a Well-Structured Rule

Every effective rule follows a consistent structure. Here's the order, from top to bottom:

### 1. Frontmatter (Required for `.mdc` files)

The metadata that controls *when* and *how* the rule is applied. This is YAML between `---` markers at the very top of the file.

```yaml
---
description: "Standards for React components in the dashboard feature"
globs: "src/dashboard/**/*.tsx"
alwaysApply: false
---
```

| Field | Purpose | When to Use |
|---|---|---|
| `description` | Tells the AI when this rule is relevant | Always include — vague descriptions mean the rule never gets applied |
| `globs` | File patterns that trigger the rule | When the rule only matters for specific files or folders |
| `alwaysApply` | Whether to load in every conversation | Only for truly universal rules (project identity, hard constraints) |

**Choosing the right rule type:**

| Type | When to Use |
|---|---|
| Always Apply | Core project identity, universal constraints, team-wide conventions |
| Apply Intelligently | Domain-specific patterns — frontend, API, database, testing |
| Apply to Specific Files | File-type-specific rules — "when editing `.test.ts` files, use this pattern" |
| Apply Manually | Rarely used workflows — invoke with `@rule-name` when needed |

### 2. Project Identity (Who are we?)

Start with a brief statement of what this project is. This grounds the AI so it doesn't make generic assumptions.

```markdown
This is a B2B SaaS platform built with Next.js 14 (App Router), TypeScript, and Prisma.
The backend uses tRPC for type-safe APIs. The database is PostgreSQL.
```

Keep this to **2-4 sentences max**. The AI doesn't need your company history — it needs to know the tech stack and what kind of project this is.

### 3. Hard Constraints (What must always be true?)

These are non-negotiable requirements. The things that, if violated, break the build, violate compliance, or cause real problems.

```markdown
## Constraints
- NEVER commit secrets, API keys, or credentials to code
- ALL database queries must go through the repository layer — never query directly
- ALL user input must be validated with Zod schemas before processing
- NEVER use `any` type — use `unknown` with type guards instead
```

Use **NEVER**, **ALWAYS**, **MUST** — strong, unambiguous language. The AI responds well to clear boundaries.

### 4. Conventions & Patterns (How do we do things here?)

This is where you encode your team's way of doing things. These aren't hard constraints — they're "this is how we do it" guidelines.

```markdown
## Conventions
- Use `snake_case` for database columns, `camelCase` for TypeScript variables
- Components go in `src/components/` with a folder per component
- Each component folder contains: `ComponentName.tsx`, `ComponentName.test.tsx`, `index.ts`
- API routes follow REST conventions: `GET /api/users`, `POST /api/users`
- Error responses use the `AppError` class from `src/lib/errors.ts`
```

### 5. Canonical Examples (Show, don't just tell)

Point to real files in your codebase that represent the "right way" to do things. This is more effective than describing patterns in words.

```markdown
## Examples
- For a well-structured component, see `src/components/UserCard/UserCard.tsx`
- For the API route pattern, see `src/app/api/users/route.ts`
- For database queries, see `src/repositories/UserRepository.ts`
```

**Reference files, don't copy them.** Copying code into rules makes them long and they go stale when the code changes. A reference stays current.

### 6. What to Avoid (Common mistakes)

Call out the specific mistakes the AI keeps making in your project. These come from experience — add them as you notice patterns.

```markdown
## Avoid
- Don't create new utility functions — check `src/lib/utils/` first, we probably have one
- Don't use `fetch` directly — use the `apiClient` wrapper from `src/lib/api.ts`
- Don't add inline styles — use Tailwind classes
- Don't import from barrel files (`src/components/index.ts`) — import directly from the component
```

---

## Rule Content Order Checklist

When writing a new rule, include sections in this order:

```
1. Frontmatter          — when/how to apply this rule
2. Project Identity     — what this project is (brief)
3. Hard Constraints     — what must NEVER or ALWAYS happen
4. Conventions          — how things are done here
5. Canonical Examples   — reference files that show the right patterns
6. What to Avoid        — common AI mistakes in this project
```

Not every rule needs all six sections. A file-specific rule might only need frontmatter and conventions. A root-level rule might need all six. Use your judgment — but when in doubt, follow the order above.

---

## Rule File Organization

Use the **progressive disclosure pattern** — general rules at the top level, specific rules scoped to folders.

```
.cursor/rules/
  project.mdc              ← Always Apply — project identity & hard constraints
  code-style.mdc           ← Always Apply — universal conventions
  frontend/
    components.mdc         ← Glob: src/components/** — component patterns
    styling.mdc            ← Glob: **/*.css, **/*.tsx — styling conventions
  api/
    routes.mdc             ← Glob: src/app/api/** — API route patterns
    database.mdc           ← Glob: src/repositories/** — database patterns
  testing/
    unit-tests.mdc         ← Glob: **/*.test.ts — testing conventions
```

**Why this matters for context:** Every rule loaded takes up space in the AI's context window. If you dump everything into one massive `rules.mdc`, it fills up context even when 80% of it isn't relevant. Scoped rules mean the AI only loads what it needs — keeping you in the **smart zone**.

---

## Sizing Guidelines

| Guideline | Reason |
|---|---|
| Keep each rule **under 500 lines** | Long rules dilute focus and waste context |
| Aim for **100-200 lines** per rule | Short enough to be focused, long enough to be useful |
| Split large rules into **multiple composable rules** | Better scoping, easier maintenance |
| Total always-applied rules: **under 300 lines combined** | This is loaded in every conversation — keep it lean |

---

## Writing Style That Works

The AI responds best to rules that are:

- **Direct** — "Use X" instead of "You might want to consider using X"
- **Specific** — "Use `AppError` from `src/lib/errors.ts`" instead of "Use proper error handling"
- **Structured** — Bullet points and tables over long paragraphs
- **Example-driven** — "See `UserCard.tsx` for the pattern" over a 50-line description

### Good Rule Writing

```markdown
## API Routes
- All route handlers must validate input with Zod
- Use `withAuth()` wrapper for authenticated endpoints
- Return errors using `NextResponse.json({ error }, { status })`
- See `src/app/api/users/route.ts` for the standard pattern
```

### Bad Rule Writing

```markdown
## API Routes
When creating API routes, you should think about validation. It's important to validate
inputs properly. We generally prefer using Zod for this purpose, though there are other
options. Authentication is also something to keep in mind — we have a wrapper called
withAuth that can help with this. For error handling, try to be consistent with how we
return errors across the API.
```

The first version is 4 lines and crystal clear. The second is vague, wordy, and the AI has to guess what "think about" and "try to be consistent" actually mean.

---

## What NOT to Put in Rules

| Don't Include | Why | What to Do Instead |
|---|---|---|
| Entire style guides | The AI already knows common conventions; linters enforce the rest | Reference your linter config |
| Common tool commands | The AI knows `npm`, `git`, `pytest` | Only document non-obvious or custom commands |
| Edge cases that rarely apply | Dilutes focus, wastes context | Add them if you notice the AI hitting the edge case repeatedly |
| Copied code blocks | Goes stale, bloats the rule | Reference the file path instead |
| Obvious instructions | "Write clean code" adds nothing | Only include what the AI wouldn't know without being told |

---

## When to Add a Rule

**Add a rule when:**
- You've corrected the AI for the same mistake **3+ times**
- A new team member would need to be told this on their first day
- There's a project-specific pattern that contradicts common conventions
- You have a preferred approach that the AI wouldn't guess

**Don't add a rule when:**
- It's a one-time instruction (just say it in chat)
- Your linter or formatter already handles it
- It's standard practice the AI already knows

---

## Maintaining Rules

Rules are living documents. Treat them like code:

- **Version control them** — check `.cursor/rules/` into git
- **Review them periodically** — stale rules are worse than no rules
- **Update when patterns change** — if you refactored the error handling approach, update the rule
- **Delete rules that no longer apply** — outdated rules are incorrect context, the worst kind

---

## Quick-Start Template

Here's a minimal but effective starting point for a new project:

```markdown
---
description: "Core project rules and conventions"
alwaysApply: true
---

## Project
[Project name] is a [brief description] built with [tech stack].

## Constraints
- [Your most important constraint]
- [Your second most important constraint]

## Conventions
- [How you name things]
- [How you structure files]
- [How you handle errors]

## Examples
- For the standard pattern, see `[path/to/canonical/file]`

## Avoid
- [The mistake the AI keeps making]
```

Start with this. Add more rules as you notice the AI making repeated mistakes. Don't over-engineer rules before you understand your patterns — add them as you go.
