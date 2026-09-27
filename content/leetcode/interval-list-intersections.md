# Interval List Intersections

Each list contains sorted, pairwise disjoint closed intervals.
Return all nonempty intersections between intervals from the two lists, sorted by start.
Touching endpoints form a one-point intersection.

## Examples

### Example 1

```text
Input: firstList = [[1, 3], [5, 7]], secondList = [[2, 6]]
Output: [[2, 3], [5, 6]]
Explanation: The second interval overlaps both intervals from the first list.
```

### Example 2

```text
Input: firstList = [[1, 2]], secondList = [[2, 3]]
Output: [[2, 2]]
Explanation: Both lists include endpoint 2.
```

## Constraints

- 0 <= firstList.length, secondList.length <= 1,000
- Each interval [start,end] satisfies 0 <= start <= end <= 10^9.
- Within each list, every interval ends strictly before the next starts.
