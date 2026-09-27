# Furthest Building You Can Reach

Move from building 0 toward the right.
A move to an equal or lower building is free; a rise of d requires d bricks or one ladder.
Return the largest reachable building index when resources are spent optimally.

## Examples

### Example 1

```text
Input: heights = [4, 2, 7, 6, 9, 14, 12], bricks = 5, ladders = 1
Output: 4
Explanation: Use the ladder for the rise of 5 and three bricks for the rise to 9.
```

### Example 2

```text
Input: heights = [5, 4, 3], bricks = 0, ladders = 0
Output: 2
Explanation: Every move is downward.
```

## Constraints

- 1 <= heights.length <= 100000.
- 1 <= heights[i] <= 1000000.
- 0 <= bricks <= 1000000000.
- 0 <= ladders <= heights.length.
