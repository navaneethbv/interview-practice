# Minimum Interval to Include Each Query

Each interval [left, right] includes both endpoints and has size right - left + 1.
For every query value, return the smallest size of an interval containing it, or -1 when none contains it.
Return answers in the original query order.

## Examples

### Example 1

```text
Input: intervals = [[1, 4], [2, 3], [6, 6]], queries = [2, 4, 5, 6]
Output: [2, 4, -1, 1]
Explanation: Use [2,3], [1,4], no interval, and [6,6], respectively.
```

### Example 2

```text
Input: intervals = [[3, 5]], queries = [5, 3, 6]
Output: [3, 3, -1]
Explanation: Both endpoints belong to the interval.
```

## Constraints

- 1 <= intervals.length, queries.length <= 100,000
- 1 <= left <= right <= 10^7
- 1 <= queries[i] <= 10^7
