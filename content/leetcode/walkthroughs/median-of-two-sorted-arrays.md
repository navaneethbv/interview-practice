## Intuition

A median divides sorted values into a lower half and an upper half.
Choose a cut in each array so the lower half contains `(total + 1) // 2` entries.
The cuts are correct when neither array's left boundary exceeds the other array's right boundary.

## Brute force

Merge the arrays and read the middle entry or entries.
That takes O(m + n) time and O(m + n) storage for a materialized merge, exceeding the requested logarithmic time.
Binary search can locate the boundary without building the merged order.

## Approach

1. Search the shorter array, swapping the arguments once if necessary.
2. Binary-search `cut1` between zero and the shorter array's length.
3. Set `cut2 = (total + 1) // 2 - cut1` so the left side has the required size.
4. Read `left1`, `right1`, `left2`, and `right2`, using boundary sentinels for empty sides.
5. If `left1 <= right2` and `left2 <= right1`, return the largest left value for an odd total, or average it with the smallest right value for an even total.
6. If `left1 > right2`, move `cut1` left; otherwise move it right.

Searching the shorter array keeps the derived second cut within range.
Each failed comparison identifies which side contains too many large values, preserving the binary-search invariant.

## Walkthrough

Example 1 gives `[1, 5]` and `[2]`.
The references first swap them, making `nums1 = [2]` and `nums2 = [1, 5]`.

| `cut1` | `cut2` | Left boundaries | Right boundaries | Decision |
| --- | --- | --- | --- | --- |
| 0 | 2 | Negative sentinel, 5 | 2, positive sentinel | 5 exceeds 2; move right |
| 1 | 1 | 2, 1 | Positive sentinel, 5 | Valid partition |

There are three values, so the median is `max(2, 1) = 2`.
The numerical answer is 2.0.

## Complexity

- Time: O(log(min(m, n) + 1)), searching possible cuts in the shorter array, with constant work when it is empty.
- Space: O(1), including at most one recursive argument swap.

## Edge cases

One array may be empty, but both cannot be empty.
Duplicate values require inclusive boundary comparisons.
An even total requires a fractional average rather than integer division.

## Common mistakes

- Searching the longer array can produce an invalid second cut.
- Forgetting the extra left-side entry for odd totals selects the wrong median.
- Reading a boundary element before checking for an empty side causes invalid indexing.

## Language notes

Python uses floating-point infinities as sentinels; Java uses integer extrema, safely outside the stated value range.
Java converts a boundary value to `double` before summing for an even median, avoiding integer overflow and truncation.
Neither implementation copies or merges the arrays.
