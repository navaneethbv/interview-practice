# Two Sum IV: Input Is a BST

Determine whether two different nodes in the binary search tree have values adding to k.
A single node cannot be used twice.

## Examples

### Example 1

```text
Input: root = [5, 3, 6, 2, 4, null, 7], k = 9
Output: true
Explanation: Nodes with values 2 and 7 sum to 9.
```

### Example 2

```text
Input: root = [5], k = 10
Output: false
Explanation: The single node cannot pair with itself.
```

## Constraints

- The tree contains 1 to 10000 nodes.
- -10000 <= node.val <= 10000.
- -100000 <= k <= 100000.
