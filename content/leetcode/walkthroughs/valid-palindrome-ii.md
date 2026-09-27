## Intuition

A palindrome can be checked from both ends toward the center.
At the first mismatch, an allowed deletion must remove either the left character or the right character.
Checking those two remaining ranges is sufficient because every earlier pair already matched.

## Brute force

Deleting each of the n positions and checking the resulting string can take O(n²) time and O(n) temporary string space.
The two pointer method checks the original string once and validates at most two suffix ranges.

## Approach

1. Set left and right at the ends of s.
2. Move inward while the characters match.
3. At the first mismatch, call the palindrome helper after skipping left or after skipping right.
4. Return true if either range is a palindrome.
5. If no mismatch occurs, return true without deleting a character.

## Walkthrough

Example 1 uses s = "abca".

| left | right | comparison | helper check |
| ---: | ---: | --- | --- |
| 0 | 3 | a equals a | move inward |
| 1 | 2 | b differs from c | try skipping b or c |
| skip b | 2 to 2 | one character c | true |
| alternative skip c | 1 to 1 | one character b | would also be true |

Deleting b gives "aca", so the first helper succeeds and the method returns true.
Deleting c would give "aba", but short-circuit evaluation does not execute that second helper in this example.

## Complexity

Let n be the string length.
The outer scan is linear, and after one mismatch each helper examines at most the remaining characters, so time is O(n).
The helpers use O(1) auxiliary space because they compare indexes without slicing.

## Edge cases

A one-character string is already a palindrome.
An already palindromic string succeeds without using the deletion.
A two-character string always succeeds because one character may be deleted.
Two mismatches after the first deletion make the answer false.

## Common mistakes

- Deleting only the left mismatch misses cases where the right character must be removed.
- Allowing two deletions accepts invalid strings.
- Slicing candidate strings hides the constant-space property.
- Continuing after the first mismatch without branching can choose the wrong deletion.

## Language notes

Python and Java both pass index ranges to a helper instead of allocating substrings.
Java's short-circuit OR avoids running the second helper when the first deletion works.
The input remains unchanged in both languages.
