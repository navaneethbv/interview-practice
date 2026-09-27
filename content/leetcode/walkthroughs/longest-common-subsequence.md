## Intuition

Consider the best common subsequence for prefixes of the two strings.
Matching final characters can extend the best solution for both shorter prefixes.
Otherwise, an optimal solution must skip the current character from at least one string, so take the better of those two possibilities.

## Brute force

Enumerate subsequences of one string and check whether each occurs in the other.
There can be exponentially many subsequences, making this infeasible for strings of length 1,000.
Dynamic programming shares work across overlapping prefix pairs.

## Approach

1. Use prefix DP, storing the previous row of prefix-pair answers in `previous`.
2. Initialize that row to zeros for an empty prefix of `text1`.
3. For each `first` character in `text1`, start a zero-based `current` row.
4. At `column` in `text2`, matching characters give `previous[column] + 1`.
5. Otherwise take `max(previous[column + 1], current[column])`, skipping one character from either prefix.
6. Replace `previous` with `current` and return its final entry.

The extra zero column represents the empty second prefix.
Only the previous row and the already completed portion of the current row are needed.

## Walkthrough

Example 1 compares `text1 = "abcde"` and `text2 = "ace"`.
Each row lists counts for second-string prefixes `""`, `"a"`, `"ac"`, and `"ace"`.

| First-string prefix | DP row |
| --- | --- |
| Empty | `[0, 0, 0, 0]` |
| `a` | `[0, 1, 1, 1]` |
| `ab` | `[0, 1, 1, 1]` |
| `abc` | `[0, 1, 2, 2]` |
| `abcd` | `[0, 1, 2, 2]` |
| `abcde` | `[0, 1, 2, 3]` |

The final value is 3, corresponding to `ace`.

## Complexity

- Time: O(mn), for string lengths m and n, since every prefix pair is processed.
- Space: O(n), retaining two rows sized from `text2`.

## Edge cases

Strings with no shared characters leave all entries zero.
Repeated characters are handled through their prefix positions, preventing reuse of one position.
The references also return zero for an empty string, though both are nonempty in the statement.

## Common mistakes

- Requiring consecutive matches solves common substring instead of subsequence.
- Using the current diagonal instead of the previous-row diagonal reuses characters.
- Omitting the empty-prefix column complicates or breaks the first-character transition.

## Language notes

Python appends each result to `current`, so `current[-1]` is the left neighbor.
Java allocates the entire row and reads that neighbor at `current[column]`.
Java uses `charAt` rather than copying the first string into a character array, preserving the stated row-storage bound.
