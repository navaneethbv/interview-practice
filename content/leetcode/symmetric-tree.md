# Symmetric Tree

Return whether the tree is a mirror image of itself across its center.
Both values and structure must match after reflecting left and right.

## Examples

### Example 1

```text
Input: root = [1, 2, 2, 3, 4, 4, 3]
Output: true
Explanation: Matching values occupy mirrored positions.
```

### Example 2

```text
Input: root = [1, 2, 2, null, 3, null, 3]
Output: false
Explanation: The two 3 nodes do not occupy mirrored positions.
```

## Constraints

- The tree contains 1 through 1,000 nodes.
- -100 <= Node.val <= 100
