## Intuition

After a prefix has been fully reduced, its remaining characters contain no equal adjacent pair.
The next character can create a removable pair only with the final character of that reduced prefix.
A stack therefore represents exactly the reduced result of everything scanned so far.

## Brute force

Repeatedly search the current string for an equal adjacent pair, delete it, and restart the scan.
There can be O(n) deletions, each requiring O(n) scanning or copying, for O(n²) total time.
Keeping the reduced prefix avoids rescanning characters whose status has already been resolved.

## Approach

1. Initialize an empty `stack`.
2. Read each `character` from left to right.
3. If the stack is nonempty and its final character matches, remove that final character and discard the current one.
4. Otherwise append the current character.
5. Convert the final stack into the returned string.

After a deletion, the earlier stack prefix remains reduced by the invariant.
The next unread character will handle any new pair that becomes possible at the boundary.

## Walkthrough

Example 1 is `s = "abbaca"`.

| Character read | Stack after processing |
| --- | --- |
| a | `a` |
| b | `ab` |
| b | `a` |
| a | empty |
| c | `c` |
| a | `ca` |

The two b characters cancel first.
Their removal exposes the earlier a, which then cancels with the next a.
The final stack is `ca`, which has no adjacent equal pair.

## Complexity

- Time: O(n), because each character is appended at most once and removed at most once.
- Space: O(n), for the stack and returned string in the worst case.

## Edge cases

A string with no equal neighboring characters is returned unchanged.
An even run of one repeated character disappears entirely, while an odd run leaves one copy.
Nested cancellations may remove the whole string.
The empty stack must be checked before reading its final character.

## Common mistakes

- Removing each original adjacent pair in only one pass misses pairs exposed by earlier deletions.
- Removing all copies of a repeated letter anywhere in the string violates adjacency.
- Skipping an extra input character after popping loses an unprocessed value.

## Language notes

Python uses a list as a character stack and joins once at the end.
Java uses `StringBuilder`, reads the last character with `charAt`, and removes it by decreasing the builder length.
Java iterates with indexed string access, avoiding an extra character-array copy.
