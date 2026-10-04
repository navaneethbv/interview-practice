## Intuition

A bit must change exactly when the corresponding input bits differ.
XOR marks those positions with ones, so the answer is the population count of the XOR result.
The actual direction of each change does not matter.

## Brute force

Inspect all 32 positions separately, comparing the corresponding bits of a and b.
That takes O(B) time for B bits and is already bounded here.
The reference skips zero positions by clearing one set bit per iteration.

## Approach

Compute `difference = (a ^ b) & 0xFFFFFFFF` in Python.
While it is nonzero, replace it with `difference & (difference - 1)` and increment `flips`.
Subtracting one changes the lowest set bit to zero and turns lower zeros into ones.
AND with the original therefore removes exactly that lowest set bit while preserving every higher set bit.
After one iteration per differing position, the mask reaches zero and `flips` is the required count.

## Walkthrough

Example 1 uses 29, binary `11101`, and 15, binary `01111`.
Their XOR is `10010`, decimal 18.
The first clearing step produces `10000`, decimal 16.
The second produces zero.
Exactly two iterations occurred, so return 2.
Each removed one corresponds to one bit that must be changed to convert the first number into the second.

## Complexity

For d differing positions, time is O(d), bounded by O(B).
Extra space is O(1).
B is fixed at 32, so the worst-case iteration count is 32.

## Edge cases

Equal inputs yield a zero XOR and return zero immediately.
The values -1 and zero differ at all 32 positions and return 32.

## Common mistakes

Counting set bits in either input separately does not measure their differences.
In Python, omitting the width mask for a negative XOR can prevent the clearing loop from terminating.

## Language notes

Python's mask imposes the required finite two's-complement width.
Java int arithmetic already operates on 32 bits, so the reference can clear bits directly even when the XOR is negative.
