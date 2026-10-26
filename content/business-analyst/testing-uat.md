A requirement isn't finished until it has been tested and accepted. BAs play a big part in testing — especially **user acceptance testing (UAT)** — and in triaging defects before and after go-live.

## Test levels and test types

> **In short:** Different tests answer different questions, from "does this piece work?" to "does it work for the business?"

### Test levels (from smallest to largest)

1. **Unit testing** — developers test individual pieces of code.
2. **Integration testing** — checks that components or systems work together (for example the ledger feed reaching the matching engine).
3. **System testing** — QA tests the complete system against the functional and non-functional requirements.
4. **User acceptance testing (UAT)** — business users confirm the solution meets their needs in realistic scenarios. This is the final gate before go-live.

### Common test types

| Type | Question it answers |
| --- | --- |
| **Functional** | Does it do what the requirements say? |
| **Regression** | Did the change break something that used to work? |
| **Smoke** (build verification) | Do the most basic functions work enough to continue testing? |
| **Sanity** | After a small fix, does that specific area work? |
| **Performance / load** | Is it fast enough under expected (and peak) volume? |
| **Security** | Are data and access protected? |
| **Usability** | Can users complete tasks easily? |
| **End-to-end** | Does the whole business flow work across systems? |
| **Parallel run** | Do the old and new systems produce the same results on the same data? Common in finance. |

### Black box and white box

- **Black-box testing** — tests behavior without looking at the code (what BAs and UAT testers do).
- **White-box testing** — tests with knowledge of the internal code (developers).

## Writing test scenarios and test cases

> **In short:** A scenario says *what* to test; a test case says exactly *how*.

- **Test scenario** — a high-level situation to test: "Verify a team lead can approve a manual match."
- **Test case** — detailed, repeatable steps with data and an expected result.

### A test case template

| Field | Example |
| --- | --- |
| ID | TC-031 |
| Requirement | FR-012 (traceability!) |
| Title | Auto-match on amount, date and reference |
| Preconditions | Ledger entry and statement line loaded with identical amount 1,250.00 AUD, value date 14-Mar, reference INV-889 |
| Steps | 1. Run the matching job. 2. Open the matched items screen. 3. Search for INV-889. |
| Expected result | Both items show status *Matched – Auto*, with the same match ID |
| Actual result | (filled during execution) |
| Status | Pass / Fail / Blocked |

### Test design techniques

- **Equivalence partitioning** — group inputs that should behave the same way and test one from each group (amounts below tolerance, within tolerance, above tolerance).
- **Boundary value analysis** — test at the edges: just below, at, and just above a limit (29, 30 and 31 days for a 30-day rule). Defects cluster at boundaries.
- **Decision table testing** — one test for each combination of conditions in a decision table.
- **Negative testing** — invalid input or misuse: blank reference, future date, unauthorized user.
- **State transition testing** — every valid (and invalid) move between states, such as Open → Approved.

> **Interview tip:** If asked how you reduced defects, mention reviewing test cases against acceptance criteria, and adding boundary and negative cases that the original requirements didn't spell out.

## User acceptance testing (UAT)

> **In short:** Real users, realistic scenarios, formal sign-off.

UAT answers the question: **"Can the business do its job with this solution?"** It is performed by business users (or their representatives), often coordinated by the BA.

### UAT steps

1. **Plan** — scope, entry and exit criteria, schedule, environment, testers, defect process. Write a **UAT plan**.
2. **Prepare** — business-focused scenarios based on real work (not just system screens), **test data** (realistic, anonymized if needed), user access and a short tester briefing.
3. **Execute** — testers run scenarios and record results and evidence (screenshots).
4. **Manage defects** — log, triage, fix and retest.
5. **Sign off** — the business owner formally accepts the solution when exit criteria are met.

### Entry and exit criteria

- **Entry criteria** (when UAT can start): system testing complete; no open critical defects; environment and data ready; testers trained.
- **Exit criteria** (when UAT is done): all planned scenarios run; agreed pass rate (for example 100% of critical and 95% of all scenarios); no open critical or high defects, or an agreed workaround for each; sign-off obtained.

### Alpha and beta

**Alpha testing** is done in-house before release; **beta testing** is done by a limited group of real customers in their environment.

## The defect life cycle

> **In short:** Every defect is logged, triaged, fixed, retested and closed.

A **defect** (bug) is a difference between expected and actual results. A typical life cycle:

**New → Assigned → Open (in progress) → Fixed → Retest → Closed**

Other possible outcomes:

- **Reopened** — the retest failed.
- **Rejected / Not a defect** — works as designed (may reveal a requirement misunderstanding!).
- **Duplicate** — already logged.
- **Deferred** — valid, but will be fixed in a later release.

### A good defect report

- Short, specific **title**: "Approve button does nothing for matches over 10,000 AUD"
- **Steps to reproduce**, test data, environment.
- **Expected** versus **actual** result.
- **Evidence** — screenshot, log, file.
- **Severity** and suggested **priority**.
- Linked **requirement** or **test case**.

A defect marked "works as designed" that users still think is wrong is often a **requirements gap** — the BA should investigate and, if needed, raise a change request.

## Severity, priority and triage

> **In short:** Severity is how bad; priority is how soon.

- **Severity** — the **impact** of the defect on the system or business. Usually set by QA.
- **Priority** — the **urgency** of fixing it. Usually set by the business, product owner or triage meeting.

They are different. Classic examples:

| Example | Severity | Priority |
| --- | --- | --- |
| Matching job crashes for all accounts | High | High |
| Rare crash in a yearly report used next quarter | High | Low |
| Company logo is wrong on the client login page | Low | High |
| Typo on an internal admin screen | Low | Low |

### Common severity levels

**Critical** (system down, data loss, no workaround) → **High / Major** (key function broken, workaround is hard) → **Medium** (function impaired, workaround exists) → **Low / Minor** (cosmetic).

### Defect triage

A **triage meeting** (often daily near go-live) reviews new defects with QA, development, the BA and the business. For each defect it decides: Is it valid? Severity and priority? Who fixes it? Fix now, later, or accept with a workaround? The BA often brings the business-impact view and checks requirements to decide whether behavior is truly a defect.

## Go-live, cutover and hypercare

> **In short:** Plan the switch carefully, have a way back, and watch closely afterwards.

### Release readiness

Before go-live, a **go/no-go** meeting checks: UAT sign-off, open defects and workarounds, training complete, support team ready, data migration rehearsed, rollback plan agreed, and communications sent.

### Cutover plan

A **cutover plan** is a minute-by-minute runbook of the switch to the new solution: freeze old system, migrate data, validate, switch interfaces, smoke test, open to users. Every step has an owner, a start time and a checkpoint.

### Deployment strategies

- **Big bang** — everyone switches at once. Simple but risky.
- **Phased** — by region, team or function (one country at a time).
- **Parallel** — old and new systems run side by side for a period; results are compared. Safest, but double the work.
- **Pilot** — one small group first, then everyone.

### Rollback plan

How to return to the old state if go-live fails, with clear **rollback criteria** ("if the matching job hasn't completed by 6 a.m., roll back").

### Hypercare

**Hypercare** is a period of intensive support right after go-live (often 2–4 weeks): daily check-ins, a fast-track defect process, project team available to users, and close monitoring of key metrics. Afterwards, the solution is handed over to normal **business-as-usual (BAU)** support.

## Production issues, case management and SLAs

> **In short:** Log every issue, prioritize by impact, resolve within the agreed time, and learn from it.

After go-live, issues are handled through a **case or ticket system** such as ServiceNow, Jira Service Management, Remedy or Salesforce.

### ITIL vocabulary

**ITIL** is a widely used framework for IT service management. Key terms:

- **Incident** — an unplanned interruption or reduction in quality of a service. Goal: restore service quickly.
- **Problem** — the underlying cause of one or more incidents. Goal: find and remove the root cause.
- **Change** — adding, modifying or removing something that could affect services; goes through change approval (sometimes a **CAB**, change advisory board).
- **Service request** — a routine user request (access, a report, a password reset).
- **Known error** — a problem with a documented root cause and workaround.

### SLAs, SLOs and KPIs

- **SLA (service level agreement)** — an agreed commitment, for example "priority 1 incidents resolved within 4 hours" or "all breaks investigated within 2 business days".
- **SLO (service level objective)** — the internal target behind an SLA.
- **SLA compliance %** = cases resolved within SLA ÷ total cases × 100. *190 of 200 within SLA = 95%.*
- **Aging** — how long items have been open, often grouped in buckets (0–7, 8–30, 31–60, 60+ days). Aged items are a key risk measure.

### Exception handling

An **exception** is anything that falls outside the normal process: an unmatched item, a failed payment, a missing document. Good exception handling has: clear categories (reason codes), an owner, a time limit, an escalation path, and documented resolution steps. Written procedures (**SOPs**) for exceptions make the team consistent and audit-ready.

### Good case documentation

Every case should let someone else understand it later: what happened, when, evidence, actions taken, who decided what, root cause and resolution. Clear, factual, neutral language — no opinions or blame. This is also what auditors and regulators look for.
