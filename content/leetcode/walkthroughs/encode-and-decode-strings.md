## Intuition

A separator alone is ambiguous because the strings may contain that separator themselves.
Prefix each payload with its decimal character length and a `#` delimiter.
Once the decoder reads the length, it can consume exactly that many characters without interpreting their contents.

## Brute force

Joining strings with a chosen separator loses information when payloads contain that separator.
Escaping every reserved character can work, but introduces separate escaping and unescaping rules.
Length prefixes give a direct boundary rule and naturally preserve empty strings.

## Approach

1. For each input word, append its decimal length, `#`, and then the unchanged word.
2. Concatenate these records into one encoded string.
3. During decoding, locate the next `#` starting at `position` and parse the preceding digits as `length`.
4. Move past the delimiter and append exactly `length` characters to `result`.
5. Advance by that payload length and repeat until the encoded string ends.

Only the header delimiter is searched; delimiters inside the payload are skipped using its length.
All reconstruction information lives in the encoded string, so separate codec instances work correctly.

## Walkthrough

Example 1 encodes `["hi", "#", ""]` as `2#hi1##0#`.

| Record position | Parsed header | Payload slice | Next position |
| --- | --- | --- | --- |
| 0 | `2#` | `hi` at positions 2 through 3 | 4 |
| 4 | `1#` | `#` at position 6 | 7 |
| 7 | `0#` | Empty slice at position 9 | 9 |

The decoder reaches the end and returns the original three strings.
The payload `#` is not mistaken for the next record's delimiter.

## Complexity

Let D be total payload characters and m the number of strings.

- Time: O(D + m) under the bounded payload lengths, for either encoding or decoding.
- Space: O(D + m), including encoded output or the decoded strings and list.

## Edge cases

An empty list encodes as an empty string.
A list containing one empty string encodes as `0#`, preserving the distinction.
Digits and separators in payloads remain literal data.
Duplicate strings and input ordering are preserved.

## Common mistakes

- Splitting the entire encoded string on `#` corrupts payloads containing it.
- Advancing by only one character after a payload ignores its declared length.
- Storing the original list on the codec instance fails with a separate decoder instance.

## Language notes

Python uses `join` and slices; Java uses `StringBuilder` and exclusive-end `substring`.
Both length functions agree for the ASCII characters required here.
The decoder expects a valid string produced by this encoding format, rather than acting as a general malformed-input parser.
