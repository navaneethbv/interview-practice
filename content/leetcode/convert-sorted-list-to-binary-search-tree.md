# Convert Sorted List to Binary Search Tree

Build a height-balanced binary search tree from the values in the sorted linked list `head`.
At every node, the heights of the two subtrees may differ by at most one.
The tree's inorder traversal must reproduce the list values, including duplicates.
Any valid balanced shape is accepted.

## Constraints

- The list contains 0 to 20000 nodes.
- Values range from -100000 to 100000 and are sorted ascending.

## Examples

### Example 1

```text
Input: head = [-2, 0, 3]
Output: [0, -2, 3]
Explanation: The middle value forms a balanced root.
```

### Example 2

```text
Input: head = []
Output: null
Explanation: An empty list gives an empty tree.
```
