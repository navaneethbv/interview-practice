## Intuition

XOR can temporarily combine two integer values without losing either one.
Applying XOR with one original operand cancels that operand and recovers the other.
Three assignments use this cancellation property to exchange the two local variables without a third temporary value.

## Brute force

A conventional swap stores a in a temporary variable, assigns b to a, and then assigns the temporary value to b.
That is clearer in ordinary application code, but this exercise demonstrates the no-temporary-variable operation.

## Approach

First assign `a ^= b`, storing the XOR of both originals in a.
Then assign `b ^= a`; the original b cancels itself inside the combined value, leaving the original a in b.
Finally assign `a ^= b`; the original a now cancels from the combined value, leaving the original b in a.
Return the pair `[a, b]`.
The proof uses XOR associativity, commutativity, and the identities `x ^ x = 0` and `x ^ 0 = x`.

## Walkthrough

Example 1 starts with a equal to 3 and b equal to 9.
In four-bit form those are `0011` and `1001`.
The first assignment makes a equal to `1010`, or 10.
The second computes `1001 ^ 1010`, giving b equal to 3.
The third computes `1010 ^ 0011`, giving a equal to 9.
Return `[9, 3]`.

## Complexity

For fixed-width integer inputs, time is O(1) and auxiliary space is O(1).
The two-element returned array or list also has constant size.

## Edge cases

Equal operands remain equal after the swap.
Zero and negative values obey the same XOR identities.
The reference swaps two distinct local variables, even when their values are identical.

## Common mistakes

An XOR swap applied twice to the same storage location would destroy its value.
That aliasing problem does not arise for these separate parameters.
Changing the assignment order breaks the cancellation sequence.

## Language notes

Java int XOR works directly on 32-bit patterns.
Python's integer XOR also satisfies the cancellation identities, so no mask is needed to recover the original signed values.
