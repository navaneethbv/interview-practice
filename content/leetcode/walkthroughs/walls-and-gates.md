## Intuition

Every gate is a source with distance zero.
Starting a breadth first search from all gates at once means the first time an empty room is reached, the path is shortest.
Walls are never enqueued, and already numbered rooms are not revisited.

## Brute force

Running a separate breadth first search from every empty room to find its nearest gate can revisit the grid for each of O(R × C) rooms, taking O((R × C)²) time.
The multi-source queue starts all gates together, so every room is assigned once at its shortest distance.
## Approach

1. Put every gate in queue before processing any room.
2. Remove one room and read its current distance.
3. For each four-directional neighbor, accept only an empty room with value 2147483647.
4. Set that room to distance plus one and enqueue it.
5. Continue until queue is empty.

Because BFS processes layers in increasing distance order, a room is written by the nearest gate.
Using the room value as both distance and visited marker keeps the state in rooms itself.

## Walkthrough

Example 1 uses rooms = [[2147483647, 0], [2147483647, -1]].

| queue event | cell value | update |
| --- | ---: | --- |
| seed gate at (0, 1) | 0 | enqueue the gate |
| process (0, 1) | 0 | wall is ignored, room (0, 0) becomes 1 |
| process (0, 0) | 1 | room (1, 0) becomes 2 |

The final rooms are [[1, 0], [2, -1]].

## Complexity

Let R and C be the grid dimensions.
Each empty room is enqueued at most once and each cell checks four neighbors, so time is O(R × C).
The queue can contain O(R × C) cells, giving O(R × C) auxiliary space.

## Edge cases

With no gates, every empty room keeps its sentinel value.
A wall remains -1 and is never traversed.
A gate keeps distance zero even when another gate is nearby.
An empty grid returns immediately without indexing a row.

## Common mistakes

- Starting one BFS per gate can repeat work and lose the clean nearest-source guarantee.
- Treating walls as rooms lets paths cross blocked cells.
- Marking after dequeueing can enqueue the same room repeatedly.
- Adding one to the wrong cell's distance creates layer errors.

## Language notes

Python uses collections.deque and popleft for FIFO processing.
Java uses ArrayDeque and a helper that writes the sentinel value only once.
Both versions mutate rooms and therefore use no separate visited matrix.
