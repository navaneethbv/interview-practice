## Intuition

A partition is valid when every piece is a palindrome.
At each start position, try every possible ending position and recurse only after confirming that piece reads the same in both directions.
This makes each recursion level choose the next cut in the original string.

## Brute force

Trying every subset of the n - 1 possible cut positions and validating every resulting piece can take O(n² × 2^n) time.
Backtracking explores the same cut choices while rejecting a non-palindromic prefix before descending, so it avoids work below invalid cuts.
## Approach

1. Start visit at index zero with an empty path.
2. If start_index reaches the string length, copy path into result.
3. For every end_index at or after start_index, check the substring with is_palindrome.
4. Append a valid substring, recurse after it, and remove it when returning.

The path always covers a prefix of s without gaps.
Every possible cut is considered, so the result includes both short and long palindrome pieces.

## Walkthrough

Example 1 uses s = aab.

| path | next substring | Action |
| --- | --- | --- |
| [] | a | choose the first a |
| [a] | a | choose the second a |
| [a, a] | b | choose b and record [a, a, b] |
| [a] | ab | reject because it is not a palindrome |
| [] | aa | choose aa |
| [aa] | b | choose b and record [aa, b] |

The output is [[a, a, b], [aa, b]].

## Complexity

Let n be the string length.
There are O(2^n) cut patterns, and each candidate palindrome check can scan O(n) characters.
Including substring creation and result copying, a safe upper bound is O(n² × 2^n) time.
The returned partitions use O(n × 2^n) space, and the recursion path uses O(n) auxiliary space.

## Edge cases

An empty string reaches the base case and returns one empty partition.
Every single character is a palindrome and can always be selected.
A string with no longer palindrome still has the character-by-character partition.
Repeated characters can create several distinct valid cut patterns.

## Common mistakes

- Checking only the first and last character misses longer mismatches.
- Advancing past the chosen substring by the wrong index skips characters or repeats them.
- Saving the mutable path directly corrupts completed partitions.
- Stopping after the first palindrome loses alternate cuts.

## Language notes

Python slices the selected text when it appends a piece.
Java uses substring with an inclusive end converted to end_index + 1.
Both keep palindrome checking in a helper so the recursive method remains focused.
