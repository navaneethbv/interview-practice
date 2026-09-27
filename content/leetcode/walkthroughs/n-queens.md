## Intuition

Place exactly one queen in each row and reject a column or diagonal that is already occupied.
If a row has no legal column, backtracking removes the previous queen and tries its next option.
The three sets make the safety test constant time.

## Brute force

Trying every permutation of columns takes O(n × n!) time when each completed placement checks its rows and diagonals, with O(n²) board storage.
The backtracking search rejects occupied columns and diagonals as soon as they become impossible, so it avoids completing most invalid permutations.
## Approach

1. Track used_columns, used_down_diagonals, and used_up_diagonals.
2. At row, try every column that is absent from all three sets.
3. Add the column and both diagonal keys, append the rendered row, and recurse.
4. When row reaches n, copy board into result.
5. Remove the row and all three keys before trying another column.

The diagonal keys are row minus column and row plus column.
Each branch places one queen per row, so a completed board automatically has n queens.

## Walkthrough

Example 1 uses n = 1.

| row | candidate column | occupied keys | board |
| ---: | ---: | --- | --- |
| 0 | 0 | column 0, diagonals 0 and 0 | [Q] |
| 1 | none | all rows placed | record [Q] |

There is one valid board because the only cell can hold the queen.

## Complexity

The search explores a pruned subset of row permutations, with O(n!) as a common upper bound for this backtracking search.
Constructing a row string costs O(n), and copying the completed list of row references also costs O(n).
Including candidate scans and these copies gives a safe O(n × n!) search-time bound.
The marker sets and recursion use O(n) auxiliary state, while the current board stores n strings of length n and uses O(n²) space.
The returned boards represent O(n² × S) characters for S solutions, though immutable row strings can be shared between boards.

## Edge cases

For n = 1 the single board is returned.
For n = 2 and n = 3 no branch reaches a complete placement, so the result is empty.
The diagonal offsets stay distinct even when two cells share a row or column.
Backtracking clears every marker before the next sibling branch.

## Common mistakes

- Checking only columns allows diagonal attacks.
- Using one diagonal key for both slopes rejects legal placements.
- Forgetting to undo a marker contaminates later rows.
- Saving the mutable board itself changes earlier solutions.

## Language notes

Python stores diagonal integers in sets and builds each row with string multiplication.
Java uses boolean arrays and offsets row minus column by n to avoid negative indexes.
Both copy the board only when a complete placement is found.
