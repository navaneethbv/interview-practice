## Intuition

The boundary is a deliberate concatenation of four pieces: root, left edge, leaves, and reversed right edge.
Leaves must be collected separately so a leaf is not repeated as both an edge node and a leaf.
Each edge walk chooses the outward child first and falls back to the other child when necessary.

## Brute force

A generic tree traversal followed by sorting nodes by depth and side would need extra metadata and special tie rules.
It can take O(n log n) time and still risk duplicating leaves.
Separate boundary walks use O(n) time and make the required order explicit.

## Approach

1. Add root, returning immediately when it is the only leaf.
2. Walk root.left downward, adding non-leaf nodes.
3. Traverse the tree to add every leaf from left to right.
4. Walk root.right downward, collect non-leaf nodes, and reverse them.
5. Append the reversed right boundary.

## Walkthrough

Example 1 uses root = [1, null, 2, 3, 4].

| phase | nodes added | boundary so far |
| --- | --- | --- |
| root | 1 | [1] |
| left boundary | none | [1] |
| leaves | 3, 4 | [1,3,4] |
| right boundary bottom up | 2 | [1,3,4,2] |

Node 2 is the right boundary; its left child 3 and right child 4 are leaves.

## Complexity

Let n be the number of tree nodes.
The edge walks and leaf traversal visit each node a constant number of times, so time is O(n).
The explicit stack for leaves uses O(n) space, and the boundary and right lists also use O(n) output-related space.
Both implementations avoid recursive traversal and therefore handle deep valid trees safely.

## Edge cases

A single root returns one value.
A tree with only a right chain uses that chain as the right boundary.
A tree with only a left chain uses its non-leaf nodes followed by the final leaf.
Leaves are included once even when they lie along an edge path.

## Common mistakes

- Adding edge leaves before the leaf pass duplicates them.
- Traversing the right boundary in top-down order breaks counterclockwise order.
- Choosing only left children loses one-sided paths.
- Starting both edge walks at root repeats the root.

## Language notes

Python uses iterative lists for both edge walks and an explicit leaf stack.
Java uses ArrayDeque for leaves and a temporary list before reversing the right edge.
The provided TreeNode values are read without replacing nodes.
