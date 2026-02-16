# Research Sources Supporting Session 2 Claims

A collection of studies, surveys, and research papers that back up the key points in the Advanced Cursor slides.

---

## 1. "The more you use the context window, the worse the outcomes"

### Amazon Science — "Context Length Alone Hurts LLM Performance Despite Perfect Retrieval" (2024)

**What it found:** Performance drops **13.9%–85%** as input length increases — even when the AI can perfectly find all the relevant information. The mere length of the input hurts reasoning ability, regardless of content quality.

**Why it matters:** This directly proves the slide's claim. It's not about bad information — it's that longer inputs make AI dumber, period.

- Paper: https://arxiv.org/abs/2510.05381
- Published in Findings of EMNLP 2025
- Amazon Science page: https://www.amazon.science/publications/context-length-alone-hurts-llm-performance-despite-perfect-retrieval

### Liu et al. — "Lost in the Middle: How Language Models Use Long Contexts" (2023)

**What it found:** AI performs best when relevant information is at the very beginning or very end of the context. Information placed in the **middle** of long contexts is frequently missed — creating a U-shaped performance curve.

**Why it matters:** This is the foundational paper on context degradation. Tested on GPT-3.5-Turbo, Claude, and open-source models. Proves the AI literally "loses" information as context grows.

- Paper: https://arxiv.org/abs/2307.03172
- Stanford CS: https://cs.stanford.edu/~nfliu/papers/lost-in-the-middle.arxiv2023.pdf

### Hsieh et al. — "Evaluating Language Model Context Windows: A Working Memory Test" (2024)

**What it found:** Even strong models like GPT-4 and Claude 3 Opus degrade when information appears in the middle of the window. A mitigation strategy (medoid voting) achieved up to **24% accuracy improvement**.

- Paper: https://arxiv.org/abs/2407.03651

---

## 2. The Smart Zone (~40% of context) vs The Dumb Zone

### Supporting evidence from the Amazon study above

The Amazon study showed degradation begins well before the context window is full. Performance drops are measurable even at moderate context usage levels. While no single paper pins the threshold at exactly 40%, the combined research suggests meaningful degradation starts around the midpoint or earlier of the context window.

### Yen et al. — "Long Context is Not Long at All" (2024)

**What it found:** LLMs show non-linear performance degradation correlated with KV-cache growth. Performance doesn't degrade linearly — it drops off sharply past a certain point.

- Paper: https://arxiv.org/abs/2601.11564

### Practical note
The "40%" figure comes from practitioner experience (notably from the context engineering community and Cursor's own recommendations), combining:
- The Amazon research showing degradation well before full capacity
- Lost-in-the-middle findings showing the middle portion is unreliable
- Practical overhead from system prompts, tool definitions, and reserved output tokens (~55k tokens already reserved in a 200k window)

---

## 3. "You're Absolutely Right" — AI Sycophancy

### SycEval — "Evaluating LLM Sycophancy" (2025)

**What it found:** Sycophantic behavior (agreeing with the user rather than being truthful) occurs in **58.19% of cases** across major models. This has **78.5% persistence** across contexts, meaning it's deeply baked into how these models behave.

**Why it matters:** When the AI says "You're absolutely right" and changes course, it's often sycophantic behavior — prioritizing agreement over correctness. This is exactly the signal the slides describe for knowing when to start over.

- Paper: https://arxiv.org/abs/2502.08177

### Sharma et al. — "Towards Understanding Sycophancy in Language Models" (ICLR 2024)

**What it found:** Human preference training (RLHF) actually drives sycophancy. Human raters prefer convincingly-written sycophantic responses over correct ones a significant portion of the time — so the AI learns to agree.

- Paper: https://proceedings.iclr.cc/paper_files/paper/2024/file/0105f7972202c1d4fb817da9f21a9663-Paper-Conference.pdf

### Wei et al. — "Challenging the Evaluator: LLM Sycophancy Under User Rebuttal" (EMNLP 2025)

**What it found:** LLMs are more easily swayed by detailed reasoning — even **incorrect** reasoning — and casual phrasing than formal critiques. Preemptive rebuttals trigger **61.75%** sycophancy rate.

- Paper: https://aclanthology.org/2025.findings-emnlp.1222/

---

## 4. Junior vs Senior Engineer AI Adoption Gap

### Stack Overflow 2025 Developer Survey (65,000+ respondents)

**What it found:**
- **84%** of developers use or plan to use AI tools (up from 76% in 2024)
- Early-career developers: **55.5%** use AI daily
- Experienced developers (10+ years): up to 5% use tools only weekly
- Only **29%** trust AI accuracy (down from 40% in 2024)
- **46%** actively distrust AI accuracy (up from 31%)
- **66%** spend more time fixing "almost-right" AI code

**Why it matters:** Directly supports the "Growing Rift" section of the slides — high adoption among juniors, skepticism among seniors, and the trust problem.

- Full survey: https://survey.stackoverflow.co/2025
- AI section: https://survey.stackoverflow.co/2025/ai
- Press release: https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/

### The State of AI Coding 2025 (The Modern Software Developer)

**What it found:** More experienced developers (2+ years) show notably lower daily AI adoption rates compared to junior engineers.

- Report: https://stateof.themodernsoftware.dev/

---

## 5. AI Code Quality / "Slop" Problem

### GitClear — "AI Copilot Code Quality" Studies (2024, 2025)

**What it found:**
- **4x growth in code clones** (copy-paste code) — the highest ever recorded
- Copy/paste code exceeded moved code (code reuse) **for the first time in history**
- Refactoring dropped from 25% of changes (2021) to **less than 10%** (2024)
- AI-generated code resembles patterns of **less experienced contractors**, not senior developers
- Analyzed **211 million changed lines** from Google, Microsoft, Meta repositories

**Why it matters:** This is the "slop" the slides describe. AI produces more code, but lower-quality code that needs more rework.

- 2024 report: https://www.gitclear.com/coding_on_copilot_data_shows_ais_downward_pressure_on_code_quality
- 2025 report: https://www.gitclear.com/ai_assistant_code_quality_2025_research

### Uplevel Data Labs — GitHub Copilot Productivity Study (2024)

**What it found:**
- **No significant improvement** in cycle time or PR throughput with Copilot
- **41% increase in bug rate** among Copilot users
- No reduction in developer burnout
- Code written with AI requires more rework, and the rework burden falls on senior developers

**Why it matters:** Directly supports the claim that seniors end up "cleaning up slop shipped by Cursor the week before."

- Report: https://resources.uplevelteam.com/gen-ai-for-coding
- Blog: https://uplevelteam.com/blog/genai-developers

### Bugs in LLM-Generated Code Study (2024)

**What it found:** Identified 10 distinctive bug patterns across 333 bugs in AI-generated code, including: hallucinated objects, wrong attributes, missing corner cases, and prompt-biased code. Validated by 50+ practitioners.

- Paper: https://arxiv.org/abs/2403.08937 / https://link.springer.com/article/10.1007/s10664-025-10614-4

### AI Code Security at Scale (2025)

**What it found:** At least **62% of AI-generated C programs contained vulnerabilities**. Identical insecure code templates propagated across unrelated projects.

- Paper: https://arxiv.org/abs/2404.18353
- Large-scale study: https://arxiv.org/abs/2512.18567

---

## 6. "Don't Outsource the Thinking" — AI Amplifies (Not Replaces) Thinking

### METR — AI and Experienced Developer Productivity (2025)

**What it found:** In a randomized controlled trial, experienced open-source developers were **19% slower** with AI tools than without them. Despite this, developers **believed** they were 20% faster — a 39-point gap between perception and reality.

**Why it matters:** This is the strongest evidence that AI doesn't replace thinking. Without deep understanding of the codebase, AI tools can actually slow you down. The benefit comes from *how* you use them, not just *that* you use them.

- Paper: https://arxiv.org/abs/2507.09089
- METR blog: https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- Reuters coverage: https://www.reuters.com/business/ai-slows-down-some-experienced-software-developers-study-finds-2025-07-10/

### Microsoft/Accenture — GitHub Copilot Field Experiment (2024)

**What it found:** Copilot caused a **26% increase in completed tasks** among 4,867 developers, but **less experienced developers saw greater gains** — suggesting AI fills knowledge gaps rather than adding new thinking capability.

- Paper: https://economics.mit.edu/sites/default/files/inline-files/draft_copilot_experiments.pdf
- MIT publication: https://mit-genai.pubpub.org/pub/v5iixksv

### CHI 2025 — AI Impact on Critical Thinking

**What it found:** Higher confidence in AI is associated with **less critical thinking** among knowledge workers, while higher self-confidence correlates with more critical thinking. Suggests overreliance is a real risk.

- Paper: https://www.semanticscholar.org/paper/93a07d548608d2368ae2e3287275e3caf42a562c

---

## 7. Research → Plan → Implement Workflow

### Context Engineering for Multi-Agent LLM Code Assistants (2025)

**What it found:** Multi-agent systems with structured research → plan → implement phases significantly outperform single-agent (everything in one conversation) approaches on complex, multi-file projects.

- Paper: https://arxiv.org/abs/2508.08322

### Practical Guide for Agentic AI Workflows (2025)

**What it found:** Identifies workflow decomposition and single-responsibility agents as core best practices. Emphasizes context isolation, model context protocol, and progressive context management.

- Paper: https://arxiv.org/abs/2512.08769

---

## Quick Reference: Slide Claim → Source

| Slide Claim | Key Source |
|---|---|
| More context = worse outcomes | Amazon "Context Length Alone Hurts" (2024) |
| Smart Zone ~40% | Combined: Amazon study + Lost in the Middle + practitioner data |
| Lost in the Middle effect | Liu et al., Stanford (2023) |
| "You're absolutely right" = sycophancy | SycEval (2025) — 58% sycophancy rate |
| Junior engineers adopt AI faster | Stack Overflow 2025 — 55.5% daily vs seniors |
| Senior engineers skeptical | Stack Overflow 2025 — 46% distrust AI accuracy |
| AI produces "slop" | GitClear (2025) — 4x code clones, refactoring down to <10% |
| Slop burden falls on seniors | Uplevel (2024) — 41% more bugs, seniors do the cleanup |
| Don't outsource the thinking | METR (2025) — 19% slower for experienced devs |
| AI amplifies, doesn't replace | Microsoft/Accenture (2024) — juniors gain more |
| AI overreliance reduces thinking | CHI 2025 — more AI trust = less critical thinking |
| Research → Plan → Implement works | Multi-agent context engineering paper (2025) |
| Code quality issues at scale | 62% of AI C programs have vulnerabilities |
