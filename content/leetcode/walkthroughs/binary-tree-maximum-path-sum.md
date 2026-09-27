## Intuition

A path passing through a node can join a useful left branch, the node itself, and a useful right branch.
But a path extended upward to the parent can use only one child branch, or it would fork.
Maintain these two quantities separately: a global completed-path answer and a one-branch `gain` for each node.

## Brute force

Enumerate every possible pair of path endpoints and compute the connecting path sum.
There are quadratically many endpoint pairs, and repeated path searches add more work.
Postorder dynamic programming reuses each child's best upward contribution.

## Approach

1. Use an explicit postorder stack of `(node, expanded)` states.
2. On the first visit, schedule the node for processing after its children.
3. On the expanded visit, read each child gain and clamp negative gains to zero.
4. Update `best` with `node.val + left + right`.
5. Store `gain[node] = node.val + max(left, right)` for the parent.
6. Return `best` after all nodes are processed.

Initialize `best` below all possible answers so all-negative trees still choose a real node.
Discarding a negative child contribution means stopping the path at the current node on that side.

## Walkthrough

Example 1 is `[2, -1, 4]`.

| Node processed after children | Useful child gains | Stored `gain` | `best` |
| --- | --- | --- | --- |
| -1 | 0, 0 | -1 | -1 |
| 4 | 0, 0 | 4 | 4 |
| 2 | 0, 4 | 6 | 6 |

The negative left branch is discarded.
The path from 2 to 4 gives the answer 6.

## Complexity

- Time: O(n), because every node is scheduled and processed a constant number of times.
- Space: O(n), for the gain map and explicit traversal stack.

## Edge cases

An all-negative tree returns its largest single value.
The optimal path may lie entirely below the root.
A skewed tree is handled without recursive calls.
The statement guarantees at least one node.

## Common mistakes

- Returning a two-child path gain to the parent creates a fork rather than a path.
- Initializing `best` to zero permits an invalid empty answer on all-negative inputs.
- Using child gains before postorder completion loses needed information.

## Language notes

Python uses tuple frames and a dictionary keyed by nodes.
Java uses a private `Frame` record and `IdentityHashMap` for node-specific gains.
The maximum absolute path sum under the stated bounds is at most 30,000,000, safely inside Java `int`.
