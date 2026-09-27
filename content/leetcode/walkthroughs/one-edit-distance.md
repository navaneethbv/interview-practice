## Intuition

Two strings are one edit apart when one insertion, deletion, or replacement makes them equal.
After placing the shorter string first, the first mismatch determines which suffixes must match.

## Brute force

Trying every insertion, deletion, and replacement creates O(n squared) candidate comparisons.
The first mismatch allows one direct suffix comparison.

## Approach

1. Swap inputs so s is no longer longer than t.
2. Reject length differences above one.
3. At the first mismatch, compare suffixes after a replacement or after skipping t's extra character.
4. If no mismatch exists, accept only when t has exactly one extra character.

## Walkthrough

Example 1:

For cat and cart, c and a match, then t differs from r at index 2.
The shorter suffix after t is empty and the longer suffix after r is also empty.
That one insertion makes the strings equal, so the answer is true.

## Complexity

The scan and one suffix comparison take O(n) time.
Python and Java slicing or substring creation can use O(n) temporary space.
The algorithm itself uses O(1) counters beyond those suffix copies.

## Edge cases

Identical strings are zero edits and return false.
An empty string and a one-character string are one edit apart.
Length differences above one are impossible in one edit.

## Common mistakes

Do not accept equal strings.
For unequal lengths, skip one character only from the longer string.
Check the entire suffix after the first mismatch.

## Language notes

Python compares slices directly.
Java compares substring results and uses recursive swapping only to normalize lengths.
