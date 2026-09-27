## Intuition
An alternating binary string is completely determined by its first character.
There are only two candidates: one starts with zero, and the other starts with one.
At every position those candidates disagree, so a character that matches one necessarily mismatches the other.

## Brute force
Construct both alternating target strings, compare the input with each, and count the required replacements.
This takes O(n) time and O(n) space for the constructed strings.
Generating each expected bit from its index removes the need to store either candidate.

## Approach
1. Set a mismatch counter to zero.
2. Scan the original string by index.
3. Compare each bit with the index modulo two, which gives the expected bit in the zero-first pattern.
4. Increment the counter for a mismatch.
5. Return the smaller of that counter and the string length minus that counter.

Changing a mismatching character is necessary and sufficient to reach a fixed target pattern.
The zero-first pattern needs exactly the counted replacements.
The one-first pattern has the opposite expected bit at every position, so its replacement count is the complement.
Taking the minimum therefore considers every possible valid result.

## Walkthrough
Example 1 is `s = "001"`.
The zero-first pattern of length three is `010`.
Index zero matches, while indices one and two mismatch, giving a count of two.
The complementary one-first pattern is `101`, with `3 - 2 = 1` mismatch.
Changing the first character reaches that pattern in one operation.
The method returns 1.

## Complexity
The scan takes O(n) time for n characters.
Only an index and mismatch counter are needed, giving O(1) auxiliary space.
Neither implementation creates target strings or edits the original input.

## Edge cases
Every one-character binary string is already alternating and returns zero.
An already alternating string matches one candidate at all positions.
Odd lengths still use the same complement formula because the patterns differ at every individual position.

## Common mistakes
- Counting equal neighboring pairs can count the wrong number of necessary character replacements.
- Checking only the zero-first pattern misses a cheaper one-first result.
- Assuming both patterns have equally many mismatches fails even for very short inputs.

## Language notes
Python converts the currently indexed character to an integer.
Java subtracts `'0'` from the character returned by `charAt`.
The binary-input guarantee makes those conversions sufficient without additional validation.
