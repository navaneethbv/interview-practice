## Intuition

Instead of asking every floor cell to find an exit, let all exits expand outward simultaneously.
Breadth-first expansion reaches each cell at the smallest possible number of steps from any starting exit.
This computes every nearest-exit distance in one traversal.

## Brute force

Run a separate breadth-first search from each floor cell until reaching an exit.
Repeatedly traversing the same passages can require quadratic work in the number of cells.

## Approach

Initialize the `distance` grid to -1 and enqueue every exit with distance zero.
Repeatedly remove the oldest cell from the queue.
Inspect its four orthogonal neighbors and ignore out-of-bounds cells, walls, and already assigned cells.
Assign each new neighbor the current distance plus one, then enqueue it.
Marking a cell when enqueued ensures it enters the queue only once.
Because all exits begin in the same queue at distance zero, wavefronts compete in increasing distance order and the first assignment is optimal.
Walls keep their original -1 values.

## Walkthrough

Example 1 begins with exits at `(0, 5)`, `(1, 0)`, and `(4, 1)`.
The cell `(0, 0)` receives distance 1 from `(1, 0)`, while `(0, 1)` and `(0, 2)` receive 2 and 3.
The wall at `(0, 3)` remains -1 and prevents crossing that row directly.
The lower passage eventually reaches `(4, 3)` with distance 6.
The resulting grid matches the local example's distances from the nearest available exit, not from a single designated exit.

## Complexity

For r rows and c columns, both references take O(r times c) time.
The distance grid and queue each require O(r times c) worst-case storage.

## Edge cases

An exit always has distance zero.
A cell adjacent to several exits is assigned once.
The problem guarantees every open cell can reach an exit.

## Common mistakes

Do not allow diagonal movement.
Starting separate sequential searches without allowing distance improvements can preserve a longer distance from an earlier exit.

## Language notes

Python uses coordinate tuples in `deque`.
Java uses `int[]` coordinates in `ArrayDeque` and explicitly fills distance rows with -1.
