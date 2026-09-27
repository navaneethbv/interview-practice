# Find Mode in Binary Search Tree

Return every most-frequent value in the binary search tree, in any order.
Equal values may appear in either subtree while respecting nondecreasing inorder order.

## Examples

### Example 1

```text
Input: root = [1, null, 2, 2]
Output: [2]
Explanation: Value 2 occurs twice.
```

### Example 2

```text
Input: root = [1, 1, 2]
Output: [1]
Explanation: Value 1 occurs most often.
```

## Constraints

- The tree contains 1 through 10,000 nodes.
- -100,000 <= Node.val <= 100,000
- Every left-subtree value is at most its root value and every right-subtree value is at least it.
