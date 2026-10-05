## Intuition

A bit must be flipped exactly where `a` and `b` differ.
XOR marks every differing bit with one, so the answer is the number of set bits in `a ^ b`.
Brian Kernighan's loop removes one set bit per iteration without scanning all bit positions.

## Approach

Compute `difference = a ^ b`.
While it is nonzero, replace it with `difference & (difference - 1)` and increment `flips`.
That operation clears the lowest set bit, so the loop count equals the number of required flips.
Java's signed integer representation already performs XOR over all 32 bits, while Python masks to the same 32-bit unsigned pattern first.

## Walkthrough

For Example 1, `29` is `11101` and `15` is `01111` in the relevant low bits.
Their XOR has two set bits, and two iterations of the clearing loop produce the answer two.
For Example 2, `-1` has all 32 bits set and zero has none, so the masked difference contains 32 set bits and the result is 32.

## Complexity

The loop runs once per set bit in the XOR result, so time is `O(p)` where `p` is at most 32.
The method uses `O(1)` auxiliary space.
Because the input is fixed-width 32-bit data, this is also constant time in the problem's model.

## Edge cases

Equal inputs produce zero XOR and require no flips.
Opposite signs must be compared using their two's complement bit patterns, including the sign bit.
The minimum integer has only its sign bit set, so it still works with the same operation.

## Common mistakes

Counting set bits in `a` or `b` separately does not count positions where the values differ.
Using an unbounded Python XOR without the 32-bit mask miscounts negative values.
Shifting a signed Java value manually can introduce sign extension that the clearing loop avoids.

## Language notes

Python masks `a ^ b` with `0xFFFFFFFF` and returns the count as an ordinary integer.
Java relies on `int` XOR and uses `difference &= difference - 1`, which works even when the sign bit is set.
Neither implementation mutates either input value.
