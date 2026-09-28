## Intuition

A binary gap is the distance between consecutive one bits with at least one zero between them.
Scanning bits from least significant to most significant lets the current position be compared with the previous one position.

## Brute force

Converting to a binary string and searching every pair adds a separate representation.
Bit scanning stores only the previous one and the best distance.

## Approach

1. Start at bit position zero.
2. When the current bit is one, measure the distance from the previous one if it exists.
3. Update the previous position and shift right.
4. Return the largest measured distance.

## Walkthrough

For Example 1, 22 is binary `10110`.
The one positions from the right are 1, 2, and 4.
Their gaps are 1 and 2, so the maximum gap is 2.

## Complexity

For a b-bit positive number, the scan takes O(b) time and O(1) space.
Python and Java shift the integer in place and do not build a binary string.

## Edge cases

A number with fewer than two one bits has gap zero.
Adjacent one bits produce distance one, which is valid under the definition.
Trailing zeroes do not create a new one position.

## Common mistakes

Measure bit positions, not the count of zeroes alone.
Do not initialize a missing previous one as position zero.
Continue scanning after finding a larger gap.

## Language notes

Python tests `n & 1` and shifts with `>>`.
Java uses unsigned `>>>=` on a positive input.
