# Keys and Rooms

Room 0 is initially unlocked, and every other room is locked.
The integers in `rooms[i]` are keys to other rooms.
After entering a room you may collect all its keys.
Return whether all rooms can be visited.

## Constraints

- There are 2 to 1000 rooms.
- Keys are valid room indices and each room's key list has no duplicates.

## Examples

### Example 1

```text
Input: rooms = [[1], [2], []]
Output: true
Explanation: Room 0 unlocks 1, which unlocks 2.
```

### Example 2

```text
Input: rooms = [[], [0]]
Output: false
Explanation: The key in locked room 1 cannot be obtained.
```
