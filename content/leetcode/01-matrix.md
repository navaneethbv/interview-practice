# 01 Matrix

For each cell in the binary matrix `mat`, return the minimum number of edge-adjacent steps to a cell containing 0.
At least one zero exists.

## Examples

### Example 1

```text
Input: mat = [[0, 1], [1, 1]]
Output: [[0, 1], [1, 2]]
Explanation: Distances increase by one along shortest paths from the top-left zero.
```

### Example 2

```text
Input: mat = [[0, 0, 0]]
Output: [[0, 0, 0]]
Explanation: Every cell is already zero.
```

## Constraints

- 1 <= mat.length, mat[i].length <= 10,000
- The rectangular matrix contains at most 10,000 cells, each 0 or 1.
