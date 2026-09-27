## Intuition

An inorder traversal of a binary search tree visits values in sorted order.
The traversal already identifies the predecessor and successor of each node, so the existing links can be rewired as the list is visited.
The first visited node becomes the head and the last visited node is connected back to it for circularity.

## Brute force

A simple approach could copy every value into a sorted array and allocate a separate linked list.
That takes O(n) extra storage and violates the requirement to reuse the original nodes.
An iterative inorder traversal stores node references temporarily and rewires those same nodes.

## Approach

1. Push the root and its left descendants onto a stack.
2. Pop the next inorder node and connect it after the previously visited node.
3. Remember the first visited node as the eventual head.
4. Continue through right subtrees using the same stack.
5. Connect the final node to the first node in both directions.
6. Return the first node.

## Walkthrough

Example 1 uses root = [4,2,5,1,3].
The table follows Java, which establishes links during its inorder traversal.
Python first collects `ordered_nodes = [1,2,3,4,5]`, then assigns each node its circular predecessor and successor.

| visited node | previous node | links established |
| ---: | --- | --- |
| 1 | none | first = 1 |
| 2 | 1 | 1.right = 2, 2.left = 1 |
| 3 | 2 | 2.right = 3, 3.left = 2 |
| 4 | 3 | 3.right = 4, 4.left = 3 |
| 5 | 4 | 4.right = 5, 5.left = 4 |
| finish | 5 and 1 | 5.right = 1, 1.left = 5 |

Following right links from 1 displays [1,2,3,4,5].

## Complexity

Let n be the number of tree nodes.
Each node is pushed and popped once, so traversal and rewiring take O(n) time.
The explicit stack stores O(h) nodes for tree height h, and the Python reference additionally stores the inorder node list in O(n) space.
The Java reference links nodes online and uses O(h) auxiliary stack space.

## Edge cases

An empty root returns null.
A one-node tree links its left and right pointers back to itself.
A skewed tree is handled iteratively without recursion depth risk.
Distinct values and valid BST ordering guarantee the inorder order is sorted.

## Common mistakes

- Allocating replacement nodes breaks the identity check.
- Forgetting either circular link leaves the list open in one direction.
- Processing preorder instead of inorder loses sorted order.
- Linking a node before preserving its original right child can lose the remaining tree.

## Language notes

Python first records ordered node references, then applies the circular links with modular indexes.
Java preserves the tree's right child before linking the current node and therefore uses no list copy.
Both use the provided DoublyNode or Node fields directly.
