# How to Write Great Cursor Rules

A Cursor Rules file is a set of instructions that helps the AI understand the patterns, best practices, and constraints specific to your project. A well-crafted rules file dramatically improves the quality and consistency of AI-generated code and reduces manual corrections.

---

## Quick Reference: Rule Types

Before writing your rules, choose the right **Rule Type** (set at the top of each `.mdc` file in `.cursor/rules/`):

| Rule Type         | When It Applies                                                                 | Best For                                                    |
| ----------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Always**        | Applied to every prompt, regardless of context                                  | Framework or language-wide guidelines                       |
| **Auto Attached** | Applied when files match specific glob patterns (e.g. `*.tsx`, `src/api/**`)    | Monorepos, targeted file types, feature-specific rules      |
| **Agent Requested** | AI decides whether to apply based on a description you provide               | Intent-based rules (e.g. "when writing tests")              |
| **Manual**        | Only applied when you explicitly attach the file to the AI context              | Rarely-used or situational rules                            |

---

## The 10 Principles

### 1. Choose the right rule type for your use case

Pick the rule type that matches how broadly or narrowly you want the rules applied. Use "Always" for universal standards, "Auto Attached" for file-pattern targeting, "Agent Requested" for smart intent matching, and "Manual" for on-demand rules.

### 2. Start with a high-level overview

Begin your rules file with a clear description of **what** the AI should achieve and **why**. This sets context and expectations before any specific instructions.

### 3. Specify essential code elements

Include anything you consider non-negotiable: SDK versions, required imports, error handling patterns, naming conventions, documentation requirements, etc.

### 4. Explicitly mark deprecated patterns

Show the AI what **not** to do. Provide examples of deprecated or outdated code, then show the correct replacement. Use strong, direct language like "NEVER use..." or "DO NOT...".

### 5. Create example patterns where possible

Use proper markdown formatting with clear headings, detailed descriptions, helpful code comments, and focused snippets. Include as many examples as needed to cover your use cases.

### 6. Include verification steps

End your rules with specific checks the AI must perform to validate its work. Explain what happens if verification fails (e.g. code won't compile, deploy will break, etc.).

### 7. Organize rules by category or feature

Group rules logically using clear markdown headings. For complex projects, consider splitting into multiple rules files covering different areas of your project.

### 8. Test your rules file thoroughly

Try a variety of prompts including edge cases and intentionally tricky requests. Watch how the AI handles deprecated functionality or ambiguous instructions, and refine your rules accordingly.

### 9. Include common pitfalls and solutions

Document frequent mistakes and their fixes so the AI avoids them from the start. If certain patterns or API combinations commonly cause issues, call them out explicitly.

### 10. Keep your rules file updated

Sync your rules with project, framework, or API changes. Outdated rules lead to deprecated code generation and extra manual work.

---

## Template

Copy and customize the template below for your own project. Replace all placeholder text in `[brackets]` with your actual content.

````markdown
---
description: [Short description of what these rules cover — used by "Agent Requested" type]
globs: [Optional glob patterns for "Auto Attached" type, e.g. "src/**/*.ts"]
alwaysApply: [true for "Always" type, false otherwise]
---

# [Project / Framework / Feature Name] — Cursor Rules

## Overview

[Provide a high-level description of what the AI should achieve when following these rules.
Explain the project context, the framework or tool being used, and the goal of the generated code.]

- **Project**: [Project name]
- **Framework / Tool**: [e.g. Next.js 15, Trigger.dev v3, Python FastAPI]
- **Language**: [e.g. TypeScript, Python]
- **SDK Version**: [e.g. @trigger.dev/sdk@3.x — be explicit]

---

## Essential Code Standards

### Required Imports & Setup

[List imports, boilerplate, or initialization code that must always be present.]

```typescript
// Example: Always import from the correct package version
import { task } from "@trigger.dev/sdk/v3";
```

### Naming Conventions

- [e.g. Use camelCase for variables and functions]
- [e.g. Use PascalCase for components and types]
- [e.g. Prefix all task IDs with the feature name: `billing-sync-invoice`]

### Error Handling

[Describe required error handling patterns.]

```typescript
// Example: Always wrap external API calls in try/catch
try {
  const result = await externalApi.call();
} catch (error) {
  // Log the error with context
  console.error("Failed to call external API", { error, context });
  throw error; // Re-throw to trigger retry logic
}
```

---

## Deprecated Patterns (DO NOT USE)

> **IMPORTANT**: The following patterns are outdated. NEVER use them.

### Deprecated: [Pattern Name]

```typescript
// DO NOT USE — this is the old way
import { oldFunction } from "old-package";
oldFunction({ legacyOption: true });
```

### Correct Replacement

```typescript
// USE THIS INSTEAD
import { newFunction } from "new-package";
newFunction({ modernOption: true });
```

---

## Code Examples

### Example 1: [Use Case Name]

[Describe what this example demonstrates and when to use this pattern.]

```typescript
// [Complete, working example with helpful comments]
```

### Example 2: [Use Case Name]

[Describe what this example demonstrates.]

```typescript
// [Another complete example covering a different scenario]
```

### Example 3: [Edge Case / Advanced Pattern]

[Describe the edge case this handles, such as retries, error recovery, or idempotency.]

```typescript
// [Example showing how to handle the edge case properly]
```

---

## Common Pitfalls

| Pitfall                          | Why It Happens                       | Correct Approach                      |
| -------------------------------- | ------------------------------------ | ------------------------------------- |
| [e.g. Using wrong SDK version]   | [AI defaults to older syntax]        | [Always specify v3 imports]           |
| [e.g. Missing error handling]    | [Not included in simple examples]    | [Wrap all API calls in try/catch]     |
| [e.g. Hardcoded config values]   | [Copied from example code]           | [Use environment variables instead]   |

---

## Verification Checklist

Before considering the code complete, the AI MUST verify:

- [ ] [e.g. All imports use the correct package and version]
- [ ] [e.g. Error handling is present around all external calls]
- [ ] [e.g. No deprecated patterns are used anywhere in the generated code]
- [ ] [e.g. Naming conventions are followed consistently]
- [ ] [e.g. The code compiles / passes type checking without errors]
- [ ] [e.g. Environment variables are used instead of hardcoded values]

> **If any check fails**: [Describe the consequence — e.g. "The task will fail at runtime",
> "The deployment will be rejected", "The integration will silently break".]

---

## Additional Notes

[Any extra context, links to documentation, or explanations of *why* certain patterns
are preferred. Helping the AI understand the reasoning leads to better decisions
when it needs to adapt examples to new situations.]
````

---

## Pro Tips

- **Be explicit about versions** — Specify exact SDK/framework versions to prevent the AI from mixing syntax across versions.
- **Use real-world examples** — Complete, working examples (not isolated snippets) help the AI understand how pieces fit together.
- **Address edge cases** — Include examples for error handling, retries, and failure scenarios to get more robust generated code.
- **Explain the "why"** — Brief explanations of why a pattern is preferred help the AI make better decisions when adapting to new situations.
- **Split large rule sets** — For complex projects, use multiple `.mdc` files in `.cursor/rules/` rather than one massive file. Each can target different file types or features.
- **Iterate and refine** — Treat your rules file like living documentation. After each session, note where the AI went wrong and update your rules to prevent it next time.
