# Non-overlapping Intervals

Remove as few intervals as possible so that the remaining intervals have no overlapping interiors.
Return the number removed.
An interval ending at the exact moment another begins does not overlap it.

## Examples

### Example 1

```text
Input: intervals = [[1, 3], [2, 4], [3, 5]]
Output: 1
Explanation: Remove [2, 4]; the other intervals only touch.
```

### Example 2

```text
Input: intervals = [[0, 2], [0, 2], [0, 2]]
Output: 2
Explanation: At most one of the identical intervals can remain.
```

## Constraints

- 1 <= intervals.length <= 100000.
- Each interval has -50000 <= start < end <= 50000.
