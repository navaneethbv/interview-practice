## Intuition

Each doubling copies the old sequence into a new second half and adds one to every copied value.
An index in that second half therefore contributes one and then behaves like its offset within the previous half.
Those successive second-half decisions are exactly the one bits in the index's binary representation.

## Brute force

Build repeated doubled sequences until index n exists, then read that entry.
This uses O(n) time and space, which is unnecessary when n can approach one billion.

## Approach

Return the number of set bits in n.
The references count them with the identity `n & (n - 1)`, which clears the lowest set bit while leaving all higher bits unchanged.
Initialize `answer` to zero.
While n is nonzero, clear one set bit and increment the answer.
The relationship to the original sequence can be proved inductively: first-half indices preserve their old binary representation, while second-half indices add a new leading one and therefore increase the count by one.
The initial index zero has no set bits and sequence value zero.

## Walkthrough

Example 1 asks for index 5, whose binary representation is 101.
The first bit-clearing operation combines 101 with 100 and leaves 100, increasing the answer to one.
The next combines 100 with 011 and leaves zero, increasing the answer to two.
The method returns 2.
The generated prefix `[0, 1, 1, 2, 1, 2, 2, 3]` independently confirms that its index-five entry is two.

## Complexity

The loop runs once per set bit, giving O(popcount(n)) time and O(log(n + 1)) as a worst-case bit-length bound.
Auxiliary space is O(1) for the stated fixed-size input range in both references.

## Edge cases

Index zero returns zero without entering the loop.
A power of two has exactly one set bit and returns one.

## Common mistakes

Use zero-based indexing when relating sequence positions to binary values.
Counting binary digits would measure bit length, not the number of ones.

## Language notes

Both languages use the same bitwise-and expression.
Java's input remains nonnegative under the constraints, so signed-bit interpretation introduces no special cases.
