## Intuition

At each house, either skip it and retain the best earlier total, or take it and exclude its immediate neighbor.
The second choice needs only the best total from two houses earlier.
Keeping those two prefix answers is enough to evaluate every allowed selection.

## Brute force

Recursively explore taking or skipping each house, rejecting adjacent selections.
Without memoization, this takes exponential time because many branches revisit the same remaining street.
A prefix DP removes that repeated work and can be reduced to two scalar states.

## Approach

1. Use rolling dynamic programming with `older = 0` and `previous = 0` for empty starting prefixes.
2. For each house's `value`, compare skipping it (`previous`) with taking it (`older + value`).
3. Move the old `previous` into `older` and store the better candidate in `previous`.
4. Return `previous` after the last house.

Before an iteration, `previous` is optimal through the preceding house and `older` through the house before that.
Taking the current house together with `older` therefore cannot select its immediate neighbor.
The two choices exhaust all valid ways an optimal selection can treat the current house.

## Walkthrough

Example 1 uses `nums = [3, 2, 5, 1]`.

| `value` | Skip candidate | Take candidate | New `older` | New `previous` |
| --- | --- | --- | --- | --- |
| 3 | 0 | 3 | 0 | 3 |
| 2 | 3 | 2 | 3 | 3 |
| 5 | 3 | 8 | 3 | 8 |
| 1 | 8 | 4 | 8 | 8 |

The best selection takes 3 and 5, for a total of 8.
The final house is skipped.

## Complexity

- Time: O(n), evaluating two candidates for each house.
- Space: O(1), retaining only neighboring prefix answers.

## Edge cases

A single house returns its value.
All-zero houses produce zero, and equal values are handled without committing to a unique selection.
The references also return zero for an empty array, though the statement requires at least one house.

## Common mistakes

- Adding the current value to `previous` can choose adjacent houses.
- Greedily taking the largest individual house can exclude a better pair.
- Always choosing odd or even indices misses optimal mixed-parity selections.

## Language notes

Python uses simultaneous assignment to preserve both old states during the transition.
Java stores the new answer in `next` before shifting the variables.
All totals under the stated bounds fit comfortably in Java `int`, and neither version modifies the input.
