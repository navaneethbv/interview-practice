## Intuition

At least k bad days is the complement of having at most k - 1 bad days.
Counting interval occurrences is different from finding just the longest acceptable window.

## Brute force

Checking every start and end with a running bad-day count takes O(n squared) time.
Repeated full scans of each interval are even more expensive.

## Approach

Subtract `_at_most(sales, k - 1)` from the total number `n * (n + 1) // 2` of nonempty subarrays.
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

Example 1 has six nonempty subarrays in total.
Only `[20]` has no bad days.
The zero-bad-day helper contributes 0, 1, and 0 at the three endpoints, for a total of 1.
Subtracting gives 6 - 1 = 5.

## Complexity

Each helper pass takes O(n) time because both boundaries only move forward.
The overall method uses at most two linear passes and O(1) extra space.
The answer can grow quadratically even though the computation is linear.

## Edge cases

When k is zero, every nonempty subarray qualifies, and the negative-limit helper correctly returns zero.
An empty sales array contributes zero.
A day with exactly 10 sales is good.

## Common mistakes

Do not add only one per endpoint; every valid suffix must be counted.
Keep threshold comparisons strict at fewer than 10 sales.

## Language notes

Python treats comparisons as zero-or-one values in the counter.
Java uses explicit branches and long result arithmetic to avoid overflow when counting many intervals.
