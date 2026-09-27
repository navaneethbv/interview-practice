## Intuition

An abbreviation alternates literal letters with decimal counts of skipped word characters.
Two indexes can consume the word and abbreviation from left to right without expanding any skipped section.
A number cannot start with zero, and every skip must remain within the word.

## Brute force

A naive parser could build each expanded abbreviation as a string and compare it with word.
That uses O(n) expansion space and can repeatedly allocate intermediate strings while parsing counts.
Index arithmetic validates the same conditions without materializing the expansion.

## Approach

1. Set word_index and abbreviation_index to zero.
2. Reject a zero digit at the start of a number.
3. Read consecutive digits into one skip count and advance word_index by that count.
4. For a literal character, require the current word character to match.
5. Reject an index beyond the word and finally require both strings to be fully consumed.

## Walkthrough

Example 1 uses word = "internationalization" and abbr = "i18n".

| abbreviation part | word position | action |
| --- | ---: | --- |
| i | 1 | match the initial i |
| 18 | 19 | skip the next 18 letters |
| n | 20 | match the final n |

The word index reaches its length exactly, so the abbreviation is valid.

## Complexity

Let a be the abbreviation length and w be the word length.
Each character in abbr is read once and each word position is skipped or matched once, so time is O(a + w).
The parser stores only indexes and a numeric count, giving O(1) auxiliary space.
The Java count uses long while parsing to avoid overflow before it is compared with the remaining word length.

## Edge cases

A literal abbreviation equal to word is valid.
A zero count such as 0 or 02 is invalid because counts cannot begin with zero.
A count larger than the remaining word is rejected.
An abbreviation that consumes only part of word is invalid.

## Common mistakes

- Treating each digit as a separate skip loses multi-digit counts.
- Allowing a leading zero accepts invalid forms such as a02e.
- Checking only the final word index can miss a literal mismatch.
- Expanding the abbreviation is unnecessary and risks large temporary strings.

## Language notes

Python integers grow as needed while its helper returns the count and next abbreviation index.
Java uses long for the count and checks it against the remaining length before converting to int.
Both keep the original word and abbreviation immutable.
