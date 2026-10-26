Requirements live in people's heads, in documents and in systems. **Elicitation** is how you draw them out. This chapter covers who to talk to (stakeholder analysis) and how to talk to them (interviews, workshops and the other techniques).

## Identifying stakeholders

> **In short:** List everyone who affects or is affected by the change — missing someone causes late surprises.

A **stakeholder** is anyone who affects, or is affected by, the change. Missing a stakeholder is one of the most common reasons projects fail: the forgotten group shows up late with requirements nobody planned for.

### Who to look for

Use a checklist so you do not forget anyone:

- **Sponsor** — authorizes and funds the work; final decision maker.
- **End users** — the people who will use the solution daily (for example reconciliation analysts).
- **Domain subject matter experts (SMEs)** — people with deep knowledge of the business area.
- **Implementation SMEs** — developers, architects, database administrators, testers.
- **Operational support** — help desk and production support teams who will run the solution.
- **Regulators and auditors** — internal audit, compliance, risk, external regulators.
- **Customers** — external people affected by the change.
- **Suppliers and vendors** — third parties whose systems or services are involved.
- **Project manager** — plans and tracks the delivery.

### Techniques for finding them

- Look at the **organization chart** and ask "who else touches this process?"
- Draw the process: every swimlane is a stakeholder group.
- Ask each stakeholder, "Who else should I talk to?" (sometimes called *snowballing*).
- Review RACI charts, previous project documents and incident tickets.

### The stakeholder onion

The **onion diagram** shows stakeholders in rings: the solution delivery team at the center, then the affected organizational unit, then the wider organization, then external parties (customers, regulators, suppliers). It helps you see how far the change ripples.

## Analyzing stakeholders: power, interest and RACI

> **In short:** Map stakeholders by power and interest, and use a RACI chart so everyone knows their role.

Once you have a list, analyze it so you spend your time wisely.

### Power/interest grid

Plot each stakeholder by **influence (power)** and **interest (impact)**:

| | Low interest | High interest |
| --- | --- | --- |
| **High power** | **Keep satisfied** — brief updates, consult on key decisions | **Manage closely** — involve deeply, frequent contact |
| **Low power** | **Monitor** — minimal effort, general communication | **Keep informed** — regular updates, invite feedback |

Example: the Head of Operations who funds the project is high power/high interest (manage closely). Internal audit may be high power/low interest until a control changes (keep satisfied). Analysts doing the daily work are often lower power but very high interest (keep informed, and involve them as SMEs — they know the real process).

### RACI matrix

A **RACI** chart assigns roles for each deliverable or decision:

- **R – Responsible:** does the work.
- **A – Accountable:** owns the outcome and signs off. *Only one A per item.*
- **C – Consulted:** gives input before the work is done (two-way communication).
- **I – Informed:** kept up to date after decisions (one-way communication).

| Deliverable | BA | Ops Head | Analysts | IT Lead | Audit |
| --- | --- | --- | --- | --- | --- |
| Business requirements | R | A | C | C | I |
| Matching-rule design | C | I | C | R/A | C |
| UAT sign-off | R | A | C | I | I |

### Stakeholder attitudes

Note each stakeholder's **attitude** (champion, neutral, skeptic, blocker), what they care about, their preferred communication style and their availability. A skeptic with high power needs early, one-on-one attention.

> **Interview tip:** "How do you handle a stakeholder who won't engage?" — explain that you would understand their interests (what's in it for them), meet one-on-one, show how the change affects them, use their preferred channel, and escalate through the sponsor only if the gap threatens the project.

## Elicitation techniques

> **In short:** Choose the elicitation technique that fits the people, the information and the time you have.

Different techniques suit different situations. Know at least these:

| Technique | What it is | Best for | Watch out for |
| --- | --- | --- | --- |
| **Interviews** | Conversation with one or a few people | Deep understanding, sensitive topics | Time-consuming; one person's view |
| **Workshops** | Facilitated group session | Agreement across groups, speed | Dominant voices, needs strong facilitation |
| **Observation (job shadowing)** | Watching people do the work | Discovering the real process and workarounds | People behave differently when watched |
| **Document analysis** | Reviewing existing procedures, policies, reports, system manuals | Understanding current state, rules and regulations | Documents may be outdated |
| **Surveys / questionnaires** | Written questions to many people | Large or distributed groups, quantitative data | Low response rates, no follow-up questions |
| **Focus groups** | Moderated discussion with representative users | Attitudes and opinions about a product | Groupthink |
| **Brainstorming** | Generating many ideas without judgment | Exploring options | Needs follow-up to evaluate ideas |
| **Prototyping** | Showing a mock-up or model | Screens, reports, when users "know it when they see it" | Users may think the system is nearly built |
| **Interface analysis** | Studying how systems exchange data | Integrations, file feeds | Needs technical SMEs |
| **Data mining / system logs** | Analyzing existing data | Facts on volumes, patterns, errors | Data quality issues |
| **Process analysis** | Mapping how work flows | Inefficiency, handoffs | Covered in the process-modeling chapter |

There are three kinds of elicitation: **collaborative** (directly with people, such as interviews and workshops), **research** (studying documents and data) and **experiments** (prototypes, proofs of concept, A/B tests).

> **Interview tip:** Real investigations usually combine techniques. Investigating recurring reconciliation breaks, for example, uses **data analysis** (break patterns), **document analysis** (existing procedures) and **interviews** (the analysts). Name every technique you used when you tell a story.

## Running a structured interview

> **In short:** Prepare questions, ask open and probing ones, listen actively, then confirm what you heard.

A **structured interview** follows a prepared set of questions in a fixed order, so answers can be compared across interviewees. A **semi-structured** interview has prepared questions but allows follow-up; it is the most common style for BAs. An **unstructured** interview is an open conversation.

### Before the interview

1. Define the **goal** of the interview ("understand how breaks are investigated today").
2. Research the interviewee's role and read existing documents.
3. Prepare questions, grouped by topic, from general to specific.
4. Send an agenda and the purpose in advance; book 45–60 minutes.
5. Decide how you will record it (notes, recording with permission).

### Question types

- **Open questions** start with *what, how, why, tell me about* and invite explanation: "Walk me through what happens when a transaction doesn't match."
- **Closed questions** have yes/no or short answers: "Do you check this every day?" Use them to confirm facts.
- **Probing questions** dig deeper: "What happens next?", "Can you give me an example?", "Why is that step needed?"
- **Avoid leading questions** that suggest an answer ("You'd prefer automatic matching, right?"). They bias results — the opposite of impartial fact-finding.

### During the interview

- Start with purpose and timing; build rapport.
- **Active listening:** paraphrase ("So if I understand, you…"), summarize, watch body language.
- Ask for examples and numbers: volumes, frequency, time taken, error rates.
- Note exceptions and workarounds — the "real" process often lives there.
- End by asking: "Is there anything I should have asked but didn't?" and "Who else should I talk to?"

### After the interview

Write up notes within 24 hours, send a summary back to the interviewee to **confirm** accuracy, and log open questions and follow-ups. Confirming elicitation results is a separate BABOK task — information is not a requirement until it has been checked.

## Facilitating workshops

> **In short:** A good workshop has a clear goal, the right people, ground rules, and ends with owned actions.

A **requirements workshop** (sometimes called **JAD**, Joint Application Design/Development) brings stakeholders together to define, refine or prioritize requirements quickly.

### Roles in a workshop

- **Facilitator** — runs the session and stays neutral (often the BA).
- **Scribe** — records decisions, requirements and actions.
- **Participants** — stakeholders and SMEs.
- **Sponsor** — may open the session and resolve decisions beyond the group.
- **Timekeeper** — optional, keeps the agenda on track.

### Planning a workshop

1. Agree a clear **objective** and expected outputs ("agreed to-be process for exception handling").
2. Invite the *right* people — decision makers and those who do the work — and keep the group manageable (around 6–12).
3. Send an **agenda** and pre-reading.
4. Prepare materials: process drafts, templates, whiteboard, sticky notes or a digital board like Miro.

### Running a workshop

- Set **ground rules**: one conversation at a time, phones away, respect all views, decisions by agreed method.
- Use a **parking lot** for off-topic items so the session stays focused.
- Draw out quiet participants (round-robin, silent brainstorming on sticky notes) and manage dominant ones politely ("Thanks, let's hear from operations").
- Use visual techniques — mapping the process on a wall gets better engagement than reading documents.
- Close by summarizing decisions, open issues and **action items with owners and dates**.

### After the workshop

Circulate minutes within a day, update the requirements or process models, and follow up on actions.

> **Interview tip:** A favorite question is "Two senior stakeholders disagree in your workshop — what do you do?" Answer: separate positions from interests, bring the discussion back to the agreed business objective and data, explore options that satisfy both, and if they still disagree, document both options with impacts and escalate to the sponsor for a decision.

## Collaborating and managing stakeholder engagement

> **In short:** Elicitation never stops: keep stakeholders engaged and build trust throughout the project.

Elicitation is not a one-time event. Throughout the project the BA must:

- **Communicate business analysis information** in the right form for each audience (detailed specification for developers, one-page summary for executives).
- **Manage stakeholder collaboration**: keep people engaged, meet commitments, and spot disengagement early.
- **Build trust** by being reliable, accurate and impartial, and by keeping confidential information confidential.

### Common elicitation challenges and responses

| Challenge | Response |
| --- | --- |
| Stakeholder is too busy | Short focused sessions, async questions, use their delegate, ask the sponsor for time |
| Conflicting requirements | Facilitate, refer to business objectives, use data, escalate if needed |
| Stakeholder doesn't know what they want | Prototypes, observation, examples from other teams |
| Scope keeps expanding | Trace every request to an objective; route new items through change control |
| Tacit knowledge ("we just know") | Observation and job shadowing |
| Different languages or cultures | Plain language, written summaries, visual models, check understanding |
