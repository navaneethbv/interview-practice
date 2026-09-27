# Number of Islands

Count the islands in a rectangular grid containing `'1'` for land and `'0'` for water.
Land belongs to the same island when it is connected through horizontal or vertical steps.
The region outside the grid is water.

## Examples

### Example 1

```text
Input: grid = [["1", "1", "0"], ["0", "1", "0"], ["0", "0", "1"]]
Output: 2
Explanation: The upper three land cells form one island; the bottom-right cell forms another.
```

### Example 2

```text
Input: grid = [["0", "0"], ["0", "0"]]
Output: 0
Explanation: There is no land.
```

## Constraints

- 1 <= grid rows, grid columns <= 300.
- Every cell is the character 0 or 1.
