# Maximal Rectangle

Find the largest axis-aligned rectangle containing only cells marked `'1'` in a binary character matrix.
Return its area in cells.

## Examples

### Example 1

```text
Input: matrix = [["1", "1", "0"], ["1", "1", "1"]]
Output: 4
Explanation: The first two columns form a 2 by 2 rectangle.
```

### Example 2

```text
Input: matrix = [["0", "0", "0"]]
Output: 0
Explanation: There are no cells marked 1.
```

## Constraints

- 1 <= rows, columns <= 200.
- Each cell is the character 0 or 1.
