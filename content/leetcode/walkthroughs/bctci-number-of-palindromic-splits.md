## Intuition

Every valid partition has one final palindromic piece.
If that last piece begins at `start`, all earlier pieces form a valid partition of the prefix ending there.
Summing over possible final pieces counts each partition exactly once.

## Brute force

Try every subset of the n - 1 possible cut positions and check whether all pieces are palindromes.
There are exponentially many partitions, and palindrome checks repeat heavily.

## Approach

Precompute `palindrome[start][end]` for inclusive endpoints.
Equal boundary characters form a palindrome when the interior is palindromic, with lengths one and two as direct base cases.
Process starts in descending order so the interior state is ready.
Then let `ways[end]` count partitions of the first end characters.
Set `ways[0] = 1` as the empty-prefix identity and sum `ways[start]` whenever the final segment from start through end - 1 is palindromic.
Reduce each total modulo `MOD`.
Handle an entirely empty input separately because its public result is defined as zero.

## Walkthrough

Example 1 is `abbaab`.
The prefix counts, including the initial identity, become `[1, 1, 1, 2, 3, 5, 6]`.
For the full string, the last singleton `b` extends the five partitions of `abbaa`.
The other palindromic final piece is `baab`, beginning at index 2, which extends the one partition of `ab`.
Thus the final total is `5 + 1 = 6`.

## Complexity

The palindrome table and prefix transitions each take O(n²) time.
The boolean table uses O(n²) space, and `ways` adds O(n).

## Edge cases

A one-character string has one partition.
For a string of all identical characters, every cut pattern is valid.

## Common mistakes

Do not confuse the internal empty-prefix count of one with the empty-input answer of zero.
Every piece must be nonempty.

## Language notes

Python stores the recurrence in nested lists.
Java uses a boolean matrix and long totals before reducing modulo 1,000,000,007.
