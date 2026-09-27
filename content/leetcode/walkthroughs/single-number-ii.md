## Intuition

Every value except one appears three times.
At each bit position, the total number of set bits is therefore a multiple of three except for the unique value's bit.
Taking each bit count modulo three reconstructs the answer.

## Brute force

A frequency map can count every integer and return the value whose count is one.
That uses O(n) extra space.
Bit counting uses constant 32-bit workspace and handles negative answers by restoring the sign bit.

## Approach

1. Initialize a 32-bit result to zero.
2. For every bit from zero through 31, count values whose bit is set.
3. Set that result bit when the count is not divisible by three.
4. Interpret a set bit 31 as a negative signed integer in Python.
5. Return the reconstructed integer.

## Walkthrough

Example 1 is [2,2,3,2].
For bit zero, the three copies of 2 contribute zero and 3 contributes one.
For bit one, all three copies of 2 plus 3 contribute four, whose remainder is also one.
Those remainders reconstruct 3, which is returned.

## Complexity

For n values and fixed 32-bit width, time is O(32n), which is O(n).
The algorithm uses O(1) auxiliary space.
Python's final sign conversion maps the unsigned bit pattern back to a signed integer.
The returned value is one integer and no collection is allocated.

## Edge cases

The unique value may be negative.
The sign bit must be included in the 32 positions.
A unique zero leaves every remainder zero.
The statement guarantees exactly one value appears once and all others appear three times.

## Common mistakes

- Counting only 31 bits fails for negative answers.
- Using ordinary right shift in a fixed-width language can sign-extend unexpectedly.
- Returning the unsigned bit pattern misreads the sign bit.
- A frequency map ignores the intended constant-space bit method.

## Language notes

Python masks each shifted value with one bit and explicitly converts a set sign bit.
Java uses unsigned right shift so every bit position is inspected independently.
Both references use the 32-bit integer contract.
