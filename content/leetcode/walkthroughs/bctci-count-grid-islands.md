## Intuition

An island is exactly one connected component of land under four directional movement.
After discovering any cell of an island, visiting every land cell reachable from it prevents that same island from being counted again.

## Brute force

Starting a fresh unrestricted traversal from each land cell would repeatedly explore the same component.
The reference combines one grid scan with persistent visitation information, so each land cell enters a flood fill at most once.

## Approach

Scan coordinates in row order.
When an unseen land cell is found, increment `islands`, mark it immediately, and place it on `stack`.
Repeatedly pop a cell and push its unvisited land neighbors after marking them.
Continue the outer scan after the stack becomes empty.

## Walkthrough

Example 1 first discovers the isolated land at row 0, column 2.
The next new island contains `(1, 0)` and `(1, 1)`.
The land at `(1, 3)` connects to `(2, 3)` and `(2, 2)`.
These three flood fills produce answer 3.

## Complexity

For N total grid cells, scanning and exploring four neighbors per visited land cell takes O(N) time.
The stack can hold O(N) cells.
Python additionally stores up to O(N) coordinate pairs in `seen`, so both versions have O(N) worst case auxiliary space.

## Edge cases

An empty grid or rows containing no land return zero.
Diagonal contact alone does not join two islands.
An entirely land filled rectangle is one island, while separated corner cells may represent several independent islands.

## Common mistakes

Mark neighbors when pushing them, rather than waiting until they are popped, to prevent duplicate pending work.
Check row and column bounds before reading a neighbor.
Include only up, down, left, and right connections in the traversal.

## Language notes

Python preserves the input by recording coordinate tuples in `seen`.
Java's `sink` marks visited land by replacing it with zero in the grid.
Both use explicit stacks, avoiding recursion depth limits on a large connected island.
