# Cherry Pickup

Move from the top-left to the bottom-right of a square grid using only right or down, then return using only left or up.
Cells contain 0 for empty, 1 for a cherry, or -1 for an impassable thorn.
Each cherry can be collected once across the entire trip.
Return the largest total, or zero when no complete trip exists.

## Constraints

- The square size ranges from 1 to 50.
- The start and destination contain 0 or 1.

## Examples

### Example 1

```text
Input: grid = [[1, 1], [1, 1]]
Output: 4
Explanation: The outward and return paths can collectively visit all four cells.
```

### Example 2

```text
Input: grid = [[0, -1], [-1, 1]]
Output: 0
Explanation: The destination cannot be reached.
```
