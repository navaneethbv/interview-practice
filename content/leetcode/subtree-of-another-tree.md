# Subtree of Another Tree

Determine whether some node in `root` begins a subtree identical to `subRoot`.
That subtree includes all descendants of the chosen node, so matching only part of a branch is insufficient.

## Constraints

- `root` contains 1 to 2000 nodes.
- `subRoot` contains 1 to 1000 nodes.
- Node values range from -10000 to 10000.

## Examples

### Example 1

```text
Input: root = [7, 3, 9, 1, 5], subRoot = [3, 1, 5]
Output: true
Explanation: The subtree rooted at 3 matches completely.
```

### Example 2

```text
Input: root = [7, 3, 9, 1, 5], subRoot = [3, 1]
Output: false
Explanation: The node 5 is an extra descendant in root.
```
