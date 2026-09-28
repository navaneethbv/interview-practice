# Pond Sizes

`land[r][c]` is the height above sea level of a plot of land, and a value of `0` means water.
A pond is a region of water cells connected vertically, horizontally, or diagonally.
Return the sizes of all ponds in increasing order.

## Examples

### Example 1

```text
Input: land = [[0, 2, 1, 0], [0, 1, 0, 1], [1, 1, 0, 1], [0, 1, 0, 1]]
Output: [1, 2, 4]
```

### Example 2

```text
Input: land = [[5]]
Output: []
```

## Constraints

- `1 <= rows, cols <= 300`
- `0 <= land[r][c] <= 10,000`
