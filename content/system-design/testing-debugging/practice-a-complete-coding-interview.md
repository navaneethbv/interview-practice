## Format

Use a 45-minute rehearsal for a problem that is unfamiliar but within your current skill level.
The time allocation below is a study aid, not a company's official schedule.
A partner can play the interviewer, or you can record yourself and review afterward.

| Minutes | Task | Evidence to produce |
| --- | --- | --- |
| 0-5 | Clarify the contract | Inputs, outputs, constraints, examples |
| 5-12 | Explore approaches | Baseline, improved approach, reason for the choice |
| 12-30 | Implement | Clear names, maintained invariant, complete return behavior |
| 30-40 | Test and debug | Ordinary case, boundary case, independent expected result |
| 40-45 | Explain tradeoffs | Complexity, limitations, one follow-up |

## Interviewer script

Ask the candidate to explain the simplest correct approach before optimizing.
If they get stuck, ask what information must be retained from earlier work rather than naming the intended data structure.
Record the hint you supplied so the review does not confuse independent progress with assisted progress.
Introduce one contract change only after the original solution is coherent.

## Review rubric

Score problem understanding, reasoning, implementation, testing, and communication from zero to two.
Zero means absent, one means incomplete or prompted, and two means independently demonstrated with evidence.
An accepted result alone does not prove the candidate explained their reasoning or checked the important boundaries.
Conversely, one corrected typo is less significant than a persistent misunderstanding of the contract.

## Reflection

Write one sentence about the largest source of lost time.
Choose a focused follow-up: boundary tests, a particular pattern, language fluency, or explaining an invariant.
Revisit the problem later from a blank editor and explain why each step is necessary.
Avoid spending the entire review copying an optimal solution that you cannot yet justify.

## Source

[Microsoft's technical interview guidance](https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing.html) discusses clarification, design, coding, and testing.
The schedule and assessment scale are original rehearsal tools.
