## Intuition

Three protection quantities depend on a node's position in the whole tree, while its downward chain length depends on its subtree.
Compute subtree heights first, then use level order traversal to evaluate all four quantities together.

## Brute force

Individually finding ancestors, descendants, and level neighbors for every node repeats tree traversals.
A postorder pass and one breadth first pass share those calculations, with each node handled a constant number of times.

## Approach

The helper `height` stores edge height in `heights`, returning -1 for missing children so leaves have height zero.
For each `level`, a node at `position` has `depth` ancestors, `position` left neighbors, and `len(level) - 1 - position` right neighbors.
Maximize their minimum with its height.

## Walkthrough

Example 1 has three levels in a complete seven node tree.
The root has no ancestors or lateral neighbors.
At depth one, each node lacks a neighbor on one side.
Every depth two node is a leaf with downward height zero.
All protection levels are therefore zero.

## Complexity

Both passes take O(n) time.
The height map stores n entries, the level lists use O(w) for maximum width w, and recursion uses O(h) for height h.
Overall auxiliary space is O(n).

## Edge cases

A single root has protection zero.
A chain has no same level neighbors, so every node also has protection zero.
Only actual nodes count left and right; gaps in the serialized tree do not count as protective neighbors.

## Common mistakes

Measure downward height in edges, not nodes.
Preserve left to right order when creating the next level.
The protection level uses the minimum of four quantities, and the final answer uses the maximum across nodes.

## Language notes

Python keys `heights` by node objects and builds each level with a child comprehension.
Java uses a `Map<TreeNode, Integer>` and explicit next level lists.
Repeated numeric values do not merge nodes because the map tracks node identity.
