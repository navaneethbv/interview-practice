## Intuition

The score of a balloon depends on which balloons remain beside it, so choosing the first burst makes the neighbors unpredictable.
Instead choose the last balloon burst inside an interval.
At that moment its two interval boundaries are still present and the left and right subintervals are independent.

## Brute force

Trying every burst order has factorial growth.
Memoizing the remaining set is still expensive because many subsets can occur.
Interval dynamic programming records the best result for every pair of boundaries.

## Approach

1. Add sentinel values of 1 at both ends of values.
2. Let best[left][right] be the best score for balloons strictly between those boundaries.
3. Process intervals from short to long.
4. For each interval, try every last_burst between left and right.
5. Combine the best left interval, best right interval, and the final product.
6. Return best[0][-1].

## Walkthrough

Example 1 uses nums = [3, 1, 5, 8], so values = [1, 3, 1, 5, 8, 1].
For the full interval, `left = 0` and `right = 5` are the two sentinel boundaries.
Smaller intervals have already been solved when the code evaluates each possible `last_burst`.

| Last value | Left subproblem | Right subproblem | Final burst | Total |
| ---: | ---: | ---: | ---: | ---: |
| 3 | 0 | 159 | 3 | 162 |
| 1 | 3 | 48 | 1 | 52 |
| 5 | 30 | 40 | 5 | 75 |
| 8 | 159 | 0 | 8 | 167 |

Thus `best[0][5]` becomes 167.
One corresponding order is 1, 5, 3, then 8, earning 15, 120, 24, and 8 coins.

## Complexity

- Time: O(n³), because there are O(n²) intervals and O(n) last-burst choices.
- Space: O(n²), for the interval table.

## Edge cases

A single balloon earns its value because both sentinels equal 1.
A zero-valued balloon can still be useful as a boundary for other bursts.
The sentinel values model missing neighbors without special cases.
The Java int products remain within the problem's tested result range.

## Common mistakes

- Choosing the first burst instead of the last makes subproblems dependent.
- Omitting the sentinel 1 changes edge scores.
- Processing long intervals before short ones reads uncomputed states.
- Using an exclusive or inclusive interval definition inconsistently shifts indices.

## Language notes

Python builds values with list concatenation.
Java allocates the padded array and copies the input with System.arraycopy.
Both implementations use the same half-open interval meaning for best[left][right].
