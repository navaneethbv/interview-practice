## Intuition

The outer pair of a primitive balanced component is exactly the pair that changes depth between zero and one.
A character belongs in the answer whenever the depth after handling its opening or before handling its closing is positive.

## Brute force

Splitting the string into primitive components and slicing each component copies substrings and needs extra scans.
A single depth counter identifies the same boundaries in one pass.

## Approach

1. Start `depth` at zero and scan characters from left to right.
2. Decrease depth before recording a closing parenthesis.
3. Append the character only when the resulting depth is positive.
4. Increase depth after recording an opening parenthesis.

## Walkthrough

This is Example 1 from the local statement.
For `s = "(()())(())"`, the first opening raises depth to 1 and is omitted.
The inner `()` characters are recorded while depth is positive, and the closing that returns depth to zero is omitted.
The second primitive piece is processed the same way, producing `"()()()"` after concatenation.

## Complexity

The string is scanned once, so time is O(n).
The result builder stores O(n) characters, while the depth counter uses O(1) auxiliary state.

## Edge cases

The primitive `"()"` loses both characters and returns an empty string.
Nested input keeps every interior parenthesis, even when the nesting depth is greater than one.
Adjacent primitive components are handled independently because depth returns to zero between them.

## Common mistakes

Do not append an opening parenthesis before checking whether it is the primitive outer opening.
Handle a closing parenthesis before checking append eligibility.
Do not remove only the first and last characters of the whole string, since there may be several primitives.

## Language notes

Python accumulates characters in a list and joins once.
Java uses `StringBuilder`, which avoids repeated immutable string concatenation.
