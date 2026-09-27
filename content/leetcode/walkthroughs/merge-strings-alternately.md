## Intuition

Take one character from each word at every index while either word still has a character.
This preserves alternating order until one word ends, then appends the remainder.

## Brute force

Repeated string concatenation can copy the growing result on every step.
That can take quadratic time in languages with immutable strings.

## Approach

1. Iterate through the larger word length.
2. Append word1's character when the index exists.
3. Append word2's character when the index exists.
4. Return the accumulated characters.

## Walkthrough

Example 1:

For abc and pqr, index zero adds a then p.
Index one adds b then q, and index two adds c then r.
The result is apbqcr.

## Complexity

The method reads each input character once and takes O(a+b) time.
The output requires O(a+b) space.
Python joins a character list once, while Java StringBuilder avoids repeated immutable copies.

## Edge cases

If one word is longer, its suffix is appended after the shorter word ends.
Equal lengths alternate through the final character.
The empty-word behavior follows the bounds checks.

## Common mistakes

Do not stop at the shorter length.
Append word1 before word2 at each shared index.
Do not duplicate a character when the loop reaches the longer suffix.

## Language notes

Python stores characters in a list before one join operation.
Java uses StringBuilder and returns its final string.
Its append operations follow the same index checks as the Python character list.
No character is read after its word boundary.
The result length is exactly the sum of the two input lengths.
