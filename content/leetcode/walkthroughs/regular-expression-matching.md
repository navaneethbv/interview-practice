## Intuition

A pattern position describes how a string prefix can end.
A normal letter or dot consumes one character, while a star can either skip its preceding token or consume one matching character and remain available.
Dynamic programming captures those two choices and requires the final state to consume both complete inputs.

## Brute force

A recursive matcher branches whenever it sees a star.
Repeated star choices can revisit the same string and pattern suffix, causing exponential behavior.
The table stores each pair of prefix lengths once.

## Approach

1. Define matches[i][j] as whether s[:i] matches p[:j].
2. Set the empty-to-empty state to true.
3. Initialize empty-string states for patterns such as a* and a*b*.
4. For a normal token, require a character match and the diagonal state.
5. For star, either skip two pattern characters or consume one matching string character and keep the same pattern index.
6. Return the full-prefix state.

## Walkthrough

Example 1 checks s = "aab" against p = "c*a*b".
The empty string skips c* and then a*, so those starred prefixes are true.
The first a is consumed by a*, and the second a stays on the same star state.
The final b matches the final pattern token, producing matches[3][5] = true.

## Complexity

- Time: O(len(s) × len(p)), for the dynamic programming table.
- Space: O(len(s) × len(p)), for matches.

## Edge cases

A star may represent zero repetitions, including a whole empty pattern prefix.
A dot matches any single character but still consumes exactly one character.
A pattern that matches only a prefix is rejected by returning the full-prefix state.
The input guarantee that every star has a preceding token makes pattern_index - 2 valid.

## Common mistakes

- Treating star as matching any arbitrary suffix without its preceding token.
- Advancing the pattern when a star consumes a character.
- Returning true after matching only part of s.
- Forgetting empty-string initialization for consecutive starred tokens.

## Language notes

Python uses nested lists of booleans.
Java uses a rectangular boolean array and charAt.
Both implementations keep the same skip-or-consume transition.
