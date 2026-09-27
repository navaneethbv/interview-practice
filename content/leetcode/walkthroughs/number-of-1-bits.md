## Intuition

Subtracting one flips the lowest set bit to zero and turns all lower zero bits into ones.
ANDing the result with the original number therefore clears exactly that lowest set bit.
Repeat this operation and count how many removals occur.

## Approach

1. Use the clear-lowest-set-bit pattern with `count = 0`.
2. While `n` is nonzero, replace it with `n & (n - 1)`.
3. Increment `count` once for the removed bit.
4. Return `count` when no set bits remain.

For example, a suffix ending in `1000` becomes `0111` after subtracting one.
Their AND is `0000`, while bits above that suffix remain unchanged.
Thus every loop iteration removes exactly one one-bit and never changes the count of any other set bits.
A separate brute-force discussion is unnecessary for this direct bit-counting exercise.

## Walkthrough

Example 1 has `n = 13`, whose binary representation is `1101`.

| Incoming `n` | `n - 1` | New `n` after AND | `count` |
| --- | --- | --- | --- |
| `1101` | `1100` | `1100` | 1 |
| `1100` | `1011` | `1000` | 2 |
| `1000` | `0111` | `0000` | 3 |

The loop stops after removing the ones at bit positions 0, 2, and 3.
The answer is 3, independent of how many zero bits separate those positions.

## Complexity

- Time: O(k) for k set bits, and O(1) under this fixed 31-bit positive-integer input bound.
- Space: O(1), storing only the remaining bit pattern and counter.

## Edge cases

A power of two clears to zero in one iteration.
An integer with every permitted bit set takes 31 iterations.
Zero would return zero without entering the loop, although the statement requires a positive input.

## Common mistakes

- Clearing the lowest bit with a shift does not necessarily clear a set bit and uses a different loop invariant.
- Forgetting to update `n` makes the loop never terminate.
- Counting iterations until `n == 1` without accounting for that final one loses a set bit.

## Language notes

Python and Java both use the `&=` compound assignment for the same operation.
Python's unbounded signed integers would require a fixed-width policy for negative inputs, but negative inputs are outside this contract.
Java's `int` safely represents every allowed positive input and the counter is at most 31.
