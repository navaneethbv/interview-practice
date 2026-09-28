## Intuition

An even number can be halved, while an odd number must first lose one.
Each step strictly decreases the nonnegative integer, so repeating that rule reaches zero.

## Brute force

There is no useful search because the operation is determined by parity.
Simulating the required operation directly is both the simplest and the reference behavior.

## Approach

1. While `num` is nonzero, inspect its parity.
2. Divide an even value by two.
3. Decrement an odd value.
4. Count each operation and return the count.

## Walkthrough

For Example 1, num is 14.
The sequence is `14 -> 7 -> 6 -> 3 -> 2 -> 1 -> 0`.
The even values use division, the odd values use subtraction, and six transitions are counted.

## Complexity

There are O(log num) divisions, with at most one subtraction before each division, so time is O(log num).
The method uses O(1) auxiliary space in both languages.

## Edge cases

Input zero needs no operations and returns zero.
Input one performs one subtraction.
Parity must be tested before changing the value.
Large even values quickly lose bits through division, while an odd value can require one subtraction before the next division.
The loop always makes progress because both operations reduce a positive value.

## Common mistakes

Do not divide odd values.
Do not count the starting state as a step.
Use integer division with no rounding concerns.

## Language notes

Python uses `//` for integer division.
Java uses `/` on positive `int` values, which has the same result here.
