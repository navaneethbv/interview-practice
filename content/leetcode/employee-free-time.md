# Employee Free Time

Each employee has a sorted list of nonoverlapping working intervals.
Return the finite intervals of positive length during which every employee is free, in ascending order.
Ignore free time extending to negative or positive infinity.
Intervals are represented as [start,end] in testcases; the function receives Interval objects.

## Examples

### Example 1

```text
Input: schedule = [[[1, 2], [5, 6]], [[1, 3]], [[4, 10]]]
Output: [[3, 4]]
Explanation: All employees are free between the busy blocks ending at 3 and starting at 4.
```

### Example 2

```text
Input: schedule = [[[1, 2]], [[2, 3]]]
Output: []
Explanation: Touching working intervals leave no positive-length gap.
```

## Constraints

- 1 <= schedule.length <= 50
- Each employee has 1 through 50 intervals.
- 0 <= start < end <= 10^8
- Each employee schedule is sorted and nonoverlapping.
