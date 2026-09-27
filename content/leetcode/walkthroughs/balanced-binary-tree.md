## Intuition

A node is balanced only when both of its subtrees are balanced and their heights differ by at most one.
Compute children before their parent, then reuse their heights instead of measuring the same subtree repeatedly.
An explicit postorder stack avoids recursion limits on a long chain.

## Brute force

At every node, traverse both subtrees to measure their heights, then repeat for the children.
This can take O(n²) time on a chain because the same descendants are visited many times.

## Approach

1. Use iterative postorder traversal with `pending` frames containing a node and a `ready` flag.
2. Initialize `height` so a missing child has height zero.
3. On the first visit, schedule a ready frame for the parent and unfinished frames for its children.
4. On the ready visit, read `left_height` and `right_height` from the map.
5. Return false if their difference exceeds one; otherwise store one plus the larger height.
6. Return true when all nodes have passed this local check.

A ready frame is processed only after both child frames finish, so every height lookup is available.
Checking every node is essential; a balanced root alone does not prove that its descendants are balanced.

## Walkthrough

Example 1 is `[3, 9, 20, null, null, 15, 7]`.
The stack pushes left before right, so the right subtree finishes first.

| Finished node | Child heights | Stored height | Balanced? |
| --- | --- | --- | --- |
| 7 | 0, 0 | 1 | Yes |
| 15 | 0, 0 | 1 | Yes |
| 20 | 1, 1 | 2 | Yes |
| 9 | 0, 0 | 1 | Yes |
| 3 | 1, 2 | 3 | Yes |

No difference exceeds one, so the answer is true.

## Complexity

- Time: O(n), because each node has two stack visits and constant expected map work.
- Space: O(n), because `height` retains an entry for every processed node; the stack also uses at most O(n) space.

## Edge cases

The empty tree skips its null frame and returns true.
A leaf has two zero-height children and is balanced.
Repeated node values do not collide because heights are keyed by nodes, not values.

## Common mistakes

- Comparing only the root's children misses imbalance deeper in the tree.
- Reading a child's height before processing it breaks postorder evaluation.
- Claiming O(h) space ignores the retained height map.

## Language notes

Python stores `(node, ready)` tuples; Java uses a `Frame` record and an `ArrayDeque`.
Java's `IdentityHashMap` explicitly distinguishes nodes by identity.
Null nodes are wrapped inside frames, so the deque never receives a null element.
