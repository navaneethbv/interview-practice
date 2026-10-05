## Intuition

For a fixed right endpoint, the latest occurrence of each remainder tells us how far right a valid starting position may be.
A start must include all three latest occurrences, so the earliest of those occurrences is the limiting boundary.

## Brute force

Try each start and extend the end while maintaining which remainders have appeared.
This avoids recounting each interval from scratch but still inspects O(n squared) intervals.

## Approach

Initialize `last` to `[-1, -1, -1]` and `total` to zero.
At each `index`, replace the entry for `value % 3` with that index.
All starts from zero through `min(last)` produce a valid interval ending here, giving `min(last) + 1` new subarrays.
If a remainder has never appeared, the minimum stays -1 and contributes zero.
Each subarray has one right endpoint, so summing these contributions neither omits nor duplicates any answer.

## Walkthrough

Example 1 is `[1, 2, 3, 4, 5]`.
After 1 and 2, some remainder is missing, contributing zero.
At 3, `last` is `[2, 0, 1]`, so one start qualifies.
At 4 it becomes `[2, 3, 1]`, adding two.
At 5 it becomes `[2, 3, 4]`, adding three.
The total is `1 + 2 + 3 = 6`.

## Complexity

Time is O(n), since taking the minimum of three entries is constant work.
Auxiliary space is O(1), independent of how many subarrays qualify.

## Edge cases

An empty array contributes zero.
An array missing any remainder has no valid interval.
Repeated occurrences replace only their own remainder's latest index.

## Common mistakes

Using the maximum latest index allows starts that exclude another required remainder.
Initializing missing positions to zero would falsely count early intervals.

## Language notes

The statement restricts values to positive integers, so Python and Java remainder indexing agree.
Java stores `total` in a `long` because the number of subarrays can exceed the signed integer range.
