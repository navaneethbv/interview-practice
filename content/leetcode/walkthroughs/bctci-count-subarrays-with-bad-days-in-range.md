## Intuition

Counts within the inclusive range from k1 to k2 form the difference between two nested sets of intervals.
Count everything with at most k2 bad days, then remove everything with fewer than k1.

## Brute force

Enumerating all intervals and tracking each one's bad-day count takes O(n squared) time.
Two monotone sliding-window passes avoid considering every interval individually.

## Approach

Return `_at_most(sales, k2) - _at_most(sales, k1 - 1)`.
The helper `_at_most` counts subarrays by their right endpoint.
It maintains `left` and the number of bad days in the current window, shrinking while that count exceeds the supplied limit.
After shrinking, all `right - left + 1` suffixes of the window are valid, since removing days cannot increase the bad-day count.
Starts before left are invalid because the loop already discarded them while the budget was exceeded.
A negative limit returns zero immediately.

## Walkthrough

```text
Input: sales = [0, 20, 5], k1 = 1, k2 = 2
Output: 5
```

Example 1 has bad-day indicators `[1, 0, 1]`.
All six nonempty subarrays have at most two bad days.
Only `[20]` has at most zero bad days.
Subtracting the latter group gives 6 - 1 = 5 intervals with between one and two bad days, inclusive.
The full three-day interval is included because the upper bound allows its two bad days.

## Complexity

Each helper moves both pointers forward at most n times.
Two such passes still take O(n) time and O(1) extra space.
The number returned can be as large as n(n + 1)/2.

## Edge cases

When k1 is zero, the lower helper receives -1 and removes nothing.
Equal k1 and k2 reduce the task to an exact-count query.
An upper bound exceeding all bad days admits every interval before subtraction.

## Common mistakes

Subtract at most k1 - 1, not at most k1, because the lower endpoint is inclusive.
Do not count only maximal windows.

## Language notes

Python uses arbitrary-precision integer counts.
Java returns long and computes the lower limit with `k1 - 1L`, preserving the helper's signed boundary behavior.
