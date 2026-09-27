# Shortest Distance from All Buildings

Choose an empty cell in `grid` that minimizes the sum of shortest walking distances to every building.
Values 0, 1, and 2 denote empty land, a building, and an obstacle.
Walking uses four orthogonal directions and may pass only through empty land; it ends upon reaching the destination building.
Return the minimum sum, or -1 if no empty cell can reach all buildings.

## Constraints

- Grid dimensions range from 1 to 50.
- There is at least one building.

## Examples

### Example 1

```text
Input: grid = [[1, 0, 1]]
Output: 2
Explanation: The middle cell is one step from each building.
```

### Example 2

```text
Input: grid = [[1, 2, 0]]
Output: -1
Explanation: The obstacle prevents the empty cell from reaching the building.
```
