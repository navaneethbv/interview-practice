## Intuition

Every requested interval is part of the same immutable sequence of daily views.
Storing totals for all prefixes lets an interval total be recovered by subtracting the contribution of days that come before it.

## Brute force

Summing every requested range independently costs O(nq) in the worst case for n days and q queries.
Overlapping queries repeat the same additions, so a single preprocessing pass can replace that repeated work.

## Approach

Build `prefix` with a leading zero and let `prefix[i]` mean the sum of the first i days.
Append each new cumulative total.
For inclusive endpoints `l` and `r`, return `prefix[r + 1] - prefix[l]` in the original query order.

## Walkthrough

Example 1 builds prefixes `[0, 3, 8, 12, 20, 27, 29, 34, 37, 39, 42]`.
The ranges give `8 - 0 = 8`, `29 - 0 = 29`, `39 - 27 = 12`, and `20 - 12 = 8`.
Thus the returned array is `[8, 29, 12, 8]`.

## Complexity

Preprocessing takes O(n) time and each query takes O(1), for O(n + q) overall.
The prefix table uses O(n) auxiliary space, and the returned totals use O(q) output space.
No sorting of periods is needed.

## Edge cases

A one day interval subtracts consecutive prefix entries and recovers that day's count.
A range starting at zero uses the leading zero directly.
Zero view days contribute nothing but still occupy positions in the prefix table.

## Common mistakes

The right endpoint is inclusive, so using `prefix[r]` omits its day.
Subtract `prefix[l]`, not `prefix[l - 1]`.
Keep the prefix index convention consistent rather than adding separate branches for intervals beginning at the first day.

## Language notes

Python stores arbitrary precision cumulative integers.
Java uses an `int[]`; with at most 100,000 days and each count below 10,000, the maximum cumulative total stays below one billion.
Both references preserve the input arrays.
