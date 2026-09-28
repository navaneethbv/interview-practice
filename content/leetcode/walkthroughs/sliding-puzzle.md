## Intuition

Every board arrangement is a graph node, and one move swaps the blank with one adjacent tile.
Breadth-first search visits arrangements by move count, so the first time it reaches the target is optimal.

## Brute force

Depth-first search can explore all reachable arrangements, but it must track the shortest path and may revisit states many times.
The six-tile state space is small, and BFS gives the shortest result directly.

## Approach

1. Flatten the two rows into a six-value tuple or string.
2. Put the start state in a queue with distance zero and record it in `seen`.
3. Find the blank and swap it with each position listed in `neighbors`.
4. Enqueue each unseen state at the next distance.
5. Return the distance at the target, or `-1` after the queue is exhausted.

## Walkthrough

For Example 1, `board = [[1, 2, 3], [4, 0, 5]]` becomes `(1, 2, 3, 4, 0, 5)`.
The blank is at index 4, whose neighbors include index 5.
Swapping those positions produces `(1, 2, 3, 4, 5, 0)`, the target.
It is found at distance 1, so the answer is `1`.

## Complexity

The fixed six-position graph has at most `6!` states, and each state has at most four moves, so time and space are `O(6!)`, effectively constant.
Each generated state copies six values or characters.

## Edge cases

The target input returns zero immediately when dequeued.
Some permutations are unreachable, such as Example 2, and exhaust the visited state space with result `-1`.

## Common mistakes

- Marking a state after dequeuing allows duplicate queue entries.
- Returning when generating the target without BFS levels can be wrong if queue distances are not tracked.
- Using a grid neighbor relation after flattening without a fixed index map creates illegal swaps.

## Language notes

Python uses tuples and `deque`, while Java uses strings and `ArrayDeque<String>` to make states hashable.
The Java reference processes one queue level at a time, so `moves` is the BFS distance.
