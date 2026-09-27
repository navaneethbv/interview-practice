## Intuition
A breadth-first traversal naturally groups nodes by depth.
Take the maximum while processing each level, then enqueue its children for the next level.

## Brute force
A depth-first traversal could visit every node and store a maximum indexed by depth.
That is also O(N) time and O(H) recursion or map space, so it is an equally efficient alternative.
The breadth-first version makes level boundaries explicit.

## Approach
1. Put the root in a queue when it exists.
2. Record the queue size as the current level size.
3. Remove exactly that many nodes, update the maximum, and enqueue children.
4. Append the maximum and repeat.

## Walkthrough
Example 1 has tree `[2, 5, 1, 3, 4]`.
The first level contains only 2, so its maximum is 2.
The second level contains 5 and 1, so its maximum is 5.
Their children form the third level with 3 and 4, whose maximum is 4.
The returned list is `[2, 5, 4]`.

## Complexity
Every node enters and leaves the queue once, so time is O(N).
The queue can hold O(W) nodes for maximum width W, and the result stores O(H) maxima.
The total auxiliary storage is O(W + H).

## Edge cases
A null root returns an empty list.
Negative values work because the per-level maximum starts at the minimum integer.
A skewed tree has width one and one result per depth.

## Common mistakes
Using one global maximum loses the level boundaries.
Enqueuing children before finishing the current level mixes depths.
Returning a maximum for an empty root invents a level.

## Language notes
Python builds a new list for each next level.
Java uses a queue and a separate result list, with `Integer.MIN_VALUE` handling all valid node values.
