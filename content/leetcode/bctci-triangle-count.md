# Triangle Count

A triangle is three distinct nodes `a`, `b`, and `c` where `b` and `c` have the same depth, `b` is reached from `a` by following only left children, and `c` is reached from `a` by following only right children.
Return the number of triangles in the tree.

## Examples

### Example 1

```text
Input: root = [0, 1, 2, null, 3, 4, 5, 6, 7, 8, null, null, 9]
Output: 4
```

### Example 2

```text
Input: root = [0, 1, 4, 2, 3, null, 5]
Output: 3
```

## Constraints

- `0 <= number of nodes <= 10^5` and the height is at most 500.
