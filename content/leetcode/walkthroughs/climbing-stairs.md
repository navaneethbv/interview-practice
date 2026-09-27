## Intuition

Every route to a step ends with either a one-step move or a two-step move.
Removing that final move leaves a route to one of the previous two steps.
These two groups are disjoint, so adding their counts gives the number of routes to the current step.

## Brute force

Recursively try both possible next moves until reaching the top.
Without memoization, this takes exponential time because the same remaining distances are solved repeatedly.
The recurrence needs only the previous two counts, so even a full memo table is unnecessary.

## Approach

1. Use rolling dynamic programming with one way to reach step zero and one way to reach step one.
2. Store these counts in `previous` and `current`, both initially one.
3. For `step` from 2 through `n`, compute the sum of those two counts.
4. Shift the states forward so `previous` holds the former `current` and `current` holds the new count.
5. Return `current`.

The zero-step count is one because the empty sequence is a valid starting prefix.
It lets the two-step move contribute correctly when computing step two.

## Walkthrough

Example 1 uses `n = 4`.

| Step reached | `previous` afterward | `current` afterward | Calculation |
| --- | --- | --- | --- |
| 1 | 1 | 1 | Initial states for steps 0 and 1 |
| 2 | 1 | 2 | `1 + 1` |
| 3 | 2 | 3 | `1 + 2` |
| 4 | 3 | 5 | `2 + 3` |

The five routes are `1111`, `112`, `121`, `211`, and `22`.
Their differing move orders matter, so `112` and `211` are distinct routes.

## Complexity

- Time: O(n), computing each step count once.
- Space: O(1), retaining only two neighboring counts.

## Edge cases

For one step, the loop does not run and returns one.
For two steps, the routes are two single moves or one double move.
The supported maximum n of 45 still has a result within signed 32-bit range.

## Common mistakes

- Initializing the zero-step count to zero loses routes beginning with a two-step move.
- Updating both variables sequentially without preserving the old values corrupts the recurrence.
- Counting unordered combinations ignores the sequence-order requirement.

## Language notes

Python's tuple assignment evaluates both right-hand expressions before changing the states.
Java saves the sum in `next` before updating `previous` and `current`.
The loop stops at the requested step, avoiding an unnecessary computation of the larger next Fibonacci count.
