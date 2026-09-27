## Intuition

Water above a bar is limited by the smaller of the tallest boundaries to its left and right.
If the known left boundary is no taller than the known right boundary, the left side can be finalized without knowing more of the interior.
The symmetric rule lets two pointers accumulate water using constant extra space.

## Brute force

For each bar, scan both sides to find their maximum heights and compute the enclosed water.
This takes O(n²) time.
Prefix and suffix maximum arrays reduce time to O(n) but use O(n) space; two running maxima avoid those arrays.

## Approach

1. Initialize endpoint pointers, both running maxima to zero, and `total = 0`.
2. If the left maximum is no greater than the right maximum, update it with the current left bar.
3. Add the left maximum minus that bar's height and advance the left pointer.
4. Otherwise perform the symmetric update and accumulation on the right.
5. Continue until every position is consumed and return `total`.

If a newly encountered bar exceeds the previous limiting boundary, it contributes zero water and raises that boundary for future positions.
Otherwise the known opposite boundary is already tall enough to justify the accumulated amount.

## Walkthrough

Example 1 uses `height = [3, 0, 2, 0, 3]`.

| Position consumed | Running left/right maxima afterward | Water added | `total` |
| --- | --- | --- | --- |
| Left index 0 | 3, 0 | 0 | 0 |
| Right index 4 | 3, 3 | 0 | 0 |
| Left index 1 | 3, 3 | 3 | 3 |
| Left index 2 | 3, 3 | 1 | 4 |
| Left index 3 | 3, 3 | 3 | 7 |

The three interior bars hold 3, 1, and 3 units respectively.
Return 7.

## Complexity

- Time: O(n), processing each bar once.
- Space: O(1), with two pointers, two maxima, and an accumulator.

## Edge cases

An increasing or decreasing profile traps no water.
One or two bars cannot enclose an interior depression.
Zeros between high boundaries can hold substantial water.
Equal running maxima may process either side; these references choose the left.

## Common mistakes

- Using the taller boundary instead of the shorter one overestimates water.
- Subtracting before updating the side maximum can add negative water at a new peak.
- Confusing total trapped water with the largest two-line container solves a different problem.

## Language notes

Python uses `left_max` and `right_max`; Java uses `leftMax` and `rightMax` for the same state.
The stated dimensions and height bound keep total water below 2,000,000,000, within Java `int`.
Both implementations leave the height array unchanged.
