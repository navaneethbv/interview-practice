## Intuition

At most k bad days is a monotone window condition: removing days cannot make a valid interval invalid.
Counting interval occurrences is different from finding just the longest acceptable window.

## Brute force

Checking every start and end with a running bad-day count takes O(n squared) time.
Repeated full scans of each interval are even more expensive.

## Approach

Return `_at_most(sales, k)` directly.
The helper `_at_most` counts subarrays by their right endpoint.
It maintains `left` and the number of bad days in the current window, shrinking while that count exceeds the supplied limit.
After shrinking, all `right - left + 1` suffixes of the window are valid, since removing days cannot increase the bad-day count.
Starts before left are invalid because the loop already discarded them while the budget was exceeded.
A negative limit returns zero immediately.

## Walkthrough

```text
Input: sales = [0, 20, 5], k = 1
Output: 5
```

Example 1 contributes one valid interval ending at day 0.
At day 1, both `[20]` and `[0, 20]` qualify, adding two.
At day 2 the full window has two bad days, so remove the first zero-sale day.
The remaining window `[20, 5]` contributes two more, for total 5.

## Complexity

Each helper pass takes O(n) time because both boundaries only move forward.
The overall method uses at most two linear passes and O(1) extra space.
The answer can grow quadratically even though the computation is linear.

## Edge cases

When k is zero, the helper counts all subarrays contained entirely within good-day runs.
An empty sales array contributes zero.
A day with exactly 10 sales is good.

## Common mistakes

Do not add only one per endpoint; every valid suffix must be counted.
Keep threshold comparisons strict at fewer than 10 sales.

## Language notes

Python treats comparisons as zero-or-one values in the counter.
Java uses explicit branches and long result arithmetic to avoid overflow when counting many intervals.
