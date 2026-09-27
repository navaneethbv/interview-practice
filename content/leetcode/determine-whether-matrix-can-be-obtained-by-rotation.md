# Determine Whether Matrix Can Be Obtained By Rotation

Determine whether rotating square matrix mat clockwise by 0, 90, 180, or 270 degrees can make it equal target.

## Examples

### Example 1

```text
Input: mat = [[1, 0], [1, 1]], target = [[1, 1], [1, 0]]
Output: true
Explanation: One clockwise quarter-turn matches target.
```

### Example 2

```text
Input: mat = [[1]], target = [[0]]
Output: false
Explanation: Rotation cannot change a single cell.
```

## Constraints

- 1 <= mat.length == target.length <= 10
- Both matrices are square and contain only 0 and 1.
