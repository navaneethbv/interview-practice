## Intuition

Protection combines four independent directions: ancestors above, descendants below, and neighbors on either side of the same level.
A postorder traversal supplies downward heights, while a breadth-first traversal supplies depth and horizontal position.
Combining these two views avoids repeatedly scanning a node's descendants or level.

## Brute force

For each node, independently measure its deepest descendant and count its peers.
Repeated subtree traversals can take O(n squared) time on long chains.

## Approach

First compute `heights[node]` recursively as one plus the maximum child height.
A missing child has height -1, so a leaf has height zero in edges.
Next process each level as an ordered list from left to right.
For the node at `position`, the four quantities are `depth`, its stored height, `position`, and `len(level) - 1 - position`.
Their minimum is that node's protection.
Track the greatest such minimum and build the next level by appending left children before right children.
Actual nodes count as neighbors; absent positions in a complete-tree layout do not.

## Walkthrough

Example 1 is the complete tree with values 1 through 7.
The root has no ancestors, so its protection is zero.
At level one, each of the two nodes is at an outer edge and has zero neighbors on one side.
At level two, every node is a leaf and has downward height zero.
Every candidate therefore has protection zero, which is returned.

## Complexity

Both traversals together take O(n) time.
The height map requires O(n) storage, breadth-first lists use O(w), and recursive height calculation uses O(h) stack frames.
The overall space bound is O(n).

## Edge cases

A single node and any simple chain have protection zero.
A node needs both side neighbors and a descendant to achieve positive protection.

## Common mistakes

Use height in edges, not nodes.
Preserve left-to-right level order when counting side neighbors.

## Language notes

Both maps use node objects as keys, distinguishing nodes even when values repeat.
Python's helper is nested; Java stores the map in the solution instance.
