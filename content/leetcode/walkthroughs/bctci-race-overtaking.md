## Intuition

The promised single overtake creates a monotone predicate: player 1 is ahead at an initial prefix, then player 2 is ahead forever.
Binary search can locate the boundary between those regions.
The individual position arrays being increasing is not enough by itself; the single-overtake guarantee supplies the needed monotonicity.

## Brute force

Scan seconds from the beginning and return the first index where player 2 is ahead.
This is correct but requires O(n) comparisons in the worst case.

## Approach

Initialize `low = 0`, known to have player 1 ahead, and `high = n - 1`, known to have player 2 ahead.
While more than one index separates them, inspect midpoint `mid`.
If `p1[mid] > p2[mid]`, move low to mid, preserving the known first-region endpoint.
Otherwise move high to mid, preserving the known second-region endpoint.
When high and low are adjacent, no earlier second-region index can exist between them, so high is the first overtake index.

## Walkthrough

Example 1 compares `[2, 4, 6, 8, 10]` with `[1, 3, 5, 9, 11]`.
Initially low is 0 and high is 4.
At mid 2, positions are 6 and 5, so player 1 still leads and low becomes 2.
At mid 3, positions are 8 and 9, so high becomes 3.
The endpoints are adjacent, and the answer is 3.

## Complexity

Each iteration halves the remaining boundary interval.
Time is O(log n), and only three index variables are needed, giving O(1) auxiliary space.

## Edge cases

For two seconds, the initial endpoints are already adjacent and the answer is 1.
The overtake may occur immediately after the first second or only at the final second.

## Common mistakes

Do not return low, which remains a position before the overtake.
No equal-position case is necessary under the stated contract.

## Language notes

Both implementations use integer midpoint arithmetic.
Java's unsigned shift computes the midpoint safely for the given bounded nonnegative index sum.
