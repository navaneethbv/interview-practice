## Intuition

Two words are equivalent when concatenating their Morse encodings produces the same string.
A set removes duplicate representations while keeping one entry for each distinct encoding.

## Brute force

Comparing every pair of encoded words would take quadratic comparisons.
Encoding once and inserting into a set avoids that repeated work.

## Approach

1. Keep the 26 Morse strings in alphabet order.
2. Translate each character by subtracting `'a'` from its code point.
3. Join the codes for one word and insert the result into `representations`.
4. Return the set size.

## Walkthrough

For Example 1, `gin` encodes as `--...-.` and `zen` produces the same sequence.
`gig` produces `--...--.` and `msg` produces `--...--.` as well.
The set therefore contains two strings, so the result is 2.

## Complexity

Let C be the total number of input characters and let E be the total encoded length.
Encoding and hashing take O(C + E) time, which is O(C) for the fixed alphabet codes.
The set and encoded strings use O(E) space.
Java's `StringBuilder` creates each word representation, while Python creates a list of code strings before joining.

## Edge cases

Repeated words remain one representation.
A one-letter word still produces one nonempty code.
Different source words can intentionally map to the same Morse string.

## Common mistakes

Do not count source words instead of representations.
Do not reset the representation set for each word.
Use the alphabet index rather than the character's numeric value directly.

## Language notes

Python's `ord(character) - ord('a')` mirrors Java's `char - 'a'` lookup.
The returned integer is the number of distinct set entries.
