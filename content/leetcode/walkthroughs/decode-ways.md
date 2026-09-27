## Intuition

A valid decoding ends in either a one-digit code or a two-digit code.
These options contribute the decoding counts for the prefix before that final code.
Zero cannot stand alone, so validity checks must precede adding either contribution.

## Brute force

Recursively try every valid one- and two-digit split.
Strings with many valid pairs generate exponentially many branches that repeatedly solve identical suffixes.
Rolling prefix DP reduces this to one pass.

## Approach

1. Let `previous` count decodings through the first character: zero for `'0'`, otherwise one.
2. Let `older = 1` represent the empty prefix before that character.
3. At each later `index`, start `current` with `previous` if the current digit is nonzero, or zero otherwise.
4. If the two-digit `pair` ending here lies between 10 and 26, add `older`.
5. Shift `older` and `previous` forward and return the final `previous`.

The two contributions correspond to different final code lengths and therefore cannot count the same split twice.
A pair such as 06 is rejected because its numeric value is below 10.

## Walkthrough

Example 1 is `s = "121"`.

| Prefix | One-digit contribution | Two-digit contribution | New `previous` |
| --- | --- | --- | --- |
| `1` | Initialization: 1 | None | 1 |
| `12` | 1 from prefix `1` | 1 from empty prefix using 12 | 2 |
| `121` | 2 from prefix `12` | 1 from prefix `1` using 21 | 3 |

The three splits are `1|2|1`, `12|1`, and `1|21`.
Return 3.

## Complexity

- Time: O(n) DP transitions, with constant-size digit checks per character.
- Space: O(1) integer states; Python's exact counts can require multiple machine words for large prefixes.

## Edge cases

A leading zero starts with zero ways.
Codes 10 and 20 are valid pairs even though their final digit cannot stand alone.
For `100`, the second zero has neither a valid one-digit contribution nor a valid pair, producing zero.

## Common mistakes

- Treating zero as a standalone letter accepts invalid strings.
- Allowing every numeric value at most 26 accidentally accepts leading-zero pairs.
- Updating `older` before calculating the pair contribution loses the needed prefix count.

## Language notes

Python parses a two-character slice and retains exact counts.
Java computes the pair from character digits and accumulates in `long`, capping stored prefix counts at `Integer.MAX_VALUE`.
Capping is safe under the bounded-final-answer contract because transitions only select and add nonnegative counts: an oversized prefix that contributes to the final answer would force that answer to be oversized too.
