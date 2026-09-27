# Balance a Binary Search Tree

Return a height-balanced binary search tree containing exactly the values of the input BST.
At every node, the heights of its left and right subtrees must differ by at most one.
Any valid balanced arrangement is accepted.

## Examples

### Example 1

```text
Input: root = [1, null, 2, null, 3, null, 4]
Output: [3, 2, 4, 1]
Explanation: The returned tree preserves all four values and is balanced.
```

### Example 2

```text
Input: root = [2, 1, 3]
Output: [2, 1, 3]
Explanation: The original tree is already balanced.
```

## Constraints

- 1 <= number of nodes <= 10000
- Node values are distinct integers from 1 through 100000.
- The input is a binary search tree.
