## Intuition

A character is unique when its total frequency is one.
Count all characters first, then scan from the beginning to find the first count of one.
The second scan preserves the required earliest index.

## Brute force

For each character, scanning the entire string to count it can take O(n squared) time.
A frequency map separates counting from selection and makes both passes linear.
The fixed lowercase alphabet also permits a constant-size Java array.

## Approach

1. Count every character in s.
2. Scan s from left to right.
3. Return the first index whose count equals one.
4. Return -1 when no character is unique.

## Walkthrough

Example 1 is swiss.
The counts are s three, w one, and i one.
The scan sees s first and skips it because its count is three.
It then reaches w at index 1, so the method returns 1.

## Complexity

For n characters, counting and scanning take O(n) time.
Python's map uses O(u) space for u distinct characters.
Java's fixed lowercase count array uses O(1) auxiliary space under the alphabet contract.
The returned index is a scalar.

## Edge cases

An empty string returns -1.
A string with one character returns index zero.
If all characters repeat, no index qualifies.
The first unique character is selected even when later characters are also unique.

## Common mistakes

- Returning the first character seen once so far ignores later repeats.
- Scanning only the count map loses original order.
- Using a fixed alphabet array outside the lowercase contract can index incorrectly.
- Returning a character instead of its zero-based index violates the method contract.

## Language notes

Python uses Counter for flexible character keys.
Java uses charAt and a 26-entry array without toCharArray allocation.
Both perform a separate verification scan.
