Before anyone builds a solution, a BA must understand the real problem and whether solving it is worth the money. This chapter covers the classic thinking tools: root-cause analysis, gap analysis, SWOT, PESTLE and the business case.

## Problem versus symptom

> **In short:** Fix the cause, not the symptom.

A **symptom** is what people notice: "Month-end reports are always late." A **root cause** is the underlying reason that, if removed, stops the problem coming back: "Two source systems use different cut-off times, so data must be manually corrected every month."

If you only treat the symptom (for example, adding overtime at month-end), the problem returns next month. Root-cause analysis (RCA) finds the cause so the fix is permanent.

### A simple RCA routine

1. **Define the problem precisely** — what, where, when, how big. "In March, 1,240 breaks were older than 30 days, up from 610 in January."
2. **Collect data** — volumes, patterns, timing, examples.
3. **Find possible causes** — 5 Whys, fishbone diagram.
4. **Verify the cause with evidence** — don't stop at the first plausible story.
5. **Fix and monitor** — confirm the metric improves and stays improved.

## The 5 Whys

> **In short:** Keep asking "why?" until you reach a cause you can act on.

The **5 Whys** technique (from Toyota) asks "why?" repeatedly. Five is a guide, not a rule — stop when you reach a cause that is actionable and within your control.

**Problem:** Many transactions fail to auto-match.

1. *Why?* The reference fields don't agree.
2. *Why?* The bank's statement shows the reference in a different field from the ledger.
3. *Why?* The bank changed its statement format last quarter.
4. *Why didn't our rules adapt?* Matching rules are only reviewed once a year.
5. *Why?* There is no process to review rules when a counterparty changes its format.

**Root cause:** no change-trigger for matching-rule reviews. **Fixes:** add a rule for the new field now, and create a review step whenever a format change is announced.

### Pitfalls

- Stopping too early at a symptom.
- Blaming a person ("the analyst made a mistake") instead of the process that allowed the mistake.
- Following only one chain when several causes contribute — use a fishbone diagram for that.

## Fishbone (Ishikawa) diagram

> **In short:** A picture that sorts many possible causes into categories.

A **fishbone diagram** puts the problem at the "head" of the fish and possible causes on the "bones", grouped into categories. It's best done as a group brainstorm.

Common categories for manufacturing are the **6 Ms**: Methods, Machines, Materials, Manpower (People), Measurement, Mother Nature (Environment). For services and offices, teams often use **People, Process, Technology, Data, Policy, Environment**.

Example — **head of the fish (problem): high unmatched rate**

| Bone (category) | Possible causes |
| --- | --- |
| People | New staff not yet trained on matching rules |
| Process | No rule review after format changes; manual handoffs |
| Technology | Bank statement format changed; batch runs at the wrong time |
| Data | Missing or truncated references |
| Policy | Tolerance for small amount differences is unclear |

After brainstorming, **vote or use data** to pick the most likely causes, then verify them.

## Pareto analysis (80/20 rule)

> **In short:** A few causes usually create most of the problem — fix those first.

The **Pareto principle** says roughly 80% of effects come from 20% of causes. A **Pareto chart** is a bar chart of causes sorted from largest to smallest, with a line showing the cumulative percentage.

| Break reason | Count | Cumulative % |
| --- | --- | --- |
| Reference mismatch | 520 | 42% |
| Timing difference | 330 | 69% |
| Amount difference (fees) | 210 | 86% |
| Duplicate entry | 110 | 95% |
| Other | 60 | 100% |

Here the top three reasons cause 86% of breaks. Fixing them first gives the biggest improvement for the effort.

> **Interview tip:** Combining Pareto (which causes matter most) with 5 Whys (why each happens) is a strong, structured answer to "Tell me about a time you solved a recurring problem."

## Gap analysis

> **In short:** Where are we, where do we want to be, and what's in between?

**Gap analysis** compares the **current state** with the **desired future state** and lists what must change.

| Area | Current state | Future state | Gap | Action |
| --- | --- | --- | --- | --- |
| Matching | 70% automatic | 90% automatic | 20 points | New matching rules for top break reasons |
| Turnaround | 5 days average | 2 days | 3 days | Remove approval queue for low-value items |
| Skills | Two people know the rules | Whole team can maintain rules | Knowledge concentrated | Write procedure, train team |
| Reporting | Weekly spreadsheet | Daily dashboard | No automation | Build dashboard from source data |

The gaps feed straight into requirements, the change strategy and the business case. Look at gaps across **people, process, technology and data** — technology alone rarely closes a gap.

## SWOT analysis

> **In short:** Strengths and weaknesses are inside; opportunities and threats are outside.

**SWOT** reviews an organization, team or option:

| | Helpful | Harmful |
| --- | --- | --- |
| **Internal** | **Strengths** — e.g. experienced team, accurate data | **Weaknesses** — e.g. manual processes, old system |
| **External** | **Opportunities** — e.g. new payment standards, automation tools | **Threats** — e.g. new regulation, competitor, rising volumes |

The classic mistake is mixing internal and external: "New regulation" is a threat (external), not a weakness. "Our system can't meet the new regulation" is a weakness (internal).

Use SWOT early in strategy work, then turn it into actions: use strengths to grab opportunities, fix weaknesses that expose you to threats.

## PESTLE and other strategy tools

> **In short:** PESTLE scans the outside world for forces that affect your change.

**PESTLE** looks at six external factors:

- **Political** — government policy, trade, stability.
- **Economic** — interest rates, exchange rates, inflation, budgets.
- **Social** — demographics, customer behavior, culture.
- **Technological** — new tools, automation, AI, cyber risk.
- **Legal** — laws and regulations (data privacy, banking rules).
- **Environmental** — climate, sustainability reporting.

Other tools you may hear about:

- **Porter's Five Forces** — competitive pressure in an industry (rivals, new entrants, substitutes, buyer power, supplier power).
- **Business Model Canvas** — a one-page view of how a business creates and captures value (customers, value proposition, channels, revenue, costs…).
- **Benchmarking** — comparing your process or metrics with peers or best practice.
- **Balanced Scorecard** — measuring performance across financial, customer, internal process, and learning and growth perspectives.

## Business case and cost-benefit analysis

> **In short:** Is the change worth the money and the risk?

A **business case** justifies an investment. Typical sections:

1. **Problem or opportunity** — with evidence and size.
2. **Desired outcomes** — measurable objectives.
3. **Options** — always include **"do nothing"** as a baseline, plus two or three real options.
4. **Costs** — one-time (build, licenses, training) and ongoing (support, hosting).
5. **Benefits** — tangible (hours saved, fewer losses, revenue) and intangible (lower risk, better morale).
6. **Risks and assumptions.**
7. **Recommendation** and next steps.

### Key financial measures

- **ROI (Return on Investment)** = (Total benefit − Total cost) ÷ Total cost × 100%.
  *Benefits $300k, cost $200k → ROI = 50%.*
- **Payback period** — how long until cumulative benefits equal the cost.
  *Cost $200k, benefit $100k per year → payback = 2 years.*
- **NPV (Net Present Value)** — the value today of future cash flows minus the investment, using a discount rate. Money in the future is worth less than money today. **NPV > 0** means the project adds value at that discount rate.
- **IRR (Internal Rate of Return)** — the discount rate at which NPV equals zero. Compare it to the company's required return (the hurdle rate).

### Turning hours into money

A common BA calculation: *An automation saves 20 hours a week for 4 analysts. 20 × 52 = 1,040 hours a year. At a fully loaded cost of $40/hour, that's about $41,600 a year.*

## Feasibility and decision analysis

> **In short:** Can we do it, and which option is best?

### Feasibility types

- **Technical** — do we have, or can we get, the technology and skills?
- **Operational** — will people actually use it, and does it fit how we work?
- **Economic (financial)** — do benefits outweigh costs?
- **Schedule** — can it be done in time?
- **Legal / regulatory** — is it allowed?

### Decision matrix (weighted scoring)

When comparing options, score each against weighted criteria:

| Criterion | Weight | Option A: Vendor tool | Option B: Build in-house | Option C: Improve process only |
| --- | --- | --- | --- | --- |
| Cost | 30% | 3 | 2 | 5 |
| Time to deliver | 25% | 4 | 2 | 5 |
| Benefit | 35% | 5 | 4 | 2 |
| Risk | 10% | 4 | 2 | 4 |
| **Weighted score** | | **4.05** | **2.70** | **3.85** |

How the score is calculated (Option A): 3×0.30 + 4×0.25 + 5×0.35 + 4×0.10 = 0.90 + 1.00 + 1.75 + 0.40 = **4.05**.

A decision matrix makes the reasoning transparent, so stakeholders argue about weights and scores — which is a productive argument — rather than about opinions.
