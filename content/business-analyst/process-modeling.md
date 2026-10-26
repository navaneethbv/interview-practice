A picture of a process often says more than ten pages of text. This chapter teaches the notations and the method for mapping as-is and to-be processes, so you can describe — and, if asked, draw — them in an interview.

## Why model processes: as-is and to-be

> **In short:** Map how work happens today (as-is), design how it should happen (to-be), and close the gaps.

A **process** is a set of activities that turns inputs into outputs for a customer. A **process model** is a diagram of those activities, who does them, in what order and with what decisions.

- **As-is (current state)** — how the work is done *today*, including workarounds, delays and rework. Be honest: map what really happens, not what the procedure manual says.
- **To-be (future state)** — how the work *will* be done after the change.
- **Gap** — the differences between the two. Each gap becomes a requirement, a process change, a training need or a system change.

### The as-is / to-be method

1. **Define scope:** where does the process start and end? (The *trigger* and the *outcome*.)
2. **Identify participants:** each role or system becomes a swimlane.
3. **Elicit the as-is:** interviews, observation, documents, system data.
4. **Draw the as-is** and validate it with the people who do the work.
5. **Analyze pain points:** delays, handoffs, duplicate data entry, rework loops, manual checks, bottlenecks, unclear ownership. Add measures (time, volume, error rate).
6. **Design the to-be:** remove waste, automate, simplify, standardize.
7. **Validate the to-be** with stakeholders and check it against business objectives.
8. **List the gaps** and turn them into requirements and an implementation plan.

### Levels of detail

- **Level 0 / context** — the whole process as one box with inputs and outputs.
- **Level 1** — the main steps (5–10 boxes).
- **Level 2–3** — detailed tasks, decisions and exceptions for one step.

Executives want level 0–1; developers and testers need level 2–3.

> **Interview tip:** If you have standardized workflows, you probably found variations of the same process (different teams doing it differently) and created one agreed to-be version. Explain *how* you got agreement — that's the hard part interviewers want to hear about.

## Flowcharts and swimlane diagrams

> **In short:** Swimlane diagrams show who does each step and make handoffs — where delays hide — visible.

A **flowchart** is the simplest process model. Standard symbols:

| Symbol | Meaning |
| --- | --- |
| Oval (terminator) | Start or end |
| Rectangle | Activity / task |
| Diamond | Decision (yes/no question) |
| Parallelogram | Input or output (data) |
| Document shape | A document or report |
| Arrow | Flow / sequence |
| Cylinder | Database |

A **swimlane diagram** (cross-functional flowchart) adds horizontal or vertical lanes, one per role, team or system. It shows *who* does each step and makes **handoffs** visible — every arrow crossing a lane is a handoff, and handoffs are where delays and errors happen.

```text
Lane: Analyst    (Start) → Review unmatched item → Can it be matched?
                                                     ├─ No  → Raise exception → (End)
                                                     └─ Yes ↓
Lane: System                                  Record proposed match
                                                     ↓   (handoff)
Lane: Team lead                               Approve match → (End)
```

Tips for clear diagrams:

- Name activities **verb + noun**: "Review item", "Approve match", not "Review" or "Item".
- Decisions are questions with labeled outcomes: "Amount within tolerance?" → Yes / No.
- Flow left to right or top to bottom. Avoid crossing lines.
- One start, clear ends, no dead ends.
- Keep each diagram to one page; break large processes into sub-processes.

## BPMN 2.0 basics

> **In short:** BPMN is the standard process notation: events, activities, gateways and swimlanes.

**BPMN (Business Process Model and Notation)** is the international standard for process diagrams, maintained by the Object Management Group (OMG). Many employers ask whether you know it. Learn the four element groups.

### 1. Flow objects

- **Events** (circles) — something that happens.
  - **Start event** — thin circle.
  - **Intermediate event** — double circle (for example a timer: "wait 2 days", or a message received).
  - **End event** — thick circle.
- **Activities** (rounded rectangles) — work that is done.
  - **Task** — a single unit of work.
  - **Sub-process** — a task with a small "+" marker, containing its own detailed process.
- **Gateways** (diamonds) — where the flow splits or merges.
  - **Exclusive gateway (XOR)** — diamond with an "X" (or empty): *exactly one* path is taken. "Is the amount within tolerance?"
  - **Parallel gateway (AND)** — diamond with "+": *all* paths are taken at the same time, and a matching AND gateway waits for all to finish.
  - **Inclusive gateway (OR)** — diamond with "O": *one or more* paths are taken depending on conditions.
  - **Event-based gateway** — the path depends on which event happens first.

### 2. Connecting objects

- **Sequence flow** — solid line with arrow: order of activities *within* a pool.
- **Message flow** — dashed line with open circle and arrow: messages *between* pools (between organizations or independent participants).
- **Association** — dotted line linking artifacts (notes, data) to elements.

### 3. Swimlanes

- **Pool** — a major participant, such as an organization ("Bank", "Customer").
- **Lane** — a role or department within a pool ("Analyst", "Team lead", "System").

### 4. Artifacts

- **Data object** — information used or produced (a page with a folded corner).
- **Data store** — a database.
- **Group** and **text annotation** — for explanation.

> **Interview tip:** The most common BPMN question is the difference between gateways. Remember: **XOR = exactly one path; AND = all paths in parallel; OR = one or more paths.** And sequence flow is *inside* a pool, message flow is *between* pools.

## SIPOC and value stream mapping

> **In short:** SIPOC gives a one-page scope view; a value stream map shows where time is wasted waiting.

### SIPOC

A **SIPOC** is a one-page, high-level view of a process, often used at the start of a Lean Six Sigma project:

| Suppliers | Inputs | Process (5–7 steps) | Outputs | Customers |
| --- | --- | --- | --- | --- |
| Correspondent banks, internal ledger system | Bank statements (MT940/camt.053), ledger entries | Load data → Auto-match → Investigate breaks → Resolve / escalate → Report | Reconciled accounts, break report, SLA metrics | Finance controllers, auditors, team leads |

It answers: Who provides what? What are the main steps? Who receives the result? It's a great way to agree scope before detailed mapping.

### Value stream mapping

A **value stream map (VSM)** is a Lean tool showing every step from request to delivery, with **process time** (time actually working) and **wait time** (time waiting between steps). It highlights waste.

- **Lead time** — total elapsed time from start to finish.
- **Process time (touch time)** — time spent actually working.
- **Process cycle efficiency** = process time ÷ lead time. Many office processes are below 10%: work spends most of its time waiting.

Example: a break takes 5 days to resolve (lead time), but only 40 minutes of actual work. The improvement opportunity is the waiting — handoffs, approvals and queues.

## UML for BAs: use case and activity diagrams

> **In short:** A few UML diagrams help BAs show scope, flows, interactions and states.

**UML (Unified Modeling Language)** is a set of diagrams used in software design. BAs mostly use a few:

- **Use case diagram** — shows **actors** (stick figures: users or external systems) and the **use cases** (ovals: goals) they perform with the system, inside a **system boundary** box. It is a scope picture, not a flow. Relationships include *«include»* (a use case always uses another, such as "Log in") and *«extend»* (optional behavior added under conditions).
- **Activity diagram** — similar to a flowchart with swimlanes; shows the flow of activities, decisions, and parallel forks/joins.
- **Sequence diagram** — shows messages between objects or systems over time (lifelines run downwards). Useful for integrations: "Ledger system sends file → Reconciliation engine validates → returns acknowledgement."
- **State diagram (state machine)** — shows the states an object moves through and the events that cause transitions. Great for business objects: a break goes *Open → Under investigation → Proposed match → Approved → Closed*, or *→ Escalated → Written off*.
- **Class diagram** — shows entities, their attributes and relationships; BAs use simplified versions as domain models.

## Data models: ERDs, data flow diagrams and data dictionaries

> **In short:** Describe the data too: entities and relationships, data flows, definitions and rules.

BAs often need to describe the data, not just the process.

### Entity relationship diagram (ERD)

An **ERD** shows **entities** (things we store data about: Account, Transaction, Break), their **attributes** (Transaction: ID, amount, currency, value date, reference) and **relationships** with **cardinality**:

- **One-to-one (1:1)** — one person has one employee badge.
- **One-to-many (1:N)** — one account has many transactions.
- **Many-to-many (M:N)** — many transactions can be matched to many statement lines (resolved with a linking entity such as "Match").

A **primary key** uniquely identifies a record (Transaction ID). A **foreign key** links to another table (Transaction.AccountID → Account.ID).

### Data flow diagram (DFD)

A **DFD** shows how data moves through a system: **external entities** (sources/destinations), **processes** (transform data), **data stores** and **data flows**. A **context diagram** (level 0 DFD) shows the whole system as one process with all external entities around it — a quick way to agree system scope.

### Data dictionary

A **data dictionary** (glossary of data) defines each data element: name, description, type, length, allowed values, source, owner, example.

| Field | Description | Type | Rules | Example |
| --- | --- | --- | --- | --- |
| value_date | Date funds are available | Date (YYYY-MM-DD) | Required; not in future | 2026-03-14 |
| currency | ISO 4217 currency code | Text(3) | One of AUD, NZD, SGD, HKD | AUD |

### Decision tables

A **decision table** captures complex business rules as conditions and actions:

| Amount difference | Age of break | Action |
| --- | --- | --- |
| ≤ $1 | Any | Auto-write-off |
| > $1 | ≤ 30 days | Analyst investigates |
| > $1 | > 30 days | Escalate to team lead |

Decision tables make rules complete (every combination covered) and easy to test.

## Tools and modeling tips

> **In short:** Model with the people who do the work, start simple, and add real numbers.

Common tools: **Visio, Lucidchart, draw.io, Miro, Bizagi Modeler, Signavio, Camunda Modeler** (BPMN), and **Figma/Balsamiq** for screen mock-ups.

### Practical tips

- **Model with people, not for them.** Draw the map live in a workshop; people correct it immediately.
- **Start with the happy path**, then add exceptions.
- **Add data to the map**: volumes, time per step, error rates. Numbers turn opinions into facts.
- **Use a legend** if your audience doesn't know BPMN.
- **Version control** your diagrams and keep the as-is after the to-be is approved — you'll need it to measure improvement.
- **Check every decision has all outcomes** and every path reaches an end.

> **Practice exercise:** Pick an everyday process — for example, how a student books and attends a private lesson. Draw the as-is swimlane (Student, Tutor, Payment), mark three pain points, and draw a to-be. Being able to talk through this simply is great interview practice.
