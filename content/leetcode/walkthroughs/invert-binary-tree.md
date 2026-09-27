## Intuition

Mirroring a binary tree swaps the left and right subtrees at every node.
Performing that swap once at each node produces the full mirror, regardless of whether nodes are visited depth-first or breadth-first.
An explicit stack supplies an iterative traversal.

## Approach

1. Start `stack` with the root when it exists.
2. Pop a `node` and exchange its left and right child references.
3. Push each nonnull child for the same operation.
4. Continue until all nodes are processed.
5. Return the original root reference, whose descendant links have now been mirrored.

Swapping a node's children changes their positions but does not remove either subtree.
Visiting both children afterward ensures every deeper branching point is mirrored too.
The result reuses all original nodes and values.
This direct transformation already visits each required node once, so no separate brute-force alternative is needed.

## Walkthrough

Example 1 begins as `[5, 2, 9, 1, null, 7, 10]`.

| Node processed | Child relationship after its swap |
| --- | --- |
| 5 | Left becomes 9; right becomes 2 |
| 2 | Left becomes null; right becomes 1 |
| 1 | Both children remain null |
| 9 | Left becomes 10; right becomes 7 |
| 7 and 10 | Their children remain null |

This order follows the stack's last-in, first-out behavior after child insertion.
The final level-order representation is `[5, 9, 2, 10, 7, null, 1]`.

## Complexity

- Time: O(n), with one swap and constant child work per node.
- Space: O(h) pending DFS nodes, bounded by O(n), where h is tree height.

## Edge cases

An empty tree returns null.
A leaf stays a leaf with the same value.
A one-sided chain switches sides at every level.
Duplicate or negative values do not affect the pointer transformation.

## Common mistakes

- Swapping only the root's children leaves deeper subtrees unmirrored.
- Overwriting one child reference before saving it loses that subtree.
- Allocating new nodes is unnecessary when the required operation can mutate the original links.

## Language notes

Python swaps child references with simultaneous assignment.
Java temporarily saves the original left child before writing either final reference.
Both skip null children when pushing to the stack, and Java explicitly returns early for a null root because `ArrayDeque` cannot contain null elements.
