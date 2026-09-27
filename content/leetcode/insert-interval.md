# Insert Interval

The closed intervals in `intervals` are sorted by start time and do not overlap.
Insert `newInterval`, combining every overlapping interval, and return a sorted collection of nonoverlapping closed intervals.
Touching endpoints count as an overlap.

## Examples

### Example 1

```text
Input: intervals = [[1, 2], [5, 7]], newInterval = [2, 6]
Output: [[1, 7]]
Explanation: The new interval touches the first interval and overlaps the second.
```

### Example 2

```text
Input: intervals = [], newInterval = [3, 4]
Output: [[3, 4]]
Explanation: The new interval is the only interval.
```

## Constraints

- 0 <= intervals.length <= 10000.
- Every interval has two integers with 0 <= start <= end <= 100000.
- newInterval contains exactly one valid interval.
