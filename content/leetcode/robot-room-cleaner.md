# Clean Every Reachable Room Cell

Control a robot in an unknown rectangular room using only its movement interface.
`move()` advances one cell in its current direction and returns true, or stays still and returns false when blocked.
`turnLeft()` and `turnRight()` rotate it by 90 degrees, and `clean()` cleans its current cell.
Clean every open cell reachable from the starting position.
The robot initially faces upward.
Your method receives a `Robot`, not the grid or its coordinates.
Test fixtures describe open cells as 1, blocked cells as 0, and the starting `[row,column]`.
The judge displays the cleaned coordinates in sorted order.

## Examples

```text
Input: robot = {"room":[[1,1,0],[0,1,1]],"start":[0,0]}
Output: [[0,0],[0,1],[1,1],[1,2]]
Explanation: All four open cells are connected to the starting cell.
```

```text
Input: robot = {"room":[[1,0,1]],"start":[0,0]}
Output: [[0,0]]
Explanation: The rightmost open cell is unreachable behind a wall.
```

## Constraints

- The room contains at most 1000 cells.
- The starting cell is open.
- Grid boundaries block movement.
- Use only move, turnLeft, turnRight, and clean to control or inspect the robot.
- The local judge permits at most 100,000 robot operations per case.
