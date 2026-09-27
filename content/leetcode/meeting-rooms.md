# Meeting Rooms

Each interval describes the start and end time of a meeting.
Determine whether one person can attend all meetings in full.
A meeting may begin exactly when another ends.

## Examples

### Example 1

```text
Input: intervals = [[1, 4], [4, 6], [8, 9]]
Output: true
Explanation: Each meeting finishes before or when the next starts.
```

### Example 2

```text
Input: intervals = [[1, 5], [3, 4]]
Output: false
Explanation: The second meeting occurs during the first.
```

## Constraints

- 0 <= intervals.length <= 10000.
- 0 <= start < end <= 1000000 for every meeting.
