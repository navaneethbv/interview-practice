## Intuition

Because grid values are binary, a zero-sum path can visit only zero cells.
Count routes through those cells using the three possible predecessor directions, treating every one cell as blocked.

## Brute force

Enumerating every path is exponential because each step can branch right, down, or diagonally.
Many routes share the same suffix, so dynamic programming combines them into one count per cell.

## Approach

Process rows from top to bottom and columns left to right.
For a zero cell, add counts from above, left, and upper-left, reducing modulo `MOD`.
Initialize the unblocked starting cell with one route.
Leave blocked cells at zero.
`previous` holds the preceding row and `current` the row being constructed.
Each route has one unique final step, so the three predecessor sets are disjoint and their counts can be added.
Only the preceding row is needed after finishing a row.

## Walkthrough

```text
Input: grid = [[0, 1, 1], [0, 0, 0], [1, 0, 0]]
Output: 7
```

Example 1 produces first-row counts `[1, 0, 0]` because the two one cells block travel.
The second-row counts become `[1, 2, 2]`.
The third row begins with a blocked zero-count position, then counts 3 ways into its middle cell.
The final cell receives 2 from above, 3 from the left, and 2 diagonally, giving 7.

## Complexity

For R rows and C columns, time is O(RC).
Two row buffers use O(C) extra space.
Counts are reduced after each cell, keeping stored values bounded.

## Edge cases

A blocked start or destination yields zero.
A one-cell zero grid has one path.
Diagonal movement can bypass blocked orthogonal neighbors when its destination is clear.

## Common mistakes

Do not count only right and down predecessors.
Do not initialize every first-row cell to one regardless of obstacles.

## Language notes

Python uses its integer arithmetic and a row helper.
Java uses long intermediates because adding three reduced counts can exceed a signed int before applying the modulus.
