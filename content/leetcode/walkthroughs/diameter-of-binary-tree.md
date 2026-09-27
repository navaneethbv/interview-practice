## Intuition

Any path has a highest node where its two downward portions meet.
If that node's child subtree heights are known, the longest path through it has `left_height + right_height` edges.
Evaluate this candidate at every node, not only at the root.

## Brute force

At each node, separately traverse both subtrees to compute their heights.
Repeated work can take O(n²) time on a long chain.
Postorder traversal computes each subtree height once and reuses it.

## Approach

1. Use iterative postorder traversal with `pending` frames and a `ready` flag.
2. Set the height of a missing node to zero and initialize `best = 0`.
3. On a first visit, schedule the parent's ready frame behind both children.
4. On a ready visit, retrieve both child heights.
5. Update `best` with their sum, the longest path through this node.
6. Store the node's height as one plus the larger child height.
7. Return the largest candidate found.

Heights count nodes on a downward path, while the diameter counts edges.
A child subtree of height two contributes two edges when connected to the current node, which is why the sum needs no extra one.
A path contained entirely below the current node has already been considered there.

## Walkthrough

Example 1 is `[1, 2, 3, 4, 5]`.
Right children are completed first by this stack ordering.

| Finished node | Child heights | Height stored | `best` |
| --- | --- | --- | --- |
| 3 | 0, 0 | 1 | 0 |
| 5 | 0, 0 | 1 | 0 |
| 4 | 0, 0 | 1 | 0 |
| 2 | 1, 1 | 2 | 2 |
| 1 | 2, 1 | 3 | 3 |

The path 4, 2, 1, 3 has three edges, matching the returned 3.

## Complexity

- Time: O(n) expected, because every node receives constant stack and height-map work.
- Space: O(n), because the height map stores all processed nodes in addition to traversal frames.

## Edge cases

A single node has diameter zero.
A chain of n nodes has diameter n - 1.
Repeated values are harmless because heights belong to node identities.
The explicit stack also handles a deep tree without recursive calls.

## Common mistakes

- Adding one to the candidate counts nodes instead of edges.
- Returning only the root's candidate misses a longer path inside a subtree.
- Storing both child heights as the current height confuses a branching path with a downward path.

## Language notes

Python uses tuple frames and a dictionary.
Java uses a `Frame` record and `IdentityHashMap`, with a stored null height of zero.
Its deque holds non-null frames even when the node inside a frame is null.
