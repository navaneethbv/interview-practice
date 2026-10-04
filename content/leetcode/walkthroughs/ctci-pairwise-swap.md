## Intuition

Each bit has exactly one partner: positions zero and one swap, positions two and three swap, and so on.
Separating the two position classes lets every pair be exchanged simultaneously without individual bit tests.
The result must retain signed 32-bit interpretation.

## Brute force

Loop over sixteen bit pairs and explicitly copy each low bit to the high position and each high bit to the low position.
That takes O(B) operations for B bits; masks perform the same permutation in constant word operations.

## Approach

Mask the input to its 32-bit representation.
`ODD_BITS = 0xAAAAAAAA` selects positions 1, 3, 5, and so forth; shift those bits right once.
`EVEN_BITS = 0x55555555` selects positions 0, 2, 4, and so forth; shift them left once.
OR the two disjoint results.
Python masks the combined value again and subtracts `2^32` when its sign bit is set, converting the unsigned representation back to a signed integer.

## Walkthrough

Example 1 is 10, binary `1010` in the low four positions.
Both ones lie at odd-numbered positions, so the odd mask retains `1010` and the even mask retains zero.
Shifting the retained odd bits right gives `0101`.
The OR result is therefore 5.
Bits above this four-bit illustration are zero and remain zero.

## Complexity

For the fixed 32-bit word, time and auxiliary space are O(1).
The algorithm does not create a string representation or allocate a collection of bits.

## Edge cases

Zero remains zero.
Swapping an all-one pattern leaves it unchanged.
A bit moved into position 31 makes the returned signed result negative.

## Common mistakes

Using an arithmetic right shift on a signed odd-bit mask result can insert unwanted leading ones.
Bit positions are counted from zero at the least significant end.

## Language notes

Java uses `>>>` for the right shift and naturally returns a signed int.
Python explicitly controls the width and signed conversion because its integers have arbitrary precision.
