## Intuition

An island is one four-directionally connected component of land cells.
When a land cell is found, flood fill that component, count its cells, and mark them as water.
Every later scan then starts only a new island.

## Brute force

Starting a fresh flood fill from every land cell without a shared visited marker can revisit the same component O(R × C) times, taking O((R × C)²) time.
The current search marks cells as water immediately, so each cell enters a stack at most once.
## Approach

1. Scan every cell and skip water.
2. For an unvisited land cell, call collect_island with a stack.
3. Mark a cell as water when pushing it, so it cannot be counted twice.
4. Pop cells, increment area, and push valid land neighbors.
5. Keep the largest returned area in best_area.

The input grid is mutated as the visited marker, so no separate visited matrix is needed.
The four neighbor checks are enough because diagonal contact does not connect islands.

## Walkthrough

Example 1 uses grid = [[1, 0, 1], [1, 1, 0]].

| start | cells collected | area |
| --- | --- | ---: |
| (0, 0) | (0, 0), (1, 0), (1, 1) | 3 |
| (0, 2) | (0, 2) | 1 |

The first flood fill changes its cells to zero and best_area becomes 3.
The second island cannot exceed that value, so the answer is 3.

## Complexity

Let R and C be the row and column counts.
Each cell is marked and removed from the stack at most once, so the time is O(R × C).
The stack can hold O(R × C) cells in one large island, giving that auxiliary space bound.

## Edge cases

An empty grid returns zero.
A grid containing only water never starts a flood fill.
A single land cell contributes area one.
An island touching only at a corner remains separate from its diagonal neighbor.

## Common mistakes

- Marking a cell only when popping can push it many times.
- Including diagonal directions merges islands that should stay separate.
- Forgetting to update best_area loses the largest component.
- Using the original grid values after mutation can revisit an island.

## Language notes

Python uses a list as a stack and marks cells before appending them.
Java uses ArrayDeque and delegates boundary checks to addLandNeighbor.
Both mutate grid, so the returned area is independent of any extra visited structure.
