## Intuition

A day needs one boost exactly when its sales are below 10.
Thus a consecutive run can become entirely good precisely when it contains at most `k` bad days, regardless of their exact sales values.

## Brute force

Trying every interval and counting its bad days costs quadratic time even with prefix counts.
Instead, extending an interval can only increase its boost cost, which gives a monotone condition for a sliding window.

## Approach

Maintain `left`, `cost`, and `best` while `right` scans the array.
Add one to `cost` for a new bad day.
While `cost > k`, remove the contribution at `left` and advance it.
Update `best` using the repaired window length.

## Walkthrough

For `[5, 0, 20, 0, 5]` and `k = 2`, the first three days have cost 2 and length 3.
Adding the next zero forces the leftmost bad day out.
Adding the final 5 requires another removal, and no valid window exceeds length 3.

## Complexity

Each endpoint moves forward at most n times, so total time is O(n), despite the nested shrinking loop.
The references store only counters and endpoints, giving O(1) auxiliary space.
The sales array is not modified.

## Edge cases

With `k = 0`, only existing good day runs are feasible.
With enough boosts for all bad days, the answer is the full length.
An empty input returns zero because no window update occurs.

## Common mistakes

Sales equal to 10 are already good.
Count bad days, not the number of sales needed to reach 10.
Shrink until the budget holds before updating the answer, and allow unused boosts when fewer than `k` are needed.

## Language notes

Python converts the condition to an explicit zero or one contribution.
Java uses a ternary expression and a `long` for `cost`, although the bad day count itself fits the input length.
Both maintain the identical window invariant.
