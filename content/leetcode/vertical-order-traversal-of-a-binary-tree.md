# Vertical Order Traversal of a Binary Tree

Place the root at row 0, column 0; left and right children increase the row by one and change the column by -1 and +1.
Return columns from left to right.
Within a column, order nodes by row and then by value when row and column both tie.

## Examples

### Example 1

```text
Input: root = [3, 9, 20, null, null, 15, 7]
Output: [[9], [3, 15], [20], [7]]
Explanation: Nodes 3 and 15 share a column, in increasing row order.
```

### Example 2

```text
Input: root = [1, 2, 3, 4, 6, 5, 7]
Output: [[4], [2], [1, 5, 6], [3], [7]]
Explanation: The tied nodes 5 and 6 are sorted by value.
```

## Constraints

- The tree contains 1 through 1,000 nodes.
- 0 <= Node.val <= 1,000
