## Intuition

A candidate path must match the word in order while using each cell at most once.
Depth-first search can explore one matching prefix at a time.
Visited state belongs to the current path, so it must be undone when returning to try a different route.

## Brute force

Enumerate arbitrary adjacent walks of the required length, then check their letters and repeated cells afterward.
This explores many paths that could have been rejected on their first mismatch.
Backtracking prunes immediately when a cell is outside the grid, already used, or has the wrong letter.

## Approach

1. Reject a word longer than the total number of board cells.
2. Try every cell as a starting point for index zero of `word`.
3. In `search` (`_search` in Python), reject invalid coordinates, visited cells, and character mismatches.
4. Return true when the current matching character is the final one.
5. Otherwise mark the cell, try its four neighbors for the next character, then unmark it before returning the result.
6. Return false if every starting point fails.

The path-local visited invariant prevents reuse while still allowing different candidate paths to explore the same cell.
The board's letters never need to be overwritten.

## Walkthrough

Example 1 is `[["C", "A", "T"], ["R", "R", "E"]]` with `word = "CATE"`.

| Word index | Matching cell | Path prefix |
| --- | --- | --- |
| 0 | `(0,0)` = C | C |
| 1 | `(0,1)` = A | CA |
| 2 | `(0,2)` = T | CAT |
| 3 | `(1,2)` = E | CATE |

Out-of-bounds and mismatching neighbors fail before this successful route is found.
The final match returns true, and earlier recursive frames remove their visited marks while unwinding.

## Complexity

- Time: O(RC × 3^L) as a worst-case search bound for word length L, with up to four first moves and at most three continuing directions after excluding the immediately previous cell.
- Space: O(L) for Python's path set and recursion; Java additionally allocates an O(RC) visited matrix, giving O(RC + L).

## Edge cases

A one-character word succeeds at any matching cell.
Repeated letters still require distinct cell positions.
Uppercase and lowercase letters are different.
A word longer than the board cannot fit without reuse and is rejected immediately.

## Common mistakes

- Keeping cells globally visited across different paths can reject a valid alternative route.
- Forgetting to unmark during backtracking has the same effect.
- Allowing diagonal moves changes the adjacency rule.

## Language notes

Python uses a set of coordinate tuples and short-circuiting `any` over neighbors.
Java uses a boolean matrix and short-circuiting OR calls.
Both recurse only to the bounded word length, at most 15 under the statement's constraints.
