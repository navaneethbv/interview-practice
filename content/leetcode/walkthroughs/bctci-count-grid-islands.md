## Intuition

Every unvisited land cell belongs to exactly one island.
Count it as a new island, then mark all land reachable through horizontal and vertical steps so no cell of that island starts another count.

## Brute force

Starting an independent traversal at every land cell repeatedly explores the same island.
Remembering visited cells turns those repeated searches into one traversal per component.

## Approach

Scan the grid in row order.
Whenever a land cell has not been visited, increment `islands` and start a stack-based flood fill.
Mark cells when pushing them, then repeatedly inspect their four orthogonal neighbors.
Push only in-bounds land that has not already been marked.
The flood fill reaches every cell in that connected component and no cell outside it.
Consequently each component triggers exactly one increment during the outer scan.

## Walkthrough

```text
Input: grid = [[0, 0, 1, 0], [1, 1, 0, 1], [0, 0, 1, 1]]
Output: 3
```

In Example 1, cell `[0, 2]` is isolated orthogonally and starts the first island.
Cells `[1, 0]` and `[1, 1]` form the second island.
Cells `[1, 3]`, `[2, 3]`, and `[2, 2]` form the third.
Diagonal contact between these groups does not connect them.
The scan therefore returns 3.

## Complexity

For N grid cells, time is O(N), since each land cell is processed once and has four neighbors.
The stack can use O(N) space.
Python additionally stores an O(N) visited set.

## Edge cases

Empty grids and grids containing only water return zero.
An all-land nonempty rectangle is one island.
Corner-touching land remains separate without an orthogonal route.

## Common mistakes

Mark on insertion, not only on removal, to avoid duplicate pending entries.
Do not add diagonal directions to the neighbor list.

## Language notes

Python preserves the input and stores coordinate tuples in `seen`.
Java marks visited land by setting it to zero, so its reference mutates the grid while avoiding a separate visited collection.
