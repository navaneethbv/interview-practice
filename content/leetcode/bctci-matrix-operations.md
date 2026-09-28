# Matrix Operations

Implement `Matrix`, which stores a square grid of integers and transforms it in place with O(1) extra space.

- `transpose()` turns row `i` into column `i`.
- `rotate_clockwise()` and `rotate_anticlockwise()` rotate the grid by 90 degrees.
- `reflect_horizontally()` swaps the first and last rows, the second and second-to-last rows, and so on.
- `reflect_vertically()` does the same for columns.
- `get_grid()` returns the current grid.

Java method names are camelCase, such as `rotateClockwise` and `getGrid`.
Construct one instance per test and run the operations in order; transformations produce null.

## Examples

### Example 1

```text
Input: ctor = [[[1, 2], [3, 4]]], ops = ["rotate_clockwise", "get_grid"], args = [[], []]
Output: [null, [[3, 1], [4, 2]]]
```

### Example 2

```text
Input: ctor = [[[1, 2], [3, 4]]], ops = ["reflect_horizontally", "get_grid"], args = [[], []]
Output: [null, [[3, 4], [1, 2]]]
```

## Constraints

- `1 <= n <= 1,000`
- `-10^4 <= grid[i][j] <= 10^4`
