## Intuition

A cell's best continuation depends on which cells have already been used.
Four-direction movement therefore requires exploring simple paths rather than applying the usual right-and-down grid recurrence.

## Brute force

The reference deliberately performs exhaustive search because the grid is tiny.
Choosing the largest neighboring value greedily can trap the path or sacrifice a better later route.

## Approach

Mark the starting cell visited and call `walk` with its value already included in `total`.
For each in-bounds, unvisited neighbor, mark it, recurse with its value added, then unmark it when returning.
This restoration lets another candidate path use that cell independently.
At the bottom-right cell, update `best` and stop extending that path.
Every accepted recursion branch is a valid simple path, and every simple path can be generated through its sequence of neighbor choices.

## Walkthrough

```text
Input: grid = [[1, -4, 3], [-2, 7, -6], [5, -4, 9]]
Output: 12
```

In Example 1, one optimal route goes right, down, left, down, right, right.
Its cell values are 1, -4, 7, -2, 5, -4, and 9, totaling 12.
The route must briefly move left, so a right-and-down-only search would miss it.
The search marks each cell as it enters this branch and removes those marks on return.
Comparing this total with every other complete simple path leaves 12 as the maximum.

## Complexity

With N cells, a conservative time bound is O(4 to the power N).
The visited grid and recursion stack use O(N) space.
The exponential bound is why this approach is limited to small grids.

## Edge cases

A one-cell grid returns its value immediately.
All-negative grids still require a complete start-to-destination path.

## Common mistakes

Initializing the answer to zero incorrectly beats every negative route.
Failing to undo visited state prevents legitimate alternative paths.

## Language notes

Python uses `None` before the first complete path.
Java uses `Integer.MIN_VALUE`; both retain negative answers correctly.
