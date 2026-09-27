## Intuition

Sorting lets one comparison eliminate half the remaining positions.
If the middle value is below `target`, every position to its left is too small as well.
Maintain an inclusive interval containing every position where the target could still occur.

## Brute force

A linear scan compares the target with each value in O(n) time and O(1) extra space.
It works, but does not meet the statement's O(log n) time requirement.

## Approach

1. Use binary search with `left = 0` and `right = len(nums) - 1`.
2. While `left <= right`, compute `middle` halfway between the bounds.
3. Return `middle` if its value equals `target`.
4. If its value is smaller, set `left = middle + 1`.
5. Otherwise, set `right = middle - 1`.
6. Return -1 when the interval becomes empty.

The discarded half cannot contain the target because `nums` is increasing.
Excluding `middle` after an unsuccessful comparison guarantees progress even when just one candidate remains.
This invariant explains both why a found index is correct and why exhausting the interval proves absence.

## Walkthrough

Example 1 searches for 8 in `[-5, -1, 3, 8, 12]`.

| `left` | `right` | `middle` | Value | Decision |
| --- | --- | --- | --- | --- |
| 0 | 4 | 2 | 3 | Too small; move `left` to 3 |
| 3 | 4 | 3 | 8 | Equal; return 3 |

There is no need to inspect index 4 or revisit indices 0 through 2.
The returned value is the zero-based position, not the number stored there.

## Complexity

- Time: O(log n), because each unsuccessful comparison at least halves the candidate interval.
- Space: O(1), because the iterative search stores only bounds and a midpoint.

## Edge cases

A one-element array performs exactly one comparison.
A target below the first element or above the last eventually empties the interval.
Negative values need no special treatment because the algorithm compares values rather than treating them as positions.
The contract excludes duplicates and empty arrays, although the loop also handles an empty array by returning -1.

## Common mistakes

- Using `left < right` with these updates skips the final candidate.
- Assigning `left = middle` can repeat an interval forever.
- Returning `nums[middle]` returns a value instead of an index.

## Language notes

Python uses integer floor division `//`; Java uses integer `/` for the nonnegative index difference.
Both references compute `left + (right - left) / 2` in their language's syntax, avoiding the potentially overflowing sum of two bounds in Java.
