# Multiplayer Video Game

Players occupy distinct integer coordinates in `players` and cannot move.
A living player may shoot another living player on the same row or column only when no original player position lies strictly between them.
Eliminated players continue to block shots, and shots occur one at a time.
Choose the order of shots to minimize the number of survivors, continuing until no shot is possible.
Return that minimum number.

## Constraints

- 0 <= players.length <= 100,000.
- Coordinates are between -1,000,000,000 and 1,000,000,000.


## Examples

### Example 1

```text
Input: [[[0, 0], [0, 2], [0, 4], [3, 4]]]
Output: 1
```

### Example 2

```text
Input: [[[0, 0], [1, 1]]]
Output: 2
```
