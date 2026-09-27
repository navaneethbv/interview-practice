## Intuition

All nodes at one distance from the root belong to the same level.
Breadth-first traversal processes those levels in order.
Counting how many nonempty levels are encountered gives the number of nodes on a deepest root-to-leaf path.

## Approach

1. Return zero when `root` is null.
2. Initialize `queue` with the root and `depth = 0`.
3. While the current level is nonempty, increment `depth`.
4. Build the next level from every current node's nonnull left and right children.
5. Replace the current level and repeat, then return `depth`.

Before each iteration, `queue` contains exactly one level.
Every child lies one edge farther from the root, so replacing the level advances the depth by exactly one.
No explicit path storage is required, and the method avoids a recursive call chain on a deeply skewed tree.
A separate brute-force section is unnecessary because every node must be examined in the worst case.

## Walkthrough

Example 1 represents `[8, 3, 10, null, 6]`.
The node 6 is the right child of node 3.

| Current level | New `depth` | Next level |
| --- | --- | --- |
| `[8]` | 1 | `[3, 10]` |
| `[3, 10]` | 2 | `[6]` |
| `[6]` | 3 | Empty |

The longest path is 8, 3, 6, containing three nodes.
Return 3 rather than the two edges on that path.

## Complexity

- Time: O(n), because each node contributes its children once.
- Space: O(w), where w is the maximum level width, for the current and next level lists.

## Edge cases

An empty tree has depth zero.
A singleton has depth one.
A chain of n nodes has depth n but only one node per level, so the level storage stays small.
Node values, including duplicates or negatives, do not affect depth.

## Common mistakes

- Counting edges instead of nodes returns one too few for nonempty trees.
- Incrementing the depth for every node confuses node count with level count.
- Mixing newly discovered children into the current level without a boundary loses level separation.

## Language notes

Python creates the next level with a comprehension.
Java uses the `nextLevel` helper and `ArrayList` to collect children.
Both are iterative and can handle the allowed long chains without depending on language recursion limits.
