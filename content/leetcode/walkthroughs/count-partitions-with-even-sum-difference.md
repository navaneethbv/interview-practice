## Intuition

Let the prefix sum be `left` and the total be `total`.
The difference is `left - (total - left) = 2 * left - total`, whose parity always matches `total`.
Therefore every nonempty cut works exactly when the total is even.

## Brute force

Summing both sides for each cut costs `O(n^2)` if each side is recomputed.
Even a running prefix scan is unnecessary after the parity observation.

## Approach

1. Compute the total sum.
2. If it is even, return all `n - 1` legal cuts.
3. Otherwise return zero.

## Walkthrough

For Example 1, `[1, 2, 3]` has total 6, which is even.
There are two legal cuts, after the first and after the second entry.
Both differences are even, so the answer is `2`.

## Complexity

Summing the array takes `O(n)` time.
The method uses `O(1)` extra space.
It does not need to inspect the individual cut positions after the total parity is known.

## Edge cases

The minimum length is two, so there is at least one possible cut.
An odd total makes every difference odd, regardless of where the cut occurs.

## Common mistakes

- Testing each cut's exact difference obscures the parity invariant.
- Returning `n` counts cuts after the final element, which are disallowed.
- Using floating division for parity is unnecessary and can lose precision in other bounds.

## Language notes

Python uses arbitrary-precision integer summation, while Java's local values are small enough for an `int` sum.
Neither reference constructs prefix or suffix arrays.
