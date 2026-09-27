# First Completely Painted Row or Column

The matrix contains each integer from 1 through its cell count exactly once.
Paint values in the order given by arr, which is a permutation of the same values.
Return the earliest zero-based position in arr after which a whole row or column is painted.

## Examples

### Example 1

```text
Input: arr = [1, 4, 2, 3], mat = [[1, 2], [3, 4]]
Output: 2
Explanation: After painting 2, the first row is complete.
```

### Example 2

```text
Input: arr = [3, 2, 1], mat = [[1, 2, 3]]
Output: 0
Explanation: Painting any cell completes its one-cell column.
```

## Constraints

- 1 <= mat.length * mat[0].length <= 100000
- arr and mat each contain every integer from 1 through the cell count exactly once.
