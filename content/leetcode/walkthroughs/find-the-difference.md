## Intuition

Every character in the shorter string appears once in the longer string except one added character.
XOR cancels equal values because x XOR x is zero.
XORing all characters from both strings leaves exactly the added character.

## Brute force

Sorting both strings and comparing positions takes O(n log n) time and requires copied character storage.
A frequency map uses O(n) extra space.
XOR needs only one accumulator and linear scans.

## Approach

1. Initialize difference to zero.
2. XOR every character from s into the accumulator.
3. XOR every character from t into the same accumulator.
4. Return the character represented by the remaining code point.

## Walkthrough

Example 1 has s equal to abcd and t equal to abcde.
The a, b, c, and d contributions appear twice and cancel.
Only e appears once across both strings.
The remaining XOR is e, so the method returns e.

## Complexity

For n characters in s and n plus one in t, the scans take O(n) time.
The XOR accumulator uses O(1) auxiliary space.
No sorted copy or frequency table is allocated.
The returned value is one character.

## Edge cases

The extra character can be at the beginning, middle, or end.
Repeated characters still cancel by occurrence count.
A one-character s leaves one character in t.
The input lengths differ by exactly one under the contract.

## Common mistakes

- XORing only the longer string leaves all original characters in the result.
- Counting distinct characters instead of occurrences mishandles duplicates.
- Sorting changes the linear-time constant-space approach.
- Returning a code point integer rather than a character changes the type.

## Language notes

Python XORs ord values and converts the result with chr.
Java XORs char values directly and returns a char.
Both rely on character code cancellation.
