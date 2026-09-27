# Lowest Common Ancestor of a Binary Tree

Return the deepest node in the binary tree that is an ancestor of both nodes p and q.
A node counts as its own ancestor.
In testcases, p and q are identified by their unique values; the function receives the actual nodes from the input tree.
The displayed output is the ancestor value.

## Examples

### Example 1

```text
Input: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 1
Output: 3
Explanation: The two target nodes are in different subtrees of 3.
```

### Example 2

```text
Input: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 4
Output: 5
Explanation: Node 5 is an ancestor of node 4 and of itself.
```

## Constraints

- The tree contains 2 through 100,000 nodes with distinct integer values.
- p and q are different nodes in the tree.
