# Walls and Gates

Update the rectangular `rooms` grid in place.
A wall is -1, a gate is 0, and an empty room is 2147483647.
Replace each reachable empty room with its shortest distance to any gate, taking edge-adjacent steps through rooms.
Leave unreachable rooms and walls unchanged.
The displayed output is the updated grid.

## Examples

### Example 1

```text
Input: rooms = [[2147483647, 0], [2147483647, -1]]
Output: [[1, 0], [2, -1]]
Explanation: The two rooms are one and two steps from the gate.
```

### Example 2

```text
Input: rooms = [[2147483647, -1, 0]]
Output: [[2147483647, -1, 0]]
Explanation: The wall blocks the only room from the gate.
```

## Constraints

- 1 <= rooms.length, rooms[i].length <= 250
- Initial cell values are -1, 0, or 2147483647.
