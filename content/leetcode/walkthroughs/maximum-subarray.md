## Intuition

A best segment ending at today's value either starts today or extends the best segment ending immediately before it.
A negative earlier sum cannot help an extension, so the larger of those two choices captures everything needed.
This is Kadane's algorithm, a dynamic program with one state for the current endpoint.

## Brute force

Enumerate every start and end, maintaining a running sum as the end advances.
Even without recomputing each sum, this requires O(n²) time, too much for 100,000 entries.

## Approach

1. Initialize `current` and `best` to `nums[0]`, since the chosen segment must be nonempty.
2. For each later `value`, set `current = max(value, current + value)`.
3. Set `best = max(best, current)` to retain the best segment over all endpoints processed so far.
4. Return `best`.

The transition considers every segment ending at the current index: the singleton or an extension.
Among extensions, only the greatest previous sum can help because all receive the same new value.

## Walkthrough

Example 1 uses `nums = [-3, 4, -1, 2, -6]`.

| `value` | Best segment ending here | `current` | `best` |
| --- | --- | --- | --- |
| -3 | `[-3]` | -3 | -3 |
| 4 | `[4]` | 4 | 4 |
| -1 | `[4, -1]` | 3 | 4 |
| 2 | `[4, -1, 2]` | 5 | 5 |
| -6 | `[4, -1, 2, -6]` | -1 | 5 |

The last endpoint is not optimal, so returning `current` would be wrong.
The retained `best` is 5.

## Complexity

- Time: O(n), with one transition per element after the first.
- Space: O(1), because the references retain scalar state and do not slice the input.

## Edge cases

All-negative inputs return the least negative entry, rather than an invalid empty segment with sum zero.
A single entry is already the answer.
Zeros can extend or restart a segment without changing the optimal sum.
The input must be nonempty under the statement's contract.

## Common mistakes

- Initializing `best` to zero fails on all-negative arrays.
- Returning only the final endpoint state loses an earlier maximum.
- Skipping negative entries creates a subsequence instead of a contiguous subarray.

## Language notes

Python iterates over indices instead of `nums[1:]`, avoiding an otherwise linear-size slice.
Java uses `Math.max` with `int` state.
The largest absolute sum under the bounds is at most 1,000,000,000, safely inside Java's signed 32-bit range.
