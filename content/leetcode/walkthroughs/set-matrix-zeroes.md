## Intuition

Writing zeros immediately can make new zeros look like original triggers and clear too much of the matrix.
First record which rows and columns need clearing, then apply those marks.
The first row and column can store the marks, provided their original zero status is saved separately.

## Brute force

Copy the matrix, then clear rows and columns for zeros found in the copy.
This uses O(RC) extra space and can repeatedly clear the same rows and columns.
Separate row/column sets improve that overhead but still use O(R + C) space.

## Approach

1. Save whether the original first row or first column contains a zero.
2. Scan only interior cells; for every original zero, mark its row at `matrix[row][0]` and its column at `matrix[0][column]`.
3. Scan the interior again, clearing cells whose row or column marker is zero.
4. Clear the first row if its saved flag is true.
5. Clear the first column if its saved flag is true.

Markers are created only from the original interior scan, before any interior clearing occurs.
Saving two separate flags avoids overloading the shared top-left cell with two independent meanings.

## Walkthrough

Example 1 starts with `[[1, 2, 3], [4, 0, 6]]`.

| Stage | Matrix |
| --- | --- |
| Save flags | Both flags false |
| Mark zero at `(1,1)` | `[[1, 0, 3], [0, 0, 6]]` |
| Clear interior from headers | `[[1, 0, 3], [0, 0, 0]]` |
| Apply saved first-row/column flags | Unchanged |

The marker zero in the first row does not clear that entire row because the row's original flag was false.

## Complexity

- Time: O(RC), using a constant number of full or boundary scans.
- Space: O(1), because markers live inside the matrix and only two flags are retained.

## Edge cases

A zero at `(0,0)` correctly marks both original boundary flags.
Single-row and single-column matrices rely mainly on those flags because there is no interior.
An all-nonzero matrix remains unchanged.

## Common mistakes

- Clearing during discovery lets newly written zeros spread incorrectly.
- Forgetting the original first-row and first-column states confuses marks with triggers.
- Clearing headers before reading them loses information for interior updates.

## Language notes

Python uses `any` to compute the initial flags.
Java scans into boolean flags and uses `Arrays.fill` when clearing the first row.
Both separate marking from clearing into small helpers and return nothing, letting the harness inspect the mutated matrix.
