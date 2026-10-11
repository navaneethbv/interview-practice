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

# Introductions: "Tell me about yourself" and "Why us?"

Almost every interview opens with one of these.
They are not small talk: they set the frame the interviewer uses for the rest of the conversation.
Reviewed October 11, 2026.

## "Tell me about yourself" in 90 seconds

Use three parts and stop:

1. **Now:** your current role and the problems you work on, in one or two sentences.
2. **Evidence:** one or two achievements that match the job, each with your contribution and a result.
3. **Next:** why this role is the logical next step.

```text
I'm a backend engineer at a logistics company, where I own the routing service that plans about
40,000 deliveries a day. Last year I led the move from nightly batch planning to incremental
re-planning, which cut late deliveries by a third. I've enjoyed the distributed-systems side most,
and this role's focus on high-throughput event processing is where I want to go deeper.
```

Avoid reciting your resume in date order, personal history unrelated to the job, and anything you are not ready to be asked about in depth.

## "Why this company?" and "Why this role?"

A strong answer is specific enough that it could not be pasted into another company's interview.
Connect something concrete about the company (a product, an engineering problem, a published practice) to something concrete about you.
Read the company's engineering blog, recent product launches and the job description before the interview.

Weak: "You're a leader in the industry and I want to grow."
Stronger: "Your payments team writes about moving the ledger to an event-sourced model. I built the reconciliation pipeline for our ledger, and I'd like to work on that problem at a larger scale."

## Exercise

Write both answers, read them aloud with a timer, and cut until each fits in 90 seconds.
Ask a friend which single sentence they remember; that sentence should be the one you most want them to remember.

# Company-specific preparation

Companies describe what they look for in behavioral interviews on their own careers pages.
Read those pages for each company in your loop, then map your stories to the stated values.
This chapter summarizes public material; it is not an internal rubric.

## Amazon: Leadership Principles

Amazon's behavioral questions are organized around its 16 Leadership Principles, and interviewers commonly probe several in one loop:
Customer Obsession; Ownership; Invent and Simplify; Are Right, A Lot; Learn and Be Curious; Hire and Develop the Best;
Insist on the Highest Standards; Think Big; Bias for Action; Frugality; Earn Trust; Dive Deep;
Have Backbone, Disagree and Commit; Deliver Results; Strive to be Earth's Best Employer; Success and Scale Bring Broad Responsibility.

Prepare at least two stories per principle you expect for your level, and expect deep follow-ups asking for data and your exact role.
Amazon's guidance asks for STAR-structured answers: see its [interview preparation pages](https://amazon.jobs/content/en/how-we-hire/interview-prep).

## Google: general qualities

Google's hiring pages describe assessing general cognitive ability, leadership, role-related knowledge, and "Googleyness",
which covers working well with others, comfort with ambiguity and doing the right thing.
Expect hypothetical questions ("What would you do if...") as well as questions about past behavior; answer hypotheticals with a structured approach and an example from your experience.
See [How we hire](https://www.google.com/about/careers/applications/how-we-hire/).

## Meta and others

Many companies run a dedicated behavioral round covering conflict, collaboration, feedback, growth and impact.
Read each company's interview preparation page, ask your recruiter which round types you have, and prepare stories for each theme.

## Mapping stories to values

| Your story | Values it can support | The follow-up to expect |
| --- | --- | --- |
| Migrating a service with no downtime | Ownership, Deliver Results, Dive Deep | What could have gone wrong, and how did you know it didn't? |
| Pushing back on a launch date | Have Backbone, Customer Obsession, Earn Trust | What did you lose by delaying? |
| Mentoring a new hire | Hire and Develop the Best | How did you measure their progress? |

Use each story for its strongest two or three values rather than stretching one story across everything.

# Common questions and your story map

Interviewers rephrase the same handful of themes.
If your story bank covers the themes, you can answer most questions without a new story.

| Question as asked | Theme | Story from your bank |
| --- | --- | --- |
| Tell me about a time you disagreed with your manager. | Conflict | |
| Describe a project that failed. | Failure | |
| Tell me about a time you missed a deadline. | Failure, ownership | |
| When did you go beyond your role? | Ownership | |
| Tell me about a decision you made with incomplete information. | Ambiguity | |
| Describe the most technically complex thing you built. | Technical judgment | |
| Tell me about a time you received critical feedback. | Learning | |
| How have you helped someone on your team grow? | Mentoring | |
| Tell me about a time you simplified something. | Technical judgment | |
| Describe a time you had to influence another team. | Conflict, influence | |
| When did you have to say no to a stakeholder? | Conflict, prioritization | |
| Tell me about a time you used data to change a decision. | Technical judgment | |

Fill in the last column from your own bank.
A blank cell shows which story to prepare next.

## Handling a question you have no story for

Say so briefly, then give the closest real example, or explain how you would approach the situation and why.
An honest near match is better than an invented story, which tends to collapse under follow-up questions.

# Questions to ask your interviewers

Most rounds end with time for your questions.
Good questions help you decide whether to join, and show what you care about.

## By interviewer

- **Engineer:** What does a typical week look like? How do changes get reviewed and deployed? What broke recently and how was it handled?
- **Manager:** How do you measure success for this role in the first six months? How are projects chosen? How do people get promoted here?
- **Senior leader:** What are the team's biggest bets this year? What would make you say this team succeeded?
- **Recruiter:** What are the next steps and timeline? How is the team matched? What is the compensation structure?

## Questions that reveal how the team works

- When two teams disagree on priorities, how is it resolved?
- How much on-call does the team carry, and how has that changed?
- What did the last person in this role move on to?

Avoid questions answered on the first page of the company's website, and do not ask about compensation in technical rounds.

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
