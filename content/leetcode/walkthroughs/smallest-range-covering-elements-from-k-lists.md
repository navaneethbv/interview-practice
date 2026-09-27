## Intuition

At every moment, a valid range must include one value from each sorted row.
The heap exposes the current `low`, while `high` tracks the largest selected value.
Advancing the row that supplied the low value is the only move that can raise the lower boundary without losing coverage.

## Brute force

Trying every possible lower and upper pair and checking all rows costs O(T²K), where T is the total number of values and K is the row count.
The heap keeps only one candidate from each row and advances exactly one row after each range check.

## Approach

1. Push each row's first value into `pending` and set `high` to their maximum.
2. Pop `(low, row_index, value_index)` and compare `[low, high]` with `answer`.
3. Prefer a shorter range, then the smaller `low` when lengths tie.
4. Advance that row, update `high`, and push its next value.
5. Stop when one row has no next value, since coverage cannot continue after it is exhausted.

## Walkthrough

Example 1 begins with heap values 0, 4, and 5, so `high = 5` and the first range is `[0,5]`.

| popped low | new value from that row | updated high | best range |
| ---: | ---: | ---: | --- |
| 0 | 9 | 9 | `[0,5]` |
| 4 | 10 | 10 | `[0,5]` |
| 5 | 18 | 18 | `[0,5]` |
| 9 | 12 | 18 | `[0,5]` |
| 10 | 15 | 18 | `[0,5]` |
| 12 | 20 | 20 | `[0,5]` |
| 15 | 24 | 24 | `[0,5]` |
| 18 | 22 | 24 | `[0,5]` |
| 20 | row 1 exhausted | 24 | `[20,24]` |

The final range `[20,24]` covers 20, 22, and 24.

## Complexity

- Time: O(T log K), because each of T values is pushed or popped once from a K-element heap.
- Space: O(K), for one heap entry per row and the fixed-size answer.

## Edge cases

One row produces a range containing one value.
Equal values can produce a zero-length range.
Negative values work because comparisons use ordinary integer ordering.
Tie ranges keep the smaller lower endpoint as required by the reference comparison.

## Common mistakes

- Advancing a row other than the one that supplied `low` can lose the current minimum.
- Comparing only range length misses the required lower-endpoint tie break.
- Continuing after a row is exhausted creates an invalid range without one value from every row.

## Language notes

Python uses tuple heap ordering for the value and row metadata.
Java's `PriorityQueue<int[]>` compares the first element explicitly, while the tie rule is applied when updating the answer.
Both implementations keep the sorted input rows unchanged.
