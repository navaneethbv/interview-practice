## Intuition

All exits can begin a breadth first search simultaneously.
The first wave to reach a cell necessarily comes along a shortest route from whichever exit is closest, so separate searches from every cell are unnecessary.

## Brute force

Running BFS independently from each open cell can take quadratic work in the number of cells.
A multi source BFS merges all those searches by expanding outward from every exit at distance zero.

## Approach

Initialize all `distance` entries to -1 and enqueue each exit after setting it to zero.
Pop cells in FIFO order and inspect four neighbors.
For each unvisited nonwall neighbor, assign the current distance plus one and enqueue it once.

## Walkthrough

Example 1 seeds exits `(0,5)`, `(1,0)`, and `(4,1)`.
The first wave sets `(0,0)` and `(2,0)` to one from the left exit, and `(0,4)` and `(1,5)` to one from the upper right exit.
Later waves route around walls; `(4,3)` reaches distance 6.

## Complexity

For R rows and C columns, initialization and traversal take O(RC) time.
Each cell enters the queue at most once and has four neighbor checks.
The distance grid and worst case queue each use O(RC) space.

## Edge cases

Exits keep distance zero, including an isolated exit surrounded by walls.
Walls remain -1.
The statement guarantees every open cell can reach some exit, so no other cells should remain unvisited.
Multiple equally near exits require no tie breaking.

## Common mistakes

Enqueue every exit before processing any wave.
Mark a distance when enqueuing, not when dequeuing, to avoid duplicate visits.
Manhattan distance alone is insufficient because walls may force long detours, and diagonal steps are forbidden.

## Language notes

Python uses coordinate tuples in a `deque` and indexes row strings.
Java uses integer coordinate arrays in `ArrayDeque` and reads characters with `charAt`.
Both references build a separate distance matrix and preserve the input maze.
