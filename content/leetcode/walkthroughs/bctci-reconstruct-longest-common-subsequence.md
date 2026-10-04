## Intuition

First learn the best remaining subsequence length for every pair of suffixes.
Then walk through those suffix states, choosing matching characters or skipping a character along a direction that preserves the optimal length.
This separates measuring the optimum from reconstructing one concrete answer.

## Brute force

Enumerate all subsequences of one string and test which are subsequences of the other.
There are exponentially many choices, with extensive repetition among suffix comparisons.

## Approach

Define `table[i][j]` as the LCS length of suffixes beginning at i and j.
Fill backward, using one plus the diagonal entry when characters match and the maximum of the two skip entries otherwise.
The extra bottom row and right column represent empty suffixes with length zero.
For reconstruction, begin at `(0, 0)`.
Append a matching character and advance both indices.
On a mismatch, skip from the first string when its next-row value is at least the next-column value; otherwise skip from the second.
Stop when either string is exhausted.

## Walkthrough

Example 1 compares `HAHAH` with `AAAAHH`.
The initial H can be skipped while preserving length three.
The next A matches an A, the intervening H is skipped, and the next A supplies a second match.
A later H matches one of the final H characters in the second string.
The references reconstruct `AAH`, whose length three is certified by the table's initial entry.

## Complexity

For lengths n and m, table construction takes O(n times m) time and space.
Reconstruction takes O(n + m) time and O(min(n, m)) output storage.
Both references retain the full table because reconstruction needs future skip choices.

## Edge cases

An empty string yields an empty subsequence.
Several different optimal strings may exist; the checker accepts any longest common subsequence.

## Common mistakes

A subsequence may skip characters, unlike a substring.
Do not require the reconstructed string to equal one particular sample when another optimal answer exists.

## Language notes

Python collects characters in a list and joins once.
Java uses `StringBuilder`, avoiding repeated immutable-string concatenation during reconstruction.
