# Minimum Falling Path Sum

Choose one entry in each row of a square matrix.
After choosing column c, the next row may use column c-1, c, or c+1 when in bounds.
Return the minimum sum over all such top-to-bottom paths.

## Constraints

- Matrix size ranges from 1 to 100.
- Entries range from -100 to 100.

## Examples

### Example 1

```text
Input: matrix = [[2, 1], [3, 4]]
Output: 4
Explanation: Choose 1 followed by 3.
```

### Example 2

```text
Input: matrix = [[-5]]
Output: -5
Explanation: The only cell forms the path.
```
