## Intuition

For a substring, matching end characters can wrap the best inner subsequence with both ends.
Otherwise the best answer skips one end, so interval dynamic programming applies.

## Brute force

Recursively trying both skipped ends creates exponential time because the same intervals recur.
Memoization reduces time but stores every interval.

## Approach

1. Process left indices from right to left.
2. Keep one-dimensional values for intervals ending at each right index.
3. Preserve the old diagonal value before overwriting it.
4. Use a matching pair or the larger neighboring subsequence.

## Walkthrough

Example 1:

For agbdba, the matching a characters wrap the best subsequence of gbdb, producing a length of 5.
The selected palindrome is abdba.

## Complexity

The triangular interval table is compressed to O(n) space.
The nested interval updates take O(n squared) time.
Python and Java both avoid allocating a full two-dimensional table.

## Edge cases

A one-character string has length one.
An empty string outside the stated bounds would need an explicit zero result before indexing.
Equal end characters use the previous diagonal, not a current-row value.

## Common mistakes

Do not overwrite the diagonal before using it.
Do not count a substring as a palindrome requirement when the task asks for a subsequence.
The answer is a length, not the palindrome text.

## Language notes

Python uses a list of integer lengths.
Java uses an int array and charAt comparisons.
The one-dimensional update still represents every needed interval from the previous round.
No characters are removed from the input string.
