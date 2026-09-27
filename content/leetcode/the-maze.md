# The Maze

A ball moves through cells marked 0 and cannot enter walls marked 1.
When sent in one of four directions, it rolls until the next step would hit a wall or leave the grid.
It can choose a new direction only after stopping.
Return whether it can stop at `destination` starting from `start`.
Passing through the destination without stopping does not count.

## Constraints

- Grid dimensions range from 1 to 100.
- Start and destination are distinct valid empty cells.

## Examples

### Example 1

```text
Input: maze = [[0, 0, 0]], start = [0, 0], destination = [0, 2]
Output: true
Explanation: The ball stops at the right boundary.
```

### Example 2

```text
Input: maze = [[0, 0, 0]], start = [0, 0], destination = [0, 1]
Output: false
Explanation: The ball passes through the middle cell without stopping.
```
