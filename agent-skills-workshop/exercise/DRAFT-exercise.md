# DRAFT — Hands-on exercise: build your first Skill (30 min)

> PROTOTYPE — throwaway draft for reaction, not final copy. Ticket 04.

## Setup (before the clock starts)

- Agent with Skill support open (Cursor / Claude Code / equivalent), wifi on.
- You have `my-first-skill/SKILL.md` skeleton (in this folder) — copy it into your agent's skills directory.

## Steps

### 1. Pick your task (3 min)

Choose ONE — relevance beats ambition:

- **A — Voice check.** Your product's error/empty-state copy against 3 voice rules you write.
- **B — Crit checklist.** Your team's top-5 design-review checks (a11y, spacing, hierarchy…) as a repeatable pass.
- **C — Research synthesis.** Turn raw interview notes into a fixed readout format you actually use.

### 2. Write the Skill (12 min)

Fill the skeleton:

1. `name` — lowercase-hyphens, matches folder.
2. `description` — what it does + **when to use it** (this is the trigger; spend half your time here).
3. Body — 5 steps max: input → checks → output format → one example → when NOT to trigger.

### 3. Test loop (10 min)

- Run it on a real sample from your work. Twice.
- After run 1: fix the `description` trigger (most failures live here).
- After run 2: tighten one body step.

### 4. Share (5 min)

Show neighbor: your trigger sentence + before/after output. One thing you'd change with 10 more minutes.

## Success criteria

- [ ] Skill triggers on your task without you forcing it.
- [ ] Output is something you'd actually keep or forward.
- [ ] You can state one case where it should NOT trigger.

## Fallback ladder (if setup fails)

1. Pair with neighbor — drive while they type.
2. Skip building: take the pre-baked `my-first-skill/` example, test and critique its trigger instead.
3. Paper mode: fill the skeleton on paper; test after the workshop.
