## Intuition
Breadth-first traversal groups nodes by depth.
Summing one queue layer at a time gives the level sums, which can then be ranked.

## Brute force
Separate traversals for each depth repeat nodes.
One queue visits every node once.

## Approach
1. Put the root in a queue.
2. Capture the queue size for the current level.
3. Remove exactly that many nodes, sum them, and enqueue children.
4. Sort the collected sums descending.
5. Return the kth value or -1 if fewer than k levels exist.

## Walkthrough
For Example 1, level sums are 5, 17, 13, and 10.
Descending order is 17, 13, 10, 5, so k=2 returns 13.
A one-level tree with k=2 returns -1.

## Complexity
The traversal costs O(n), and sorting h level sums costs O(h log h).
The queue and sum list use O(n) worst-case space.

Sorting counts equal sums separately because each depth contributes one list entry even when two depths have the same numeric total.

The tree values are positive in the contract, but the method would still sum correctly for negative values because it does not use a sentinel for level totals.

## Edge cases
Equal sums still occupy separate rank positions.
Use wide arithmetic for large node values.

The queue size boundary is what separates a level from its children, so the helper can enqueue descendants without changing the current total.

## Common mistakes
Capture level size before consuming nodes.
Do not include child nodes in the current sum.

## Language notes
Python uses `deque`.
Java stores level sums as `long` values.
