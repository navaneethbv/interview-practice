# Walking Robot Simulation

A robot starts at `(0,0)` facing north.
Commands -2 and -1 turn left and right by 90 degrees; positive commands move that many unit steps forward.
If the next cell is an obstacle, stop that movement command.
Return the maximum squared Euclidean distance from the origin reached at any point.

## Constraints

- There are 1 to 10000 commands; forward lengths range from 1 to 9.
- There are 0 to 10000 obstacle positions, with coordinates from -30000 to 30000.

## Examples

### Example 1

```text
Input: commands = [3, -1, 4], obstacles = []
Output: 25
Explanation: The robot reaches 4,3, whose squared distance is 25.
```

### Example 2

```text
Input: commands = [4], obstacles = [[0, 2]]
Output: 1
Explanation: The obstacle stops it at 0,1.
```
