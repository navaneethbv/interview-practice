## Intuition

Counting at least `k` bad days is easier through its complement.
Every nonempty subarray either has at most `k - 1` bad days or has at least `k`.
The first category supports a standard sliding window because removing days cannot increase its bad-day count.

## Brute force

For each starting index, extend every ending index while counting values below 10.
This checks O(n²) subarrays explicitly.

## Approach

Compute the number of all subarrays as `n * (n + 1) // 2`.
The `_at_most` helper counts windows with no more than its supplied limit.
Add each rightmost day's badness to `bad`, then advance `left` until `bad` is within that limit.
All starts from `left` through `right` now qualify, contributing `right - left + 1` to `total`.
Subtract `_at_most(sales, k - 1)` from the overall count.
A negative helper limit returns zero immediately, correctly handling the outer case `k = 0`.

## Walkthrough

Example 1 has `[0, 20, 5]` and `k = 1`.
There are six nonempty subarrays in total.
The helper counts subarrays with at most zero bad days.
At value 0 it shrinks to an empty window; at 20 it counts the singleton `[20]`; at 5 it shrinks past the bad day again.
Thus only one subarray has no bad days.
The requested result is `6 - 1 = 5`.

## Complexity

The two pointers each move at most n times, giving O(n) time.
The helper stores only counters, so auxiliary space is O(1).

## Edge cases

When `k = 0`, every nonempty subarray qualifies.
When `k` exceeds the available bad days, the complement equals the total and the answer is zero.

## Common mistakes

Use `k - 1`, not `k`, in the complement.
Exactly 10 sales is a good day.

## Language notes

Python adds booleans directly to `bad`.
Java uses explicit branches and casts the total-subarray multiplication to `long` before multiplying.
