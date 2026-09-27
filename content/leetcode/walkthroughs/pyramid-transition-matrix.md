## Intuition

Each adjacent pair in a row independently offers a small set of possible blocks above it.
Backtracking explores those choices, while memoizing complete rows prevents the same subproblem from being rebuilt.

## Brute force

Trying every possible pyramid without memoization can branch exponentially and revisit identical intermediate rows.
Memoization is especially helpful when different lower choices produce the same next row.

## Approach

1. Group allowed triples by their two-character bottom pair.
2. For a row, recursively build the next row one character at a time.
3. When the next row is complete, solve it as a memoized subproblem.
4. Return true when a row of length one is reached.

## Walkthrough

This is Example 1 from the local statement.
For bottom `ABC`, rules `ABD`, `BCE`, and `DEF` map `AB` to D and `BC` to E.
The next row is therefore `DE`.
The pair `DE` maps to F, producing a one-block top and returning true.

## Complexity

The worst-case search is exponential in the bottom width, which is at most 6 locally.
Memoization stores each reachable row string, while recursive extension frames can reach O(width^2) depth across row transitions.
The active recursive path can retain O(width^3) characters across partial row strings.
Separately, if M different row strings are memoized, their keys require O(M * width) space, which can be exponential rather than cubic.

## Edge cases

If a pair has no allowed character, that branch fails immediately.
Multiple allowed characters for one pair create separate backtracking branches.
A row of length one is already a completed pyramid.

## Common mistakes

Preserve pair order because `AB` and `BA` can have different rules.
Backtrack the mutable next-row builder after a failed choice.
Memoize complete rows, not only the current pair index.

## Language notes

Python uses `lru_cache` and a nested extension helper, while Java stores memo results in a map.
The Java reference uses `StringBuilder` to build a candidate next row without repeated immutable concatenation.
