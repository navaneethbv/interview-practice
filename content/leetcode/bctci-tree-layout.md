# Tree Layout

Lay out a non-empty binary tree on a grid: the root goes at `(0, 0)`, a left child goes one row below its parent, and a right child goes one column to its parent's right.
Several nodes may land on the same coordinate.
Return the largest number of nodes that share one coordinate.

## Examples

### Example 1

```text
Input: root = [1, 2, 3, 4, 5, 6, null, null, 7, null, null, 8, 9]
Output: 2
```

### Example 2

```text
Input: root = [1]
Output: 1
```

## Constraints

- `1 <= number of nodes <= 10^5` and the height is at most 500.
