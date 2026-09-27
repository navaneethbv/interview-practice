# Robot Collisions

Robots occupy distinct positions, move at equal speed left or right, and collide when they meet.
The robot with lower health disappears and the survivor loses one health.
If healths are equal, both disappear.
Return surviving healths in the robots' original input order.

## Examples

### Example 1

```text
Input: positions = [1, 3], healths = [5, 3], directions = "RL"
Output: [4]
Explanation: The stronger right-moving robot survives with one less health.
```

### Example 2

```text
Input: positions = [1, 3], healths = [4, 4], directions = "RL"
Output: []
Explanation: Equal-health robots both disappear.
```

## Constraints

- 1 <= positions.length == healths.length == directions.length <= 100000
- 1 <= positions[i], healths[i] <= 1000000000
- Positions are distinct; directions contains L and R.
