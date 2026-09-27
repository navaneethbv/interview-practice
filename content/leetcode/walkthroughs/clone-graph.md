## Intuition

A node can be reached through several paths, and cycles can lead back to nodes already being copied.
Maintain a `copies` map from each original node object to its one newly allocated counterpart.
Creating the counterpart before exploring its neighbors breaks the cycle of recursive dependencies.

## Brute force

Copying every node encountered along every path without remembering earlier copies duplicates shared nodes and never terminates on cycles.
A visited-to-copy map is necessary to preserve the graph's structure rather than merely its visible values.

## Approach

1. Use BFS and return null immediately for a null starting node.
2. Allocate the starting copy, store it in `copies`, and enqueue the original node.
3. For each dequeued `original`, inspect every `neighbor`.
4. If that neighbor has no copy yet, allocate one, record it, and enqueue the neighbor.
5. Append the neighbor's copy to the current copy's neighbors, whether it was newly created or already known.
6. Return `copies[node]`, preserving the identity of the requested starting position.

Each original gets one copy, but every adjacency entry still gets reproduced.
Discovery and edge creation serve different purposes and must not be combined into one conditional.

## Walkthrough

Example 1 is a triangle with adjacency rows `[[2, 3], [1, 3], [1, 2]]`.

| Original processed | Newly allocated copies | Edges appended to its copy |
| --- | --- | --- |
| Initialization | 1 | None yet |
| 1 | 2, 3 | `1 -> 2`, `1 -> 3` |
| 2 | None | `2 -> 1`, `2 -> 3` |
| 3 | None | `3 -> 1`, `3 -> 2` |

The visible adjacency list is unchanged, but every endpoint now belongs to the copied graph.
Returning the original node would display similar values but fail the deep-copy requirement.

## Complexity

- Time: O(V + E), processing each reachable node and adjacency entry once.
- Space: O(V + E) including the copied graph, with O(V) auxiliary map and traversal storage.

## Edge cases

An empty graph returns null.
An isolated node produces a new node with an empty neighbor list.
Cycles and shared neighbors reuse existing copies instead of allocating duplicates.

## Common mistakes

- Returning the original node is a shallow copy.
- Recording copies only after traversing neighbors fails on cycles.
- Appending only newly discovered neighbors drops back edges.

## Language notes

Python uses original node objects as dictionary keys and appends discovered nodes to a list while iterating it.
Java makes identity-based lookup explicit with `IdentityHashMap` and uses an `ArrayDeque` queue.
Both use the harness-provided `Node` type and must not redeclare it.
