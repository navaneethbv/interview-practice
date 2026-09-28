# Max Black Square

A square matrix contains `1` for black pixels and `0` for white pixels.
Find the largest square subsquare whose four borders are entirely black; its interior may be any color.
Return the side length of that square, or `0` if the matrix has no black pixel.

## Examples

### Example 1

```text
Input: matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
Output: 3
```

### Example 2

```text
Input: matrix = [[0, 1], [1, 1]]
Output: 1
```

## Constraints

- `1 <= n <= 150`
- `matrix[i][j]` is `0` or `1`.
