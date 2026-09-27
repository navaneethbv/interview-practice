# Two Best Non-Overlapping Events

Each event is `[start, end, value]`, and both time endpoints are inclusive.
Choose at most two events with no overlap and maximize the sum of their values.
An event beginning when another ends still overlaps it.

## Examples

### Example 1

```text
Input: events = [[1, 3, 2], [4, 5, 3], [2, 4, 4]]
Output: 5
Explanation: The first and second events do not overlap and total 5.
```

### Example 2

```text
Input: events = [[1, 2, 5], [2, 3, 6]]
Output: 6
Explanation: The shared endpoint prevents taking both.
```

## Constraints

- 2 <= events.length <= 100000.
- 1 <= start <= end <= 1000000000.
- 1 <= value <= 1000000.
