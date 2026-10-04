## Intuition

Every lowercase letter maps to exactly one telephone keypad digit.
Instead of generating all letter combinations for the supplied digits, translate each candidate dictionary word to its digit sequence.
A word qualifies precisely when that sequence equals the requested one.

## Brute force

Enumerate every possible letter combination for the digit string and look each up in a dictionary set.
With up to four letters per key, that can generate exponentially many strings even when the supplied candidate list is small.

## Approach

Build `KEYS` from the keypad groups for digits 2 through 9.
For each word, `_to_digits` maps its letters and joins the resulting digit characters.
Retain the word only when the complete encoded string equals `digits`.
Iterating the input list directly preserves its ordering in the returned matches.
Length equality is implicit in Python's full-string comparison and explicitly checked first in Java.

## Walkthrough

Example 1 requests `8733`.
`tree` maps through t to 8, r to 7, and both e characters to 3, so it matches.
`used` similarly maps to 8, 7, 3, 3 and matches.
`true` maps to `8783`, while `treg` maps to `8734`; both fail.
`apple` has five letters and cannot equal a four-digit sequence.
Return `["tree", "used"]` in their original candidate order.

## Complexity

For C total characters across candidate words, Python's encoding scan takes O(C) time.
Its temporary encoded string needs O(L) space for longest word length L, plus the returned matches.
The keypad mapping has constant size.

## Edge cases

No matches yield an empty list.
Several distinct words may encode identically and should all be returned.
Only the stated lowercase alphabet is used.

## Common mistakes

Using the wrong four-letter groups for 7 and 9 causes incorrect encodings.
Matching only a prefix would accept words of the wrong length.

## Language notes

Python uses a dictionary mapping and joined strings.
Java builds a 26-entry character array and compares digits position by position, avoiding a temporary encoded string for each candidate.
