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
