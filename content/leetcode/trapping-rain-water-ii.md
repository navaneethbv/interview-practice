# Trapping Rain Water II

Each cell in `heightMap` is a unit-square column of terrain.
Rainwater can escape across the outer boundary.
Return the total volume trapped after water settles, accounting for barriers in all four edge-adjacent directions.

## Examples

### Example 1

```text
Input: heightMap = [[3, 3, 3], [3, 1, 3], [3, 3, 3]]
Output: 2
Explanation: The center cell holds water up to height 3.
```

### Example 2

```text
Input: heightMap = [[1, 4], [4, 1]]
Output: 0
Explanation: Every cell lies on the boundary.
```

## Constraints

- 1 <= heightMap.length, heightMap[i].length <= 200
- The map is rectangular; 0 <= heightMap[i][j] <= 20,000.
