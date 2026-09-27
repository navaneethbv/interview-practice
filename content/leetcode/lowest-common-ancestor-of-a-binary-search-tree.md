# Lowest Common Ancestor of a Binary Search Tree

Return the lowest node that is an ancestor of both `p` and `q` in a binary search tree.
A node counts as its own ancestor.
The method receives the actual node objects from `root`; testcase inputs identify `p` and `q` by their unique values.
The output displays the returned node's value.

## Constraints

- The tree has 2 to 100000 nodes with distinct values.
- Values range from -1000000000 to 1000000000.
- `p` and `q` are distinct nodes present in the tree.

## Examples

### Example 1

```text
Input: root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 2, q = 8
Output: 6
Explanation: The two nodes lie on opposite sides of 6.
```

### Example 2

```text
Input: root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 2, q = 4
Output: 2
Explanation: Node 2 is an ancestor of itself and of 4.
```
