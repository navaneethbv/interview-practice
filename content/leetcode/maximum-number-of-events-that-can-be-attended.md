# Maximum Number of Events That Can Be Attended

Event i can be attended on any one integer day from its start through its end, inclusive.
You can attend at most one event per day and each event at most once.
Return the largest number of events you can attend.

## Examples

### Example 1

```text
Input: events = [[1, 2], [2, 3], [3, 4]]
Output: 3
Explanation: Attend on days 1,2,3.
```

### Example 2

```text
Input: events = [[1, 1], [1, 1], [1, 2]]
Output: 2
Explanation: Only two available days can hold these three events.
```

## Constraints

- 1 <= events.length <= 100000.
- 1 <= start <= end <= 100000.
