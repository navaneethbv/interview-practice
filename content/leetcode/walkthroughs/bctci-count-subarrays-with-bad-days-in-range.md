## Intuition

Counting intervals with an upper bound is easier than maintaining both bounds at once.
The desired inclusive range equals the number with at most `k2` bad days minus the number with at most `k1 - 1` bad days.

## Brute force

Enumerate every starting position and extend each interval while counting sales below 10.
That gives a straightforward O(n squared) method, but repeats window work across adjacent starts.

## Approach

`_at_most` maintains `left`, `bad`, and `total` while advancing `right`.
Add the entering day's bad-day indicator, then advance `left` until the count fits the budget.
Every suffix of this valid window ending at `right` is also valid, so add `right - left + 1`.
Return zero immediately for a negative budget.
Subtract the two upper-bound counts to exclude exactly the intervals with too few bad days.

## Walkthrough

Example 1 uses `[0, 20, 5]`, `k1 = 1`, and `k2 = 2`.
All six nonempty subarrays contain at most two bad days.
With budget zero, only `[20]` qualifies, so the second helper returns one.
Subtracting gives five.
The interval `[0, 20, 5]` remains included because the upper bound is inclusive.

## Complexity

Each helper takes O(n) time because both window boundaries move only forward.
Two helper calls still take O(n) overall, with O(1) auxiliary space.

## Edge cases

When `k1` is zero, the negative-budget helper returns zero rather than attempting to shrink an impossible window.
Empty inputs return zero.
A bound larger than the number of bad days permits every interval.

## Common mistakes

Subtracting the count at `k1` would incorrectly exclude intervals with exactly the lower-bound number of bad days.
Classify sales equal to 10 as good.

## Language notes

Python adds and subtracts Boolean indicators as integers.
Java uses explicit branches for those updates and a long-valued total to accommodate quadratically many qualifying intervals.
