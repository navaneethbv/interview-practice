## Intuition

A longest common subsequence can be reconstructed from the best answer for every pair of suffixes.
When the current characters match, that character belongs to an optimal continuation.
When they differ, skip the character whose suffix preserves the larger optimal length.

## Brute force

Trying every subset of either string is exponential.
The dynamic programming table records overlapping suffix decisions once and makes reconstruction deterministic on ties.

## Approach

1. Create `table[i][j]` as the LCS length for `s1[i:]` and `s2[j:]`.
2. Fill the table from the end toward the beginning.
3. Start at `(0, 0)` and append matching characters while advancing both indices.
4. On a mismatch, advance `i` when `table[i + 1][j]` is at least `table[i][j + 1]`, otherwise advance `j`.
5. Join the collected characters.

## Walkthrough

Example 1 compares `s1 = "HAHAH"` with `s2 = "AAAAHH"`.
The table first computes the best lengths for short suffixes, then combines them for the full strings.
During reconstruction, equal characters are appended in order, and equal-length choices prefer advancing in `s1` because of the `>=` rule.
The collected subsequence is `"AAH"`, which is valid in both inputs and has maximum length.

## Complexity

- Time: O(nm), for the table and the reconstruction scan.
- Space: O(nm), for the suffix length table.

## Edge cases

If either string is empty, the table yields an empty result.
Repeated characters can produce several valid longest subsequences.
The validator accepts any common subsequence with the optimal length.
The extra row and column of zeros handle suffixes that have ended.

## Common mistakes

- Filling forward with the wrong state can read uninitialized suffix values.
- Returning the length instead of reconstructing the string violates the method contract.
- Advancing both indices on a mismatch skips possible matches.
- Treating one valid subsequence as the only accepted spelling ignores the validator.

## Language notes

Python collects characters in a list and joins them once.
Java uses `StringBuilder` for the same linear reconstruction.
Both implementations choose the `s1` side on equal table values.
