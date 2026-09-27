# Exam Room

Seats are numbered from 0 to n-1.
`seat()` assigns a vacant seat that maximizes its distance to the nearest occupied seat; choose the smallest index when tied.
If the room is empty, choose seat 0.
`leave(p)` makes the occupied seat p available again.
Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- `1 <= n <= 1000000000`.
- seat is called only when a vacancy exists, and leave only on occupied seats.
- At most 10000 operations occur.

## Examples

### Example 1

```text
Input: ctor = [10], ops = ["seat", "seat", "seat", "seat", "leave", "seat"], args = [[], [], [], [], [4], []]
Output: [0, 9, 4, 2, null, 5]
Explanation: After seat 4 leaves, seat 5 is farthest from occupied seats 0,2,9.
```

### Example 2

```text
Input: ctor = [1], ops = ["seat", "leave", "seat"], args = [[], [0], []]
Output: [0, null, 0]
Explanation: The sole seat can be reused.
```
