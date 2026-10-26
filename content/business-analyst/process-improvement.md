Process improvement is about doing the same work faster, with fewer errors and less effort. Lean and Six Sigma give you a shared language for it, and many BA roles in operations-heavy industries like banking ask for them.

## Lean thinking

> **In short:** Deliver what the customer values, with as little waste as possible.

**Lean** comes from the Toyota Production System. Its five principles:

1. **Define value** from the customer's point of view.
2. **Map the value stream** — all steps that deliver it.
3. **Create flow** — remove interruptions, delays and handoffs.
4. **Establish pull** — produce only when there is demand, not "just in case".
5. **Pursue perfection** — improve continuously.

### Value-added or not?

Every step is one of three types:

- **Value-adding (VA)** — the customer would pay for it; it changes the product or service. *Matching a transaction.*
- **Business necessary non-value-adding (BNVA)** — required by regulation or control, but the customer doesn't value it directly. *Maker-checker approval, audit logging.* Minimize it, don't remove it.
- **Non-value-adding (NVA), pure waste** — remove it. *Re-keying data, waiting for an approval email.*

## The eight wastes (TIMWOODS)

> **In short:** Learn the acronym — interviewers love it.

| Waste | In an office or bank operations team |
| --- | --- |
| **T**ransportation | Moving files or data between systems or emailing spreadsheets around |
| **I**nventory | Backlogs of unprocessed items, queues of breaks waiting for review |
| **M**otion | Clicking through many screens, searching for information |
| **W**aiting | Waiting for approvals, files, system batches or answers |
| **O**verproduction | Reports nobody reads, producing work before it's needed |
| **O**ver-processing | Extra checks, approvals or detail beyond what's required |
| **D**efects | Errors, rework, corrections, re-opened cases |
| **S**kills (unused talent) | Not using people's ideas and abilities; skilled staff doing manual copy-paste |

When you walk through an as-is process map, tag each step with any wastes you see — it quickly shows where to focus.

## Six Sigma and DMAIC

> **In short:** Reduce variation and defects using data, in five phases.

**Six Sigma** aims to reduce **variation** and **defects** using statistics. "Six sigma" quality means about **3.4 defects per million opportunities (DPMO)**. **Lean Six Sigma** combines Lean's focus on speed and waste with Six Sigma's focus on quality and variation.

### DMAIC — the improvement method

| Phase | Goal | Typical tools |
| --- | --- | --- |
| **Define** | Agree the problem, goal, scope and customer | Project charter, SIPOC, voice of the customer (VOC) |
| **Measure** | Measure current performance (the baseline) | Data collection plan, process map, baseline metrics |
| **Analyze** | Find and verify root causes | 5 Whys, fishbone, Pareto, data analysis |
| **Improve** | Develop, test and implement solutions | Brainstorming, pilot, to-be process, FMEA |
| **Control** | Sustain the gains | SOPs, control charts, dashboards, training, handover |

**DMADV** (Define, Measure, Analyze, Design, Verify) is used when designing a *new* process rather than improving an existing one.

### Belts

Practitioners are certified as **Yellow Belt** (basic awareness), **Green Belt** (leads small projects part-time), **Black Belt** (leads complex projects full-time) and **Master Black Belt** (coaches and leads programs). A Green Belt is a useful addition for a BA.

### Key terms

- **CTQ (critical to quality)** — a measurable characteristic the customer cares about ("breaks resolved in 2 days").
- **VOC (voice of the customer)** — what the customer says they need, captured through interviews, surveys and complaints.
- **Control chart** — plots a process measure over time with upper and lower control limits, to spot unusual variation.
- **FMEA (failure mode and effects analysis)** — lists how a process could fail, and scores severity, occurrence and detection to prioritize prevention.

## PDCA and Kaizen

> **In short:** Small, frequent improvements add up.

### PDCA (Deming cycle)

1. **Plan** — identify the problem and plan a change.
2. **Do** — try it on a small scale.
3. **Check** — measure the result against expectations. (Sometimes called *Study*: PDSA.)
4. **Act** — adopt the change as standard, adjust it, or abandon it — then repeat.

### Kaizen

**Kaizen** means "change for the better" — continuous, incremental improvement by everyone, every day. A **kaizen event** (or blitz) is a focused workshop, typically lasting a few days, where a team maps a process and implements improvements immediately.

### Other Lean tools

- **5S** — Sort, Set in order, Shine, Standardize, Sustain. In offices: organize shared drives, templates and folders.
- **Gemba** — "the real place": go and see the work where it happens instead of relying on reports.
- **Poka-yoke** — mistake-proofing. *A dropdown instead of free text; a system that blocks approval if amounts don't match.*
- **Root-cause countermeasures** — fix the cause, not the symptom.

## Flow metrics and Little's Law

> **In short:** Less work in progress means faster delivery.

- **Lead time** — elapsed time from request to completion (what the customer feels).
- **Cycle time** — time from starting work to finishing it.
- **Throughput** — items completed per period.
- **WIP (work in progress)** — items started but not finished.
- **Takt time** — available working time ÷ customer demand; the pace needed to keep up. *420 minutes ÷ 210 items = one item every 2 minutes.*

### Little's Law

**Average lead time = average WIP ÷ average throughput.**

*If 300 breaks are open and the team closes 100 per day, the average break waits about 3 days.* To cut lead time, either increase throughput or **reduce WIP** — often by fixing causes so fewer items enter the queue at all.

### Measuring turnaround improvement

Percentage reduction = (old − new) ÷ old × 100. *Turnaround from 5 days to 4 days: (5 − 4) ÷ 5 = 20% reduction.*

## Standardization and SOPs

> **In short:** Agree the best known way, write it down, and train everyone on it.

**Standard work** is the current best way to do a task, documented and followed by everyone. It reduces variation (the main source of errors) and makes improvement possible — you can't improve a process that everyone does differently.

### A good standard operating procedure (SOP)

- **Purpose and scope** — what the procedure covers and when to use it.
- **Roles** — who does each step (link to RACI).
- **Inputs and prerequisites** — systems, access, files.
- **Numbered steps**, with screenshots where helpful.
- **Decision points and exception handling** — "If the amount differs by more than $1, then…"
- **Controls** — checks, approvals and evidence required.
- **SLAs and escalation paths.**
- **Version, owner, approval date and review date.**

Write in plain, active language: "Open the Unmatched Items screen," not "The Unmatched Items screen should be opened." Test the SOP by asking someone new to follow it.

### Standardizing across teams

When several teams do the same process differently: map each version, compare them against outcomes (speed, accuracy, control), agree the best elements in a workshop, document one standard, train everyone, and measure adoption.

## Automation and RPA

> **In short:** Simplify first, then automate.

Automation options, from simplest to most complex:

- **Configuration** — use features the system already has (matching rules, workflow settings).
- **Spreadsheet automation** — formulas, Power Query, macros.
- **Workflow tools** — Power Automate, ServiceNow workflows.
- **RPA (robotic process automation)** — software "bots" that mimic human clicks and keystrokes in existing applications (UiPath, Automation Anywhere, Blue Prism, Power Automate Desktop). Best for high-volume, rule-based, stable processes with structured data.
- **System integration (APIs)** — systems exchange data directly; more robust than RPA.
- **AI and intelligent automation** — reading documents (OCR), classifying exceptions, suggesting matches. Needs human review for important decisions.

### Rule-based matching (an automation example)

Reconciliation tools match items using rules, often in tiers:

1. **Exact match** — amount, date and reference all equal.
2. **Tolerance match** — amount within a small tolerance (for example bank fees under $1).
3. **Fuzzy reference match** — references similar but not identical (extra spaces, prefixes).
4. **Many-to-one / one-to-many** — several ledger entries add up to one statement line.

Each new rule should be **tested on historical data** before switching on, to check it doesn't create false matches — a wrong automatic match is worse than no match.

### Choosing what to automate

Good candidates are **high volume, repetitive, rule-based, stable, digital-input** and **error-prone when done manually**. Don't automate a broken process — "automating a mess gives you a faster mess." Simplify and standardize first.

## Proving the improvement

> **In short:** Baseline before, measure after, and keep it in control.

1. **Baseline** — measure the current state before changing anything (from the Measure phase).
2. **Define success** — target and timeframe agreed with the sponsor.
3. **Pilot** — test on a small scope; compare with a control group if possible.
4. **Measure after** — same definitions, same data sources, enough time to see a real trend (not one good week).
5. **Account for other factors** — seasonality, volume changes, other projects.
6. **Control** — dashboards, SOPs and owners so the gain doesn't slip back.
7. **Communicate the result** — in business terms: time saved, risk reduced, cost avoided.

> **Interview tip:** When you quote an improvement number, be ready to explain the baseline, how it was measured, over what period, and what *you* specifically did. Interviewers probe numbers to check they're real.
