## Intuition

All sales values are nonnegative, so expanding a window never decreases its total.
Once a window exceeds 20, removing values from the left finds the shortest qualifying window ending at the current right index.
Taking the best over all right endpoints gives the global minimum.

## Brute force

Checking every consecutive interval takes quadratic time.
The sliding window advances each endpoint at most once and avoids revisiting sums.

## Approach

1. Maintain `left`, the current window start, and `total`, its sales sum.
2. Add each `sales[right]` as the right endpoint advances.
3. While `total > 20`, record the current length and remove `sales[left]`.
4. Return the smallest recorded length, or `-1` if no window qualified.

## Walkthrough

Example 1 adds 5, then 10, then 15, reaching a total of 30 at right index 2.
The window `[10, 15]` has length 2 after removing the first 5, and it is recorded before the sum is reduced again.
The later values create no shorter qualifying window, so the answer remains 2.

## Complexity

- Time: O(n), because `left` and `right` each move only forward.
- Space: O(1), using the running sum, pointers, and best length.

## Edge cases

An empty sales list returns `-1`.
A single value above 20 returns 1.
A total exactly 20 does not qualify because the rule requires more than 20.
All-zero or uniformly small values leave the sentinel best length unchanged.

## Common mistakes

- Shrinking while `total >= 20` incorrectly accepts an exact total of 20.
- Forgetting to record the window before removing its left value misses the shortest ending window.
- Using a negative-value sliding-window argument would be invalid, but the constraints guarantee nonnegative sales.
- Returning the sentinel instead of `-1` leaks an internal state.

## Language notes

Python uses `len(sales) + 1` as an impossible best length.
Java uses the same sentinel and integer totals because the maximum window sum fits within the stated bounds.
