## Intuition

Only the two current intervals need comparison because each input list is already ordered and internally disjoint.
Their overlap begins at the larger start and ends at the smaller end.
After that comparison, the interval ending first cannot intersect any later interval on the other side, so its pointer can advance.

## Brute force

Compare every interval in the first list with every interval in the second.
For lengths m and n, that costs O(mn) time and may require sorting collected intersections afterward.
Two pointers exploit the existing order to avoid checking pairs that cannot overlap.

## Approach

1. Initialize `first_index` and `second_index` at zero and an empty result.
2. Let `start` be the maximum of the current starts and `end` the minimum of the current ends.
3. Append `[start,end]` when `start <= end`.
4. Advance the pointer whose interval has the smaller end; on equal ends, advance the second pointer.
5. Stop when either list is exhausted.

On an equal-end tie, advancing just one pointer is sufficient: the exhausted counterpart will be skipped safely during the next comparison.

## Walkthrough

Example 1 compares `[[1,3],[5,7]]` with `[[2,6]]`.

| Current intervals | Candidate overlap | Pointer advanced |
| --- | --- | --- |
| `[1,3]`, `[2,6]` | `[2,3]` | first, because 3 is smaller |
| `[5,7]`, `[2,6]` | `[5,6]` | second, because 6 is smaller |

The second list is now exhausted.
The accumulated result `[[2,3],[5,6]]` is already sorted by start.
The interval `[2,6]` correctly participates in two intersections because it remains current after the first comparison.

## Complexity

- Time: O(m + n), because each pointer advances at most its list length.
- Space: O(R) for R returned intersections, with O(1) traversal state beyond the result.

## Edge cases

An empty input list gives an empty result.
Touching closed endpoints form a valid one-point intersection.
Nested intervals are handled by retaining the longer-reaching interval.
The inputs are not mutated.

## Common mistakes

- Using `start < end` incorrectly rejects point intersections.
- Advancing the later-ending interval can skip an overlap with the next interval.
- Applying this rule to unsorted, internally overlapping lists breaks its reasoning.

## Language notes

Python appends two-item lists to `intersections`.
Java accumulates `int[]` entries and converts the outer collection to `int[][]` at return.
Neither implementation subtracts endpoints, so their comparisons are safe for the allowed billion-sized coordinates.
