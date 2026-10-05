# Turn a problem statement into a test strategy

A test strategy starts from the contract, not from the branches in your implementation.
Identify input boundaries, required outputs, mutation rules, and invalid inputs before writing the main algorithm.
Microsoft explicitly includes testing in its technical interview guidance.
The exercises here are original and can be practiced with Python or Java.
Reviewed October 4, 2026.

## Example contract

Implement `first_at_least(values, target)` for an ascending integer array.
Return the first index whose value is at least the target, or the array length when no such element exists.
The function must not modify the input.

| Input | Target | Expected | Why |
| --- | --- | --- | --- |
| `[]` | 4 | 0 | Empty boundary |
| `[2]` | 2 | 0 | Exact match |
| `[2]` | 3 | 1 | Insertion after the end |
| `[1, 3, 3, 7]` | 3 | 1 | First of several duplicates |
| `[1, 3, 3, 7]` | 4 | 3 | Gap between values |
| `[-5, -2, 0]` | -8 | 0 | Insertion before the beginning |

## Independent checks

For small generated arrays, compare the binary-search answer with a simple linear scan.
The slower oracle should follow a different implementation path so it is unlikely to repeat the same defect.
Also check that all values before the returned index are less than the target and all values from the index onward are at least the target.
Preserve a copy of the input to verify the no-mutation contract.

## Exercise

Explain why a test containing only distinct positive values is insufficient.
Then choose the smallest test that distinguishes returning any equal element from returning the first one.
The array `[3, 3]` with target 3 is enough if the implementation returns index 1.
A large random test is unnecessary when a two-element example isolates the mistake.

## Interview habit

Before declaring the solution complete, walk through one ordinary case and one boundary case out loud.
Explain why the test is useful instead of merely listing inputs.
The goal is to show how you establish correctness under the actual contract.

## Source

[Microsoft technical interviewing guidance](https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing.html) identifies testing as an expected engineering skill.

# Debug a binary search by preserving an invariant

## The faulty implementation

The contract is the same lower-bound search described in the previous chapter.
Find a failing input before reading the explanation.

```python
def first_at_least(values, target):
    low, high = 0, len(values)
    while low < high:
        middle = (low + high) // 2
        if values[middle] <= target:
            low = middle + 1
        else:
            high = middle
    return low
```

## Reproduce and explain

With `[1, 3, 3, 7]` and target 3, the function returns 3 rather than 1.
At `middle = 2`, the value equals the target, but the branch discards it and everything before it.
The code computes the first position strictly greater than the target.
That is a valid operation with a different contract.

## Correct the cause

```python
def first_at_least(values, target):
    low, high = 0, len(values)
    while low < high:
        middle = (low + high) // 2
        if values[middle] < target:
            low = middle + 1
        else:
            high = middle
    return low
```

Maintain a half-open candidate interval `[low, high)`.
Every excluded position before `low` has a value below the target.
Every excluded position at or beyond `high` has a value at least the target.
When the interval becomes empty, its boundary is the required insertion position.
The interval shrinks on every iteration, giving O(log n) time and O(1) extra space.

## Regression and follow-up

Keep the duplicate-equality case and the empty-array case.
Check a target larger than every value to ensure the answer can equal the array length.
For Java, use `low + (high - low) / 2` to avoid addition overflow in the midpoint expression.

Now change the contract to return the last index equal to the target, or -1 if absent.
Explain why subtracting one from an upper-bound result still requires an equality check.
The important skill is adapting the invariant when the contract changes.

# Review code for boundaries and concurrency

## Review prompt

A service must allow at most one successful reservation for a seat.
Assume two callers can execute concurrently.
Review this pseudocode without changing it first.

```text
reserve(seatId, customerId):
    if not store.isReserved(seatId):
        store.saveReservation(seatId, customerId)
        return success
    return unavailable
```

## Concrete failure

Caller A observes an unreserved seat.
Caller B observes the same state before A saves.
Both callers then save and may both receive success.
A single-threaded unit test will not reproduce this interleaving.
The defect is the gap between checking the condition and enforcing it.

## Proposed correction

Make claiming the seat an atomic storage operation.
For a relational model, a unique constraint on the seat's active ownership plus a transaction can enforce the rule.
Handle the losing claim as an expected unavailable result, and distinguish it from a connection failure.
For an in-memory exercise, a shared lock around the check and update is sufficient only within the process that owns that lock.

## Regression design

Coordinate two callers with a barrier so both attempt to claim the same seat.
Assert one success, one unavailable result, and one stored owner.
Do not assert only that an exception happened.
Also test different seats to ensure the correction has not accidentally forbidden unrelated reservations.

## Review checklist

- Does the code enforce the documented ownership boundary?
- Can a retry repeat a completed action?
- Are errors distinguishable from ordinary business outcomes?
- What happens between an external effect and the local success record?
- Does the test observe stored state as well as the returned response?

## Follow-up

Add a reservation expiry time.
Explain which clock determines expiration and how an old holder is prevented from releasing a newer reservation.
An identifier or generation number ties the release to the ownership it is allowed to modify.
The model must distinguish “this seat was once mine” from “this reservation still owns it.”

# Practice a complete coding interview

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
