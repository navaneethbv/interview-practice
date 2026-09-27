# Brick Wall

Each row of the wall lists positive brick widths, and every row has the same total width.
Draw a vertical line through the wall interior.
A line passing exactly between bricks does not cross either brick.
Return the minimum number of bricks crossed; the outer edges are not allowed.

## Examples

### Example 1

```text
Input: wall = [[1, 2, 2, 1], [3, 1, 2], [1, 3, 2], [2, 4], [3, 1, 2], [1, 3, 1, 1]]
Output: 2
Explanation: The best interior position falls on four row boundaries.
```

### Example 2

```text
Input: wall = [[1], [1], [1]]
Output: 3
Explanation: No row has an interior boundary.
```

## Constraints

- 1 <= wall.length <= 10,000
- Each row has at least one brick; total bricks are at most 20,000.
- Brick widths are positive signed 32-bit integers.
- All rows have equal total width.
