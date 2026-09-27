# Maximum Walls Destroyed by Robots

Each robot fires one bullet either left or right, up to its distance limit.
A bullet destroys every wall along its path but stops upon meeting another robot.
Walls at a robot's own position can always be destroyed.
Choose directions to maximize the number of distinct walls destroyed.

## Examples

### Example 1

```text
Input: robots = [5], distance = [3], walls = [2, 4, 6, 7]
Output: 2
Explanation: Either direction destroys two walls.
```

### Example 2

```text
Input: robots = [1, 2], distance = [100, 1], walls = [10]
Output: 0
Explanation: The robot at 2 blocks the longer shot from the robot at 1.
```

## Constraints

- 1 <= robots.length == distance.length, walls.length <= 100000
- 1 <= robots[i], walls[j] <= 1000000000
- 1 <= distance[i] <= 100000
- Robot positions are distinct, and wall positions are distinct.
