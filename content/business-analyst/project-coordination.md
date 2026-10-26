Many BA roles include project coordination: juggling several initiatives, reporting status, tracking risks and helping people adopt change. This chapter gives you the standard tools and words for that work.

## Juggling several initiatives

> **In short:** One list, clear priorities, protected focus time.

When you support several projects at once, the risk is that everything gets a little attention and nothing gets finished. Practical habits:

- **One master tracker** — every initiative, its next milestone, owner, status and your next action, in one place (a Jira board, Excel or Smartsheet).
- **Prioritize by impact and deadline** — use the **Eisenhower matrix**: urgent and important (do now), important but not urgent (schedule), urgent but not important (delegate or batch), neither (drop).
- **Timebox** — block focus time for deep work like requirements writing; batch emails and quick questions.
- **Weekly planning** — every Monday, review deadlines across all projects and agree trade-offs early.
- **Make conflicts visible** — if two sponsors both need you on the same day, tell them and let the priority be decided, rather than quietly missing one.
- **Keep good notes** — decisions, open questions and action items for each project, so you can switch context quickly.

> **Interview tip:** "How do you handle competing priorities?" — Describe your tracker, how you rank work (business impact, deadlines, dependencies), how you communicate trade-offs to stakeholders, and an example of a time you renegotiated a deadline early instead of missing it.

## Status reporting and RAG

> **In short:** Tell people what's done, what's next, and what needs their help.

A good **status report** is short and decision-focused. A common structure:

1. **Overall status** — RAG color plus one sentence.
2. **Achievements this period.**
3. **Plans for next period.**
4. **Key risks and issues**, with owners and actions.
5. **Decisions or help needed** from the reader.
6. **Milestones** — planned versus forecast dates.

### RAG status

- **Green** — on track for scope, schedule and budget.
- **Amber** — at risk; problems exist but a recovery plan is in place or a decision is needed.
- **Red** — off track; the plan will be missed without intervention or escalation.

Be honest. A project that is "green, green, green… red" surprises leaders and destroys trust. **"Watermelon reporting"** — green on the outside, red inside — is a well-known anti-pattern. Raising amber early is a sign of professionalism.

### Write for the reader

Executives read the first three lines. Put the status and any ask at the top; details go below. Use numbers ("UAT 82% complete, 3 high-severity defects open") instead of adjectives ("testing is going well").

## The RAID log

> **In short:** Track Risks, Assumptions, Issues and Dependencies in one place.

A **RAID log** is a simple table that every project should keep:

| Type | Definition | Example |
| --- | --- | --- |
| **Risk** | Something that *might* happen and would affect the project | The vendor may deliver the interface late |
| **Assumption** | Something believed true but not confirmed | Test data will be available by 1 May |
| **Issue** | Something that *has* happened and needs action now | The test environment is down |
| **Dependency** | Something the project relies on from someone else | Needs the security team's approval |

Some teams use **D** for **Decisions** instead of dependencies (and track dependencies separately).

The key difference: **a risk is in the future; an issue is happening now.** When a risk happens, it becomes an issue.

Each entry has an **ID, description, owner, date raised, impact, action and status**. Review the log in every project meeting — a RAID log that nobody reads is useless.

## Managing risk

> **In short:** Assess how likely and how bad, then choose a response.

### Assess

Score each risk on **probability** (how likely) and **impact** (how bad), often 1–5. **Risk score = probability × impact.** A probability of 4 and an impact of 5 gives a score of 20 — a high risk. Plot scores on a **heat map** to show the top risks.

### Respond (for threats)

- **Avoid** — change the plan so the risk can't happen (drop the risky feature).
- **Mitigate (reduce)** — lower the probability or impact (start vendor testing early).
- **Transfer** — move the impact to a third party (insurance, a fixed-price contract).
- **Accept** — acknowledge it and do nothing now, possibly with a contingency plan; used for low risks or when the response costs more than the risk.
- **Escalate** — the risk is outside the project's authority, so pass it to the right level.

### Respond (for opportunities, positive risks)

**Exploit, enhance, share, accept.**

A **contingency plan** is what you'll do *if* the risk happens. A **trigger** is the warning sign that it is about to happen.

## Dependencies and escalation

> **In short:** Know what you're waiting for, and escalate early with options.

### Dependencies

- **Internal** — between tasks in your project (testing depends on build).
- **External** — on other teams, vendors or projects (the payments team's API).
- **Finish-to-start** is the most common type: B can't start until A finishes.

For each external dependency, agree a date and owner with the other team, and check in before the date — not after.

### Escalation

Escalation is not complaining; it's asking someone with more authority to make a decision or remove a blocker. Escalate when:

- The issue threatens a milestone, budget or quality, **and**
- You can't solve it at your level, **and**
- You've tried the direct route first.

A good escalation is short: *"Problem: X. Impact: Y (date at risk). What we've tried: Z. Options: A or B. Recommendation: A. Decision needed by: Friday."* Bringing options, not just problems, makes escalations effective.

## Communication planning

> **In short:** The right message, to the right people, in the right way, at the right time.

A **communication plan** lists, for each stakeholder group:

| Audience | What they need | Format | Frequency | Owner |
| --- | --- | --- | --- | --- |
| Sponsor and steering committee | Status, risks, decisions | One-page report + meeting | Monthly | PM / BA |
| Project team | Tasks, blockers | Stand-up | Daily | Scrum Master |
| Business users | What's changing for them, training dates | Email, demos | At milestones | BA |
| Audit / compliance | Control changes, evidence | Formal review | As needed | BA |

The plan connects to stakeholder analysis: "manage closely" stakeholders get frequent, two-way communication; "monitor" stakeholders get occasional broadcasts.

## Organizational change management

> **In short:** A new system only delivers value if people actually change how they work.

**Change management** is the people side of change. Many projects deliver working technology that nobody adopts. BAs help because they understand who is affected and how.

### ADKAR (Prosci)

Individuals move through five stages:

1. **Awareness** of the need for change.
2. **Desire** to participate and support it.
3. **Knowledge** of how to change.
4. **Ability** to implement the new skills and behaviors.
5. **Reinforcement** to sustain the change.

If adoption stalls, find the stage where people are stuck. Training (Knowledge) won't help someone who doesn't see why the change matters (Awareness, Desire).

### Kotter's 8 steps (summary)

Create urgency → build a guiding coalition → form a vision → communicate it → remove obstacles → create short-term wins → build on the change → anchor it in the culture.

### Practical BA contributions

- **Impact assessment** — who is affected, how much, and what changes for them (process, system, role, skills).
- **Training materials and sessions**, user guides and FAQs.
- **Change champions** — respected users in each team who help peers.
- **Feedback loops** after go-live to catch problems early.

> **Interview tip:** If you have teaching or training experience, use it here. Explaining a change, checking understanding and adapting to each learner are exactly the skills that help users adopt a new process.
