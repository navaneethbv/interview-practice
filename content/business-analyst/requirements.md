Writing clear requirements is the skill employers test most. This chapter gives you the vocabulary and templates to show it in an interview — and in a written exercise if they give you one.

## Types of requirements

> **In short:** Requirements go from business goals, to stakeholder needs, to solution functions and qualities, plus temporary transition needs.

BABOK classifies requirements into four types. Learn them in this order, from the top of the organization down to the system:

1. **Business requirements** — the goals, objectives and outcomes of the organization. *Why* are we doing this?
   *"Reduce aged reconciliation breaks by 40% within 12 months."*
2. **Stakeholder requirements** — the needs of a particular stakeholder or group. *What* do they need to achieve?
   *"Reconciliation analysts need to see all unmatched items for their accounts on one screen."*
3. **Solution requirements** — the capabilities and qualities the solution must have. Two sub-types:
   - **Functional requirements** — what the system must *do* (behaviors, functions, information it manages).
     *"The system shall automatically match transactions with the same amount, value date and reference."*
   - **Non-functional requirements (NFRs)** — how well the system must do it (quality attributes or constraints).
     *"The matching run shall complete within 15 minutes for 200,000 transactions."*
4. **Transition requirements** — temporary capabilities needed to move from the current state to the future state, no longer needed afterwards.
   *"Historical open breaks from the old system shall be migrated with their original age."* Training and data conversion are classic transition requirements.

### Common non-functional categories

| Category | Example |
| --- | --- |
| Performance | Search results within 2 seconds for 95% of requests |
| Availability | 99.9% uptime during business hours in all four regions |
| Security | Only users with the Reconciler role can approve write-offs |
| Usability | A new analyst can complete a match after 30 minutes of training |
| Scalability | Support 3× current transaction volume without redesign |
| Compliance / audit | Every manual match is logged with user, time and reason |
| Localization | Dates shown in the user's local format; supports AUD, NZD, SGD, HKD |
| Data retention | Records retained for 7 years |

### Business rules

A **business rule** is a specific policy or constraint that guides behavior and is independent of any system. *"Breaks older than 30 days must be escalated to the team lead."* Rules are often captured separately (in a rules catalog or decision table) because they change more often than functions.

> **Interview tip:** If asked "What is the difference between functional and non-functional requirements?", give a definition and an example of each from your own work. Examples make answers memorable.

## Requirements documents: BRD, FRD, SRS and use cases

> **In short:** Different documents serve different readers: business case, BRD, FRD, SRS, use cases and user stories.

Organizations package requirements in different documents. Names vary by company, but these are the common ones:

| Document | Purpose | Main audience | Typical content |
| --- | --- | --- | --- |
| **Business case** | Justify the investment | Sponsors, executives | Problem, options, costs, benefits, risks, recommendation |
| **BRD** – Business Requirements Document | State what the business needs | Business stakeholders, sponsor | Background, objectives, scope (in/out), stakeholders, business requirements, assumptions, constraints, success metrics |
| **FRD** – Functional Requirements Document | Describe what the system must do | Developers, testers, architects | Functional requirements, business rules, screens, data, interfaces, NFRs |
| **SRS** – Software Requirements Specification | Detailed technical specification (often IEEE-style) | Engineering | Functional and non-functional requirements in great detail |
| **Use case document** | Describe interactions between an actor and the system | Developers, testers | Actor, preconditions, main flow, alternate flows, exceptions, postconditions |
| **User stories + acceptance criteria** | Agile, lightweight requirements | Scrum team | Story, acceptance criteria, notes, attachments |

### A simple use case

**Use case:** Approve manual match
**Actor:** Reconciliation team lead
**Precondition:** An analyst has proposed a manual match.
**Main flow:**
1. Team lead opens the approval queue.
2. System shows proposed matches with amounts, dates and analyst comments.
3. Team lead selects a match and chooses Approve.
4. System records the approval and closes both items.
**Alternate flow 3a:** Team lead rejects the match → system returns the items to the analyst with a reason.
**Exception:** Amount difference above tolerance → system blocks approval and shows a warning.
**Postcondition:** Items are closed and the audit log is updated.

### Scope statement

Every BRD should say clearly what is **in scope** and **out of scope**. Out-of-scope lists prevent arguments later. *"In scope: Australia and New Zealand nostro accounts. Out of scope: securities reconciliations; changes to the general ledger."*

### Assumptions, constraints and dependencies

- **Assumption** — something believed true but not confirmed. *"The bank's statement feed will remain in MT940 format."*
- **Constraint** — a limit you must work within. *"Must go live before the financial year end."*
- **Dependency** — something the project relies on from elsewhere. *"Requires the treasury team's new account mapping."*

## User stories and the INVEST criteria

> **In short:** As a… I want… so that… — and a good story follows INVEST.

In agile teams, requirements are usually written as **user stories**:

> **As a** *(type of user)*, **I want** *(some goal)*, **so that** *(benefit / reason)*.

*As a reconciliation analyst, I want unmatched items older than 30 days highlighted in red, so that I can prioritize them before they breach SLA.*

The "so that" is the most important part: it records the value, and lets the team find a better solution if one exists.

### The three Cs

A user story is more than a sentence. Ron Jeffries described it as **Card** (the short written statement), **Conversation** (the discussion that fills in details) and **Confirmation** (the acceptance criteria that confirm it is done).

### INVEST — what makes a good story

| Letter | Meaning | Ask yourself |
| --- | --- | --- |
| **I** | Independent | Can it be built and delivered without waiting on other stories? |
| **N** | Negotiable | Is it a starting point for discussion, not a fixed contract? |
| **V** | Valuable | Does it deliver value to a user or customer? |
| **E** | Estimable | Does the team understand it well enough to estimate? |
| **S** | Small | Can it be completed within one sprint? |
| **T** | Testable | Can we write clear acceptance criteria to test it? |

### Epics, features and stories

- **Epic** — a large body of work, too big for one sprint. *"Automated reconciliation for APAC accounts."*
- **Feature** — a meaningful capability within an epic (used in SAFe and Azure DevOps). *"Rule-based auto-matching."*
- **Story** — a small, sprint-sized slice. *"Match on amount + date + reference."*
- **Task** — technical work needed to finish a story (developer level).

### Splitting large stories

Split big stories **vertically** (each slice delivers something usable end-to-end), not horizontally by technical layer. Common splitting patterns: by workflow step, by business rule, by data variation (one currency first), by user role, happy path first then exceptions, or simple version first then enhancements.

## Acceptance criteria and Gherkin

> **In short:** Acceptance criteria make a story testable; Given/When/Then is the most common format.

**Acceptance criteria** are the conditions a story must meet to be accepted. They make requirements testable and are the BA's best tool for reducing defects.

### Two common formats

**Rule-oriented (checklist):**

- Items older than 30 days are shown with a red indicator.
- Age is calculated in calendar days from the value date.
- The indicator updates when the screen is refreshed.

**Scenario-oriented (Gherkin / Given-When-Then):**

```text
Scenario: Item older than 30 days is highlighted
  Given an unmatched item with a value date 31 days ago
  When the analyst opens the unmatched items screen
  Then the item is shown with a red age indicator

Scenario: Item exactly 30 days old is not highlighted
  Given an unmatched item with a value date 30 days ago
  When the analyst opens the unmatched items screen
  Then the item is shown without a red indicator
```

- **Given** — the starting context (preconditions).
- **When** — the action or event.
- **Then** — the expected outcome.
- **And / But** — add more conditions to any step.

Gherkin is used by **BDD** (behavior-driven development) tools such as Cucumber, so well-written criteria can become automated tests.

### Writing great acceptance criteria

- Cover the **happy path**, **edge cases** (boundaries such as exactly 30 days) and **error cases**.
- Be specific and measurable — no "fast", "user-friendly" or "etc."
- Describe *what*, not *how* (avoid naming buttons and database tables unless they truly matter).
- Agree them with the product owner and testers *before* development starts.

### Definition of Done versus acceptance criteria

**Acceptance criteria** are specific to one story. The **Definition of Done (DoD)** applies to every story (for example: code reviewed, tests passed, documentation updated, deployed to test). We'll cover this in the Agile chapter.

> **Interview tip:** When you claim a result such as "fewer requirement defects", say *how* you achieved it: for example, writing acceptance criteria for boundary and exception cases, reviewing them with QA before development, and adding examples and data to each requirement.

## Characteristics of a good requirement

> **In short:** Good requirements are clear, atomic, testable and free of vague words like 'fast' or 'easy'.

BABOK lists quality characteristics. A good requirement is:

- **Atomic** — one requirement per statement (no "and" joining two needs).
- **Complete** — enough detail to build and test it.
- **Consistent** — doesn't conflict with other requirements.
- **Concise** — no unnecessary words.
- **Feasible** — can be achieved within constraints.
- **Unambiguous** — only one interpretation.
- **Testable** — you can prove whether it has been met.
- **Prioritized** — its importance relative to others is known.
- **Understandable** — written in language the audience understands.

### Ambiguous words to avoid

*fast, user-friendly, easy, flexible, robust, efficient, approximately, as appropriate, support, handle, etc., and/or, normally, minimize, maximize.*

| Weak | Strong |
| --- | --- |
| The system should be fast. | Search results shall appear within 2 seconds for 95% of searches. |
| The report should support all currencies. | The report shall display AUD, NZD, SGD and HKD amounts with their ISO currency codes. |
| Users should be able to handle exceptions easily. | An analyst shall be able to assign an exception to a reason code in no more than two clicks. |

Use **"shall"** (or "must") for mandatory requirements and avoid "should" if your organization treats "should" as optional.

### Reviewing requirements

Techniques for checking quality: **peer review**, **walkthroughs** with stakeholders, **inspections** (formal, checklist-based), and asking a tester "How would you test this?" If the tester can't answer, the requirement isn't testable.

## Traceability and the requirements traceability matrix

> **In short:** Traceability links each requirement back to its reason and forward to its design and tests.

**Traceability** is the ability to follow a requirement backwards to its source and forwards to its design, code and tests.

- **Backward traceability** — requirement → business objective / stakeholder request. Proves every requirement has a reason (and helps stop scope creep).
- **Forward traceability** — requirement → design → build → test case. Proves every requirement is built and tested.

A **Requirements Traceability Matrix (RTM)** is the table that records these links:

| Req ID | Requirement | Business objective | Source | Design ref | Test case | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FR-012 | Auto-match on amount, date, reference | BO-1 reduce breaks | Workshop 3 | DS-4.2 | TC-031, TC-032 | Passed |
| FR-013 | Highlight items over 30 days | BO-2 meet SLA | Interview, Ops lead | UI-7 | TC-040 | In test |

Why traceability matters:

- **Impact analysis** — if a requirement changes, you instantly see which designs and tests are affected.
- **Coverage** — you can show that every requirement has at least one test before go-live.
- **Scope control** — requirements with no business objective are questioned.
- **Audit and compliance** — regulated industries such as banking often require it.

## Prioritization

> **In short:** You can't build everything at once — MoSCoW and similar techniques decide what comes first.

Not everything can be built at once. Common techniques:

### MoSCoW

- **Must have** — critical; the release fails without it (often legal, regulatory or core function).
- **Should have** — important but not vital; a workaround exists.
- **Could have** — nice to have if time allows.
- **Won't have (this time)** — agreed to be out of this release.

### Other techniques

- **Ranking / stack ranking** — put items in a single ordered list; no ties.
- **Value vs effort (2×2)** — quick wins (high value, low effort) first.
- **Kano model** — classifies features as *basic* (expected; absence causes dissatisfaction), *performance* (more is better) and *delighters* (unexpected, cause delight).
- **Weighted scoring** — score each item on criteria like value, risk, cost and regulatory need.
- **WSJF** (Weighted Shortest Job First, used in SAFe) — cost of delay divided by job size.
- **Timeboxing / budgeting** — fit the most valuable items into a fixed time or budget.

Prioritization factors: business value, cost, risk, regulatory or policy compliance, dependencies, urgency and stakeholder agreement.

## Managing requirements change

> **In short:** Change is normal; uncontrolled change is the problem. Baseline, assess impact, then decide.

Requirements change — that's normal. Uncontrolled change is the problem (**scope creep**).

### Baseline

A **baseline** is an approved version of the requirements. After baselining, changes go through a formal process.

### Change control process

1. **Request** — the change is logged (who, what, why).
2. **Impact analysis** — the BA uses traceability to assess impact on scope, schedule, cost, risk, design and tests.
3. **Decision** — a change control board (CCB) or product owner approves, rejects or defers.
4. **Update** — requirements, RTM, designs and tests are updated; version number increases.
5. **Communicate** — stakeholders are told what changed.

In agile, change is welcomed through the backlog: new requests become backlog items that the product owner prioritizes, so "change control" is lighter but still exists.

### Requirements sign-off

**Sign-off** is formal approval that the requirements are correct and complete enough to proceed. It doesn't freeze requirements forever; it creates a baseline. Get sign-off from the Accountable person in your RACI.

> **Interview tip:** "What do you do when a stakeholder asks for a change late in the project?" — Log it, analyze the impact using traceability, present options with their cost, schedule and risk, and let the decision maker decide. Never just say yes or no on your own.
