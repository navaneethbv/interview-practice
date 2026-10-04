## Intuition

Translate each day into the number of boosts needed to make it good.
Sales of at least 10 cost zero, sales from 5 through 9 cost one, and smaller values cannot be repaired by a single allowed boost.

## Brute force

Enumerate all consecutive intervals and count repairable bad days while rejecting intervals containing an unrepairable day.
Even with running counts, there are O(n squared) candidate intervals to inspect.

## Approach

The reference maintains a window from `left` through `right` and its repair `cost`.
An unrepairable day contributes `len(sales) + 1`, a value larger than every allowed budget.
After extending the right boundary, remove leftmost contributions until `cost <= k`.
Only then update `best` with the valid window length.
Because all contributions are nonnegative, extending a window cannot repair an excessive cost, which makes forward-only shrinking correct.

## Walkthrough

In Example 1, `sales = [10, 5, 8]` and `k = 1`.
The first day costs zero and gives length one.
Adding 5 costs one and increases `best` to two.
Adding 8 raises the cost to two.
Removing 10 leaves it unchanged; removing 5 restores cost one and leaves only the last day.
The answer remains 2.

## Complexity

Time is O(n) because each day enters and leaves the window at most once.
Auxiliary space is O(1), with costs calculated directly from the input.

## Edge cases

An empty input returns zero.
With no boosts, the window contains only already-good days.
Even a large budget cannot make a day below 5 good.

## Common mistakes

Do not charge every bad day one boost or repeatedly boost the same day.
Update `best` after restoring the budget condition, rather than while the window is invalid.

## Language notes

Python represents `cost` with an arbitrary-precision integer.
Java uses `long` for the cost and a long-valued sentinel, while window indices and the returned length remain integers.
