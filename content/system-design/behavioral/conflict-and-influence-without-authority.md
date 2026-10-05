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
