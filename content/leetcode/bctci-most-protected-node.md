# Most Protected Node

The protection level of a node is the minimum of four numbers: its number of ancestors, the length in edges of its longest downward chain, the number of nodes to its left on the same level, and the number of nodes to its right on the same level.
Return the highest protection level of any node in the non-empty tree.

## Examples

### Example 1

```text
Input: root = [1, 2, 3, 4, 5, 6, 7]
Output: 0
```

### Example 2

```text
Input: root = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
Output: 1
```

## Constraints

- `1 <= number of nodes <= 10^5` and the height is at most 500.
