## Intuition

A queen's attacks extend along eight straight rays until blocked by another queen or the board edge.
Keep the original board separate from marked attacks so an attacked empty cell never becomes a new blocking queen.

## Brute force

For every empty cell, searching all rows, columns, and diagonals can repeat long scans.
The supplied reference instead begins at each actual queen and directly marks every empty cell on its reachable rays.

## Approach

Copy the board into `unsafe` to preserve queen cells.
For each queen, consider every pair `dr, dc` from -1 through 1 except `(0, 0)`.
Advance along that direction while inside the board and on original empty cells, marking each destination unsafe.

## Walkthrough

Example 1 has queens at `(0,3)` and `(3,0)`.
They mark their entire rows and columns plus the shared descending diagonal through `(1,2)` and `(2,1)`.
The cells `(1,1)` and `(2,2)` remain safe, producing zeros only at those positions.

## Complexity

The simple per queen bound is O(n squared + qn) for q queens.
A tighter bound is O(n squared): each empty cell can be scanned by only the nearest queen in each of eight directions because queens block rays.
The copied output uses O(n squared) space.

## Edge cases

A board with no queens returns an unchanged all zero copy.
A queen cell is unsafe even if no other queen attacks it.
Adjacent queens stop each other's rays immediately.
A one cell board preserves either zero or one.

## Common mistakes

Exclude direction `(0, 0)` or the traversal cannot progress.
Check blockers in `board`, not in `unsafe`.
Do not add knight moves or stop a ray at an already attacked empty cell; neither matches queen movement.

## Language notes

Python precomputes direction pairs in a class constant and copies each row.
Java nests direction loops inside `markAttacks` and clones rows.
Both references preserve original occupancy, which is essential for correct blocking behavior.
