# Meeting Rooms III

Rooms are numbered 0 through n-1.
Process meetings by their unique original start times, assigning the lowest-numbered free room.
If all rooms are busy, delay the meeting until the earliest room becomes free, preserving its duration; ties use the smaller room number.
Return the room hosting the most meetings, breaking count ties by smaller room number.
Meeting intervals exclude their end time.

## Examples

### Example 1

```text
Input: n = 2, meetings = [[0, 10], [1, 5], [2, 7], [3, 4]]
Output: 0
Explanation: Both rooms host two meetings, so choose room 0.
```

### Example 2

```text
Input: n = 3, meetings = [[1, 20], [2, 10], [3, 5], [4, 9], [6, 8]]
Output: 1
Explanation: Room 1 ultimately hosts the most meetings.
```

## Constraints

- 1 <= n <= 100
- 1 <= meetings.length <= 100,000
- 0 <= start < end <= 500,000
- Original start times are distinct.
