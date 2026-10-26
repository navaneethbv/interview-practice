Most BA job descriptions mention Agile or Scrum. This chapter explains the main delivery approaches in plain language and shows exactly where a BA adds value in each.

## Waterfall: plan everything first

> **In short:** Finish each phase before starting the next.

**Waterfall** (also called *predictive* or *plan-driven*) moves through phases in sequence: **requirements → design → build → test → deploy**. Each phase ends with a sign-off before the next begins.

**Strengths**
- Clear plan, budget and milestones from the start.
- Works well when requirements are stable and well understood (for example a regulatory change with a fixed specification).
- Heavy documentation helps audit and handover.

**Weaknesses**
- Users see working software only near the end, so misunderstandings are found late and are expensive to fix.
- Change is hard once requirements are signed off.

**The BA in waterfall** writes a full BRD/FRD up front, gets formal sign-off, manages change requests and supports testing.

## The Agile mindset

> **In short:** Deliver small pieces often, learn from feedback, adapt.

**Agile** is a mindset described in the **Agile Manifesto** (2001). Its four values:

1. **Individuals and interactions** over processes and tools.
2. **Working software** over comprehensive documentation.
3. **Customer collaboration** over contract negotiation.
4. **Responding to change** over following a plan.

The manifesto adds: *"while there is value in the items on the right, we value the items on the left more."* Agile does **not** mean "no documentation" — it means just enough documentation, at the right time.

The manifesto also lists **12 principles**, including delivering working software frequently, welcoming changing requirements even late in development, business people and developers working together daily, and regularly reflecting on how to become more effective.

Agile is an umbrella; **Scrum** and **Kanban** are the most common ways of practicing it.

### Hybrid

Many organizations, especially banks, use **hybrid** approaches: an up-front business case and high-level requirements (waterfall-style), then agile sprints for delivery. Be ready to say you can work in either.

## Scrum: roles and events

> **In short:** Small team, fixed-length sprints, regular inspect-and-adapt.

**Scrum** is defined in the *Scrum Guide* by Ken Schwaber and Jeff Sutherland (latest version 2020). Work happens in **sprints** — fixed timeboxes of **one month or less** (two weeks is most common).

### The three accountabilities (roles)

- **Product Owner (PO)** — maximizes the value of the product; owns and orders the Product Backlog; one person, not a committee.
- **Scrum Master** — helps the team understand and use Scrum, removes impediments and coaches the organization. A servant-leader, not a manager.
- **Developers** — everyone who builds the increment: programmers, testers, designers and often the BA.

There is no "BA role" in Scrum. BAs usually work as part of the Developers, or as a close partner (sometimes a "proxy") to the Product Owner.

### The five events

| Event | Purpose | Timebox (for a one-month sprint) |
| --- | --- | --- |
| **Sprint** | Container for all the other events | One month or less |
| **Sprint Planning** | Decide *why* (Sprint Goal), *what* and *how* for the sprint | Up to 8 hours |
| **Daily Scrum** | Developers inspect progress toward the Sprint Goal and adapt the plan | 15 minutes |
| **Sprint Review** | Show the increment to stakeholders and adapt the backlog | Up to 4 hours |
| **Sprint Retrospective** | Improve how the team works | Up to 3 hours |

Shorter sprints use proportionally shorter events.

## Scrum artifacts and commitments

> **In short:** Three artifacts, each with a commitment that gives it focus.

| Artifact | What it is | Commitment |
| --- | --- | --- |
| **Product Backlog** | The ordered list of everything that might be needed in the product | **Product Goal** — the long-term objective |
| **Sprint Backlog** | The Sprint Goal plus the backlog items selected for the sprint and the plan to deliver them | **Sprint Goal** — the single objective for the sprint |
| **Increment** | A usable step toward the Product Goal, meeting the Definition of Done | **Definition of Done** — the quality standard for the increment |

### Definition of Ready and Definition of Done

- **Definition of Done (DoD)** — part of the Scrum Guide. A shared checklist every item must meet to count as done, for example: *code reviewed, acceptance criteria passed, regression tests passed, documentation updated, deployed to the test environment.*
- **Definition of Ready (DoR)** — *not* in the Scrum Guide but widely used. A checklist for when a story is ready to enter a sprint, for example: *user story written, acceptance criteria agreed, dependencies identified, estimated, small enough for one sprint.* BAs usually own getting stories "ready".

## Backlog refinement and estimation

> **In short:** Keep the next few sprints' stories clear, small and estimated.

**Backlog refinement** (formerly called *grooming*) is the ongoing activity of breaking down, clarifying, estimating and ordering backlog items. It isn't a formal Scrum event, but most teams hold a regular session. This is where the BA shines: bringing well-written stories with acceptance criteria, answering questions, and splitting large items.

### Estimation

- **Story points** — a relative measure of effort, complexity and uncertainty, not hours. A 5-point story is roughly five times bigger than a 1-point story. Teams often use a modified **Fibonacci** scale: 1, 2, 3, 5, 8, 13, 20…
- **Planning Poker** — each team member privately picks a card; everyone reveals at once; the highest and lowest explain their thinking; repeat until the team agrees. This avoids anchoring on the first voice.
- **T-shirt sizing** — XS, S, M, L, XL for quick, rough estimates of epics.
- **Velocity** — the number of story points a team completes per sprint, on average. Used to forecast, *not* to compare teams.

### Charts

- **Burndown chart** — remaining work over time; should trend toward zero by the end of the sprint.
- **Burnup chart** — completed work over time against total scope; shows when scope grows.

### Spikes

A **spike** is a short, timeboxed investigation to reduce uncertainty (for example "find out whether the vendor API supports bulk upload") before estimating a story.

## Kanban

> **In short:** Visualize the work, limit work in progress, keep it flowing.

**Kanban** has no sprints or fixed roles. Its core practices:

1. **Visualize the workflow** on a board: *To do → Analysis → In progress → Testing → Done*.
2. **Limit work in progress (WIP)** — for example, no more than three items in Testing. WIP limits expose bottlenecks and stop multitasking.
3. **Manage flow** — measure and improve how smoothly work moves.
4. **Make policies explicit** — for example, what "done" means for each column.
5. **Improve continuously.**

### Flow metrics

- **Lead time** — from request to delivery (what the customer experiences).
- **Cycle time** — from starting work to finishing it.
- **Throughput** — items finished per period.

Kanban suits support and operations teams with a steady stream of unplanned work — such as production issues, reconciliation exceptions or small change requests. **Scrumban** mixes Scrum's events with Kanban's flow.

## Scaling and the BA's role in agile

> **In short:** In agile, the BA keeps the backlog clear and valuable.

### Scaled frameworks

Large organizations coordinate many teams with frameworks such as **SAFe** (Scaled Agile Framework), **LeSS** (Large-Scale Scrum) and **Scrum@Scale**. In SAFe, teams work in a **Program Increment (PI)** of usually 8–12 weeks, planned together at **PI Planning**; work is organized as **epics → features → stories**.

### What a BA does on an agile team

- Works with the PO to understand the product vision and translate it into epics and stories.
- Writes user stories and acceptance criteria; keeps the top of the backlog "ready".
- Facilitates story-mapping and refinement sessions.
- Answers developer and tester questions during the sprint — the "Conversation" in Card, Conversation, Confirmation.
- Reviews completed stories against acceptance criteria and supports the Sprint Review demo.
- Models processes and data where the team needs a bigger picture.
- Tracks dependencies with other teams.

### Story mapping

A **user story map** arranges user activities left to right (the user's journey), with stories stacked below each activity by priority. A horizontal line across the map marks the **MVP (minimum viable product)** or first release. It helps teams see the whole journey instead of a flat list.

> **Interview tip:** "How is the BA role different in Agile versus Waterfall?" — In waterfall the BA documents everything up front and hands it over; in agile the BA works continuously with the team, writes requirements just in time as stories, and collaborates daily. The core skills — understanding needs, analysis, clear communication — are the same.
