# Build an evidence-based story bank

A behavioral answer should let an interviewer understand a decision you made, the constraints around it, and what changed afterward.
Use real experiences and distinguish your contribution from the team's work.
This guide supplies practice exercises, not employer scoring rules or scripts to memorize.
Reviewed October 4, 2026.

## Prepare six reusable stories

Choose one example for each row and write a few factual notes before rehearsing.
An example can cover several themes, but prepare alternatives so every answer does not return to the same project.

| Theme | Evidence to collect | Follow-up to rehearse |
| --- | --- | --- |
| Ownership | Your responsibility and what was initially unowned | What did you personally change? |
| Conflict | The competing proposals and each person's constraints | What was reasonable about the other position? |
| Failure | The decision, impact, recovery, and prevention | What warning did you miss? |
| Ambiguity | Missing information and the smallest useful experiment | Why was more research not worth the delay? |
| Mentoring | The person's goal and how your support changed | How did you avoid taking over? |
| Technical judgment | Alternatives, evidence, and reversibility | What would make you choose differently now? |

## Worksheet

Write one sentence for the situation and one for the task.
Spend most of the answer on actions: observations, alternatives, decisions, implementation, and communication.
Finish with the result and a lesson that changed later behavior.
Use measured outcomes when you have them; otherwise describe a verifiable qualitative result.
Never invent percentages to make an answer sound stronger.

```text
Situation: What was happening, and who was affected?
Task: What outcome were you responsible for?
Actions: What did you observe, decide, and do? Why?
Result: What evidence shows the outcome? What remains uncertain?
Learning: What did you change in your subsequent work?
```

## Exercise and review

Record a two-minute answer about a difficult delivery decision.
Then answer a five-minute drill in which a partner interrupts to ask for details.
Check whether a listener can identify your actual responsibility, the central tradeoff, and evidence of the outcome.
If the story only describes what the team built, add the decision you personally owned.
If it becomes a chronology of meetings, remove events that do not explain that decision.

## Source

[Amazon's SDE II preparation guide](https://amazon.jobs/content/en/how-we-hire/sde-ii-interview-prep) recommends structured STAR answers grounded in experience and identifies behavioral competencies as part of the interview.
The exercises and worksheet above are original practice material.

# Conflict and influence without authority

## Practice prompt

A partner team wants to ship a feature by Friday.
Your team has evidence that its new dependency cannot recover cleanly from an outage.
Explain how you would resolve the disagreement without assuming you can overrule the partner team.
This is a fictional rehearsal scenario; use a real example when an interviewer asks about your past work.

## A defensible approach

Start by finding the shared objective: a useful release with an acceptable failure risk.
Ask what makes Friday important and what evidence would change either team's position.
Separate observations from predictions.
A failed recovery rehearsal is stronger evidence than a general feeling that the design is fragile.

Offer options with concrete consequences: reduce scope, launch to a small population, introduce an operational fallback, or delay.
Name the owner of the decision and the people who will operate the system.
Record the decision and the condition that would trigger rollback or reconsideration.
Escalation is useful when ownership or risk tolerance remains unresolved after the relevant evidence is shared.
It is not a substitute for understanding the disagreement.

## Worked response outline

The candidate explains that the deadline supported a customer event, while the recovery defect could interrupt existing customers.
They reproduce the failure with the partner engineer and agree on an objective acceptance check.
They propose launching only the part that does not depend on the new service.
The product owner accepts the reduced scope, and both teams schedule a recovery exercise before broadening the release.
The answer should explain what the candidate actually did and avoid claiming this fictional outcome as personal experience.

## Follow-up questions

- What if the partner team rejects your evidence?
- Which risks are yours to accept, and which require another decision maker?
- How would you communicate a delay to a customer?
- What if your concern turns out to be wrong?
- How would you preserve trust after escalation?

## Self-review

A strong response represents the other person's incentives fairly, uses evidence, offers alternatives, and makes accountability clear.
A weak response portrays disagreement as incompetence or relies on authority without explaining the tradeoff.
Practice the same story from the partner team's perspective to find missing context.

## Source

[Atlassian's engineering interview handbook](https://www.atlassian.com/company/careers/resources/interviewing/engineering) describes discussion of collaboration, constraints, and values.
Use the role-specific guide and recruiter instructions for the actual interview format.

# Failure, ownership, and learning

## Practice prompt

Describe a decision you made that contributed to a failure.
Explain your responsibility without exaggerating it or shifting it onto a colleague.
Choose an example where you can discuss both recovery and what changed afterward.

## Structure the evidence

| Stage | Useful detail | Avoid |
| --- | --- | --- |
| Before | Assumptions, constraints, and available signals | Claiming the outcome was obvious in advance |
| During | Your decision and its effect | Hiding your role behind “we” |
| Recovery | How impact was reduced and people informed | Treating a heroic rescue as prevention |
| After | A verified change to process or design | Saying only that you became more careful |

## Worked fictional scenario

An engineer approves a migration after testing only a small data set.
Production execution takes longer than expected and delays writes.
A useful answer would acknowledge the missing scale test, explain the evidence used to stop or roll back, and describe how recovery was verified.
It would then explain a concrete prevention step, such as rehearsing with representative volume and establishing a stop condition before the next migration.
The lesson is about validating an assumption under realistic conditions, not simply adding another approval meeting.

## Exercise

Write down three things you knew at the time and three things you learned later.
Rehearse an answer that makes the distinction explicit.
Ask a partner to challenge whether your proposed prevention would actually catch the same failure.
If the answer is no, replace it with a stronger mechanism or explain the remaining risk honestly.

## Follow-up questions

- Who first noticed the problem, and how did you respond?
- What did you tell the affected people before you knew the full cause?
- Which decision would you repeat under the same information?
- How did you know the corrective action worked?
- What did you do differently on the next project?

## Self-review

Give yourself one point each for clear responsibility, accurate impact, a reasoned recovery decision, and evidence of learning.
This four-point checklist is a rehearsal aid, not an employer's assessment rubric.
An answer can be strong without dramatic impact or impressive numbers.
Specific reasoning is more useful than the size of the incident.

# Senior technical judgment and a mock interview

## Choose a decision with competing goals

Prepare a project discussion involving at least two plausible approaches.
Examples include building versus adopting a component, reducing scope to meet a deadline, or choosing between a simple design and one that accommodates expected growth.
Explain who benefited, who paid the operational cost, and which assumptions might change.

## Decision worksheet

| Question | Notes to prepare |
| --- | --- |
| What mattered? | User outcome, correctness, delivery time, cost, reliability |
| What was uncertain? | Unknown workload, incomplete requirements, missing measurements |
| What were the alternatives? | At least two credible options and the existing baseline |
| Why this choice? | Evidence that connects the choice to the constraints |
| How was risk limited? | Small experiment, reversible rollout, ownership, stop condition |
| What happened? | Observed result, unresolved limits, and a later adjustment |

## A 30-minute rehearsal

Spend five minutes describing the project and your responsibility.
Use ten minutes for the decision, including one alternative you rejected.
Allow ten minutes for challenge questions and five for reflection.
A partner should change one constraint halfway through, such as doubling demand or removing a dependency.
Respond by revisiting your assumptions instead of defending the original design at any cost.

## Challenge questions

- What did you deliberately choose not to build?
- How did you make another engineer more effective?
- Which part of the work required influence outside your team?
- What evidence would invalidate your architecture?
- How would a smaller team approach the same problem?

## Review rubric

Score each dimension from zero to two: problem clarity, personal contribution, tradeoff reasoning, collaboration, and outcome evidence.
Zero means missing, one means asserted, and two means explained with a concrete example.
Record one improvement after each rehearsal, then repeat with a different story rather than memorizing a polished monologue.
Ask the interviewer questions that reveal decision ownership, operational expectations, and how success will be assessed in the role.

## Source

[Atlassian's official engineering guide](https://www.atlassian.com/company/careers/resources/interviewing/engineering) provides role-specific interview preparation and emphasizes reasoning about engineering constraints.
The schedule and rubric here are original practice aids and should be adjusted to the actual invitation.
