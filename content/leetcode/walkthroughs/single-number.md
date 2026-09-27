## Intuition

The XOR operation cancels equal pairs because x XOR x is zero.
XOR with zero leaves a value unchanged.
Therefore scanning all entries removes every duplicated value and leaves the single value.

## Brute force

Counting frequencies with a map takes O(n) extra space.
Sorting and pairing values takes O(n log n) time.
XOR achieves both linear time and constant auxiliary space.

## Approach

1. Initialize unique_value to zero.
2. XOR each value into unique_value.
3. Return unique_value after all pairs cancel.

## Walkthrough

Example 1 uses nums = [4, 1, 4].
The accumulator starts at 0.
After 4 it is 4.
After 1 it is 5.
After the second 4, 5 XOR 4 equals 1, which is the answer.

## Complexity

- Time: O(n), for one pass through nums.
- Space: O(1), for one integer accumulator.

## Edge cases

A one-element array returns that element.
Negative integers work because XOR operates on their two's-complement bit patterns.
The answer may be zero and still cancels correctly.
The scan does not need to know which value is expected to be unique.
The guarantee that every other value appears twice is required for the cancellation proof.

## Common mistakes

- Using addition, which does not cancel arbitrary pairs safely.
- Sorting when constant extra space is required.
- Assuming values must be positive.
- Applying this method when duplicate frequencies are not exactly two.

## Language notes

Python and Java use the same XOR operator and accumulator invariant.
Both integer types preserve the input bit pattern for this operation.
