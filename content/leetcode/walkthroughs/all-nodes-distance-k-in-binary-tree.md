## Intuition

The input tree gives child links but distance can travel upward too.
Record every node's parent, then run breadth-first search from `target` across left, right, and parent neighbors.
The first queue level at distance `k` contains exactly the requested values.

## Brute force

Finding a root-to-target path and separately searching every branch for distance k can revisit ancestors and subtrees.
Converting the tree to an undirected graph explicitly also needs extra adjacency lists, while parent links add only one pointer per node.

## Approach

1. Traverse the tree once to fill `parents`.
2. Start `pending` with `target` and mark it in `seen`.
3. For each distance below `k`, expand the current queue level to unseen child or parent neighbors.
4. When the loop reaches distance `k`, collect every remaining node value and return it.

## Walkthrough

Example 1 starts at target 5 with `k = 2`.

| distance | pending nodes | expansion |
| ---: | --- | --- |
| 0 | `[5]` | neighbors 6, 2, and parent 3 |
| 1 | `[6,2,3]` | 2 adds 7 and 4; 3 adds 1; seen prevents returning to 5 |
| 2 | `[7,4,1]` | collect values |

The returned values are `[7,4,1]` in the local traversal order.

## Complexity

- Time: O(n), because parent construction and breadth-first expansion visit each node at most once.
- Space: O(n), for parent links, the queue, and the visited set.

## Edge cases

When `k` is zero, the target itself is returned.
If k exceeds the tree height, the queue empties and the result is empty.
The target's parent is available from the first traversal even when it is the root.
Seen tracking prevents an undirected edge from sending the search backward.

## Common mistakes

- Searching only downward misses nodes reached through the target's ancestors.
- Omitting `seen` creates parent-child cycles.
- Collecting nodes as soon as they are discovered mixes distances below k.

## Language notes

Python stores `(node, distance)` pairs in a deque and appends values when the distance matches.
Java expands complete queue levels and then reads the remaining nodes after k rounds.
Both references use actual node identity for parent and visited maps, while output uses node values.
