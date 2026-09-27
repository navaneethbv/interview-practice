# Rotating the Box

The box contains stones #, obstacles *, and empty cells .
Rotate it 90 degrees clockwise, then let each stone fall downward until blocked by an obstacle, another stone, or the bottom.
Return the final grid.

## Examples

### Example 1

```text
Input: boxGrid = [["#", ".", "#"]]
Output: [["."], ["#"], ["#"]]
Explanation: The two stones settle at the bottom of the rotated column.
```

### Example 2

```text
Input: boxGrid = [["#", "*", "."]]
Output: [["#"], ["*"], ["."]]
Explanation: The obstacle prevents the stone from falling farther.
```

## Constraints

- 1 <= boxGrid.length, boxGrid[0].length <= 500
- Each cell is #, *, or .
