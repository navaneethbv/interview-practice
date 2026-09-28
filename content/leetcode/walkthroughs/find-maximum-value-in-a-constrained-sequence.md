## Intuition

Every position has a direct restriction or an initial loose upper bound.
A neighboring difference limit propagates upper bounds in both directions, and the tightest value at each position is the largest value that satisfies all restrictions.

## Brute force

Trying every possible sequence would branch at every position and repeatedly rediscover the same bounds.
Checking every restriction against every candidate also ignores the line-shaped structure of the constraints.

## Approach

1. Set position zero to 0 and place each explicit restriction in `values`.
2. Sweep left to right, limiting each value by the previous value plus `diff` for that gap.
3. Sweep right to left, applying the symmetric limit from the next position.
4. Return the largest final bound.

## Walkthrough

For Example 1, `n=4`, restriction position 2 is 1, and every gap has difference 3.
The initial array is `[0, infinity, 1, infinity]`.
The forward sweep gives `[0,3,1,4]`.
The backward sweep keeps those values because each already respects the restriction, so the maximum is 4.

## Complexity

With n positions and r restrictions, assignment costs O(r), the two sweeps cost O(n), and finding the maximum costs O(n).
The values array uses O(n) space.
Python's large sentinel is safe for the local integer bounds, while Java uses a one-billion sentinel and an `int` array.

## Edge cases

A restriction at position zero must be reconciled with the fixed starting value.
A very large gap limit still cannot bypass a smaller explicit restriction.
The two passes are needed because a restriction can constrain positions on either side.

## Common mistakes

Only sweeping forward misses limits flowing from the right.
Taking the maximum before the backward pass can overestimate a position.
Do not replace a restricted value with a looser neighboring estimate.

## Language notes

Both references mutate one bounds array and preserve the judge's `findMaxVal` signature.
Java computes the maximum with an explicit loop so the returned value is clear.
