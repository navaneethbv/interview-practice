## Intuition

A rank query needs the number of tracked values at most x, excluding one occurrence of x itself.
Because values lie in a fixed bounded range, a Fenwick tree can maintain prefix counts as insertions arrive.
A separate frequency array distinguishes an absent value from a value whose rank is zero.

## Brute force

Store every arrival and scan the entire history for each query.
This makes insertion constant time but costs O(n) per query, which becomes expensive for many interleaved operations.

## Approach

`track(x)` increments `counts[x]` and updates the Fenwick tree starting at position `x + 1`.
Each update jumps upward by its lowest set bit.
`getRankOfNumber(x)` returns -1 when `counts[x]` is zero.
Otherwise sum the Fenwick prefix by repeatedly subtracting the lowest set bit from `position`.
Subtract one from that inclusive count to exclude one tracked occurrence of x.
Duplicates still contribute their remaining occurrences to the rank.

## Walkthrough

Example 1 tracks 5, 1, 4, and 4.
The values at most 1 total one, so its rank is zero.
The values at most 4 are 1, 4, and 4, so the inclusive count is three and the rank is 2.
All four arrivals are at most 5, making its rank 3.
Tracking operations themselves return null.

## Complexity

For value-domain size U, each insertion and query takes O(log U) time.
Construction and storage take O(U), with U fixed near 100,000 here.
The structure does not retain the arrival order.

## Edge cases

Value zero must work, so tree positions are shifted to start at one.
An absent queried value returns -1 even when smaller values have been tracked.

## Common mistakes

Returning the number strictly below x undercounts duplicate occurrences.
Starting a Fenwick update at zero would never advance because its lowest set bit is zero.

## Language notes

Python uses integer lists; Java uses int arrays.
Both implement the same `position & -position` jump and retain frequencies separately from the tree.
