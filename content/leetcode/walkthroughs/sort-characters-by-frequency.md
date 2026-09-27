## Intuition

Count each character, order characters by decreasing count, and repeat each character its frequency.
The output groups equal characters together.

## Brute force

Repeatedly searching for the next most frequent unprocessed character scans the frequency table many times.
Sorting the distinct characters performs that ordering once.

## Approach

1. Build a frequency map.
2. Sort distinct characters by count descending.
3. Append each character repeated by its count.

## Walkthrough

Example 1:

For aabbc, counts are a:2, b:2, and c:1.
The stable ordering used by the local references emits aabbc, which satisfies the required frequencies.

## Complexity

With n characters and u distinct characters, counting takes O(n) and ordering takes O(u log u).
Building the output takes O(n), and the output itself uses O(n) space.
Python multiplication creates each repeated substring, while Java repeat and StringBuilder create the final text.

## Edge cases

An empty string returns an empty string.
One distinct character requires no meaningful ordering.
Characters are compared according to the language's character ordering when frequencies tie.

## Common mistakes

Do not return only one occurrence per distinct character.
Use descending frequency.
Do not lose punctuation or uppercase characters because they are valid input characters.

## Language notes

Python uses Counter and sorted.
Java uses HashMap, a sorted character list, and StringBuilder.
The map retains every character that appears in the input.
The final length therefore equals the original string length.
Ordering is the only transformation applied to those characters.
No character is omitted when two frequencies tie.
