# Pacific Atlantic Water Flow

A rectangular island has a height at each cell.
The Pacific touches its top and left edges, and the Atlantic touches its bottom and right edges.
Water may move to a horizontally or vertically adjacent cell whose height is no greater than its current height.
Return all `[row, column]` positions from which water can reach both oceans, in any order.

## Examples

### Example 1

```text
Input: heights = [[1, 2], [4, 3]]
Output: [[0, 1], [1, 0], [1, 1]]
Explanation: These three cells can drain to both boundary systems.
```

### Example 2

```text
Input: heights = [[7]]
Output: [[0, 0]]
Explanation: The only cell touches both oceans.
```

## Constraints

- 1 <= number of rows, number of columns <= 200.
- 0 <= heights[row][column] <= 100000.
