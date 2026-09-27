# Meeting Rooms II

Assign all meetings to rooms so that meetings in the same room never overlap.
Return the smallest number of rooms needed.
A room becomes available at a meeting's end time, so another meeting can start there at that same time.

## Examples

### Example 1

```text
Input: intervals = [[0, 5], [2, 7], [5, 8]]
Output: 2
Explanation: Reuse the first room at time 5; a second room holds [2, 7].
```

### Example 2

```text
Input: intervals = [[1, 2], [2, 3], [3, 4]]
Output: 1
Explanation: All meetings can use the same room.
```

## Constraints

- 1 <= intervals.length <= 10000.
- 0 <= start < end <= 1000000 for every meeting.
