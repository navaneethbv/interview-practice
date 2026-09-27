## Intuition

A uniform shift preserves the distance from the first character to every later character on the alphabet circle.
Represent each character by its offset from the word's first character modulo 26.
Words with the same offset sequence belong to the same group, regardless of their starting letter.
The signature also includes word length because different lengths produce different sequences.

## Brute force

A pairwise method could try every pair of words and test whether one uniform shift transforms one into the other.
For m words of maximum length L, that costs O(m²L) time.
It also needs a graph or repeated merging to combine transitive matches.
Hashing one signature per word avoids pairwise comparison.

## Approach

1. For each word, record the alphabetic code of its first character.
2. For every character, compute its nonnegative modular offset from that first code.
3. Use the offset tuple as a dictionary key in Python or a delimited string in Java.
4. Append the original word to the matching group.
5. Return all dictionary values, with order unrestricted by the spec.

## Walkthrough

In Example 1, ab has offsets [0,1] and bc also has [0,1], so they share a group.
The word az has offsets [0,25], while ba has [0,25] after wrapping around, so they share another group.
The one-letter word a has only [0] and remains separate from longer words.
In Example 2, a and z both have the one-character signature [0], so they group together.

## Complexity

Let T be the total number of characters.
Building all signatures takes O(T) time and the stored keys and groups use O(T) additional space.
Java's signature strings and Python's tuples both retain one entry per character.
Hash-map operations are expected O(1) per signature.

## Edge cases

All one-letter words share one signature.
The z to a wrap is handled by modulo 26.
Duplicate input words are appended repeatedly and remain in their group.
Words with equal adjacent offsets can contain repeated letters.

## Common mistakes

Do not use raw character differences without modulo 26.
Do not compare only adjacent pairs without preserving the first-character normalization.
Do not sort or deduplicate the words, because occurrences must be preserved.
Do not assume group order matters, since the spec uses unordered deep comparison.

## Language notes

Python stores tuple signatures and uses defaultdict for group creation.
Java uses a comma-delimited signature string so offsets cannot run together ambiguously.
Both references return lists containing the original strings.
