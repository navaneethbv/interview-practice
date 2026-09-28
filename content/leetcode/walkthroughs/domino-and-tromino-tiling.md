## Intuition

The number of tilings for width n follows a short recurrence after considering the ways the last columns can be completed.
The reference recurrence is `dp[n] = 2 * dp[n-1] + dp[n-3]`, with small base cases covering all tile shapes.

## Brute force

Recursively placing every possible tile branches exponentially.
Memoizing widths avoids repeated work, but the compact recurrence needs only the recent base values.

## Approach

1. Initialize tiling counts for widths 0, 1, and 2 as 1, 1, and 2.
2. For each larger width, apply the recurrence modulo 1000000007.
3. Return the count at width n.

## Walkthrough

This is Example 1 from the local statement.
For `n = 2`, the base value `dp[2] = 2` counts two vertical dominoes and two horizontal dominoes.
No recurrence step is needed, so the method returns 2.
For the next width, the recurrence would combine the previous width and the width-three-behind state to produce 5, matching Example 2.

## Complexity

The dynamic program computes each width once, taking O(n) time.
The stored array uses O(n) space, although only three values are needed for a memory-optimized variant.

## Edge cases

Width 1 has one vertical domino arrangement.
Width 2 has the two base arrangements.
The modulus is applied at every recurrence step to keep values bounded.

## Common mistakes

Do not forget the width-zero base value, which participates in the recurrence.
Apply the modulus before the Java `long` value grows too large.
Do not count rotations as distinct when they cover the same board placement.

## Language notes

Python stores the full list of counts, and Java uses a `long[]` before casting the final modular value to `int`.
The Java allocation uses at least three slots even when n is one.
