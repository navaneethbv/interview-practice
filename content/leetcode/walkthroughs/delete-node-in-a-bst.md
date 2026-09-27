## Intuition

A binary search tree directs the key comparison toward one subtree.
A node with zero or one child can be replaced directly.
A node with two children takes the smallest value from its right subtree, then deletes that duplicate successor.

## Brute force

Rebuilding the tree from all values except the key would take O(n) storage and extra traversal work.
Searching for the node and shifting values without preserving order can violate the BST property.
The iterative search and successor replacement changes only required links and values.

## Approach

1. Walk left or right while comparing the key with the current node.
2. Return the original root when the key is absent.
3. Return the single child when the key matches a node with at most one child.
4. Find the leftmost node in the right subtree for a two-child deletion.
5. Copy its value and unlink the successor from its parent.

## Walkthrough

Example 1 deletes 3 from [5,3,6,2,4,null,7].
Node 3 has children 2 and 4.
The smallest value in its right subtree is 4, so node 3 takes value 4.
Deleting the original successor leaves the tree [5,4,6,2,null,null,7].

## Complexity

For tree height H, search and successor traversal take O(H) time.
The iterative parent tracking uses O(1) auxiliary space.
Only node values and child references are changed.
The returned root is the original tree root unless deletion removes it.

## Edge cases

Deleting a missing key returns the unchanged tree.
Deleting a leaf removes it through its parent's link.
Deleting the root with one child returns that child.
A two-child node uses its inorder successor to preserve ordering.

## Common mistakes

- Choosing an arbitrary right-subtree node can violate the BST ordering.
- Forgetting to reconnect the parent link loses a subtree.
- Copying the predecessor value but deleting the successor creates duplicates.
- Advancing past a null child without checking it dereferences an empty subtree.

## Language notes

Python and Java use the same iterative search and relinking structure.
The successor scan is iterative in both references.
Both rely on the harness-provided TreeNode type.
