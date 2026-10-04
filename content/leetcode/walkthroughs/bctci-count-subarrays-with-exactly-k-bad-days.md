## Intuition

Exactly k bad days can be isolated by subtracting two nested families of subarrays.
Counting interval occurrences is different from finding just the longest acceptable window.

## Brute force

Checking every start and end with a running bad-day count takes O(n squared) time.
Repeated full scans of each interval are even more expensive.

## Approach

Return `_at_most(sales, k) - _at_most(sales, k - 1)`; only intervals with exactly k survive.
The helper `_at_most` counts subarrays by their right endpoint.
It maintains `left` and the number of bad days in the current window, shrinking while that count exceeds the supplied limit.
After shrinking, all `right - left + 1` suffixes of the window are valid, since removing days cannot increase the bad-day count.
Starts before left are invalid because the loop already discarded them while the budget was exceeded.
A negative limit returns zero immediately.

## Walkthrough

```text
Input: sales = [0, 20, 5], k = 1
Output: 4
```

For Example 1, the at-most-one pass counts five intervals.
The at-most-zero pass counts only `[20]`, giving one.
Their difference is four: `[0]`, `[0, 20]`, `[20, 5]`, and `[5]`.
The full interval has two bad days and is excluded.

## Complexity

Each helper pass takes O(n) time because both boundaries only move forward.
The overall method uses at most two linear passes and O(1) extra space.
The answer can grow quadratically even though the computation is linear.

## Edge cases

When k is zero, subtracting the negative-limit result leaves exactly the intervals with no bad days.
An empty sales array contributes zero.
A day with exactly 10 sales is good.

## Common mistakes

Do not add only one per endpoint; every valid suffix must be counted.
Keep threshold comparisons strict at fewer than 10 sales.

## Language notes

Python treats comparisons as zero-or-one values in the counter.
Java uses explicit branches and long result arithmetic to avoid overflow when counting many intervals.
