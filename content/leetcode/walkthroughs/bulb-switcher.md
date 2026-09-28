## Intuition

Bulb `i` is toggled once for every divisor of `i`.
Divisors normally arrive in pairs, but a perfect square has one unpaired square root, so exactly the perfect-square bulbs remain on.

## Brute force

Simulating all rounds and toggling every divisible bulb takes roughly `O(n log n)` operations and cannot handle one billion bulbs.
Counting perfect squares reduces the task to one integer square root.

## Approach

1. Observe that only numbers with an odd divisor count remain on.
2. Identify those numbers as perfect squares.
3. Return `floor(sqrt(n))`, the count of squares from 1 through `n`.

## Walkthrough

For Example 1, `n = 10`.
The perfect squares at most 10 are 1, 4, and 9.
There are three, so the result is `3`.

## Complexity

The integer square-root calculation takes `O(1)` time for the fixed-width input and uses `O(1)` space.
The answer counts roots, not bulbs simulated across rounds, so it remains small even when `n` is large.
This observation also explains why the exact toggle order does not need to be simulated.

## Edge cases

For `n = 0`, there are no bulbs and the integer square root is zero.
Perfect squares exactly at the boundary are included.

## Common mistakes

- Assuming every bulb is toggled once misses the divisor pairing pattern.
- Simulating rounds is unnecessary and too slow for the stated bound.
- Rounding a floating square root upward counts a square above `n`.

## Language notes

Python uses `math.isqrt`, which returns an exact floor.
Java casts `Math.sqrt(n)` to `int`; the one-billion bound keeps this conversion safe.
