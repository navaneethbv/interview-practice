# Minimum Time Visiting All Points

Visit all points in their listed order.
In one second, move one unit horizontally, vertically, or diagonally.
Return the minimum total time; passing through a future point early does not satisfy its required later visit.

## Constraints

- There are 1 to 100 points.
- Coordinates range from -1000 to 1000.

## Examples

### Example 1

```text
Input: points = [[0, 0], [3, 2], [3, 5]]
Output: 6
Explanation: The two legs take 3 and 3 seconds.
```

### Example 2

```text
Input: points = [[2, 2]]
Output: 0
Explanation: The sole point requires no travel.
```
