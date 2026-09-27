# Missing Ranges

Find the maximal inclusive ranges of integers between `lower` and `upper` that do not appear in sorted `nums`.
Return each range as `[start, end]`, ordered by start.
A missing single number is represented by equal endpoints.

## Constraints

- `0 <= nums.length <= 100`.
- `-1000000000 <= lower <= upper <= 1000000000`.
- Numbers are distinct, sorted, and within the inclusive bounds.

## Examples

### Example 1

```text
Input: nums = [2, 4, 7], lower = 1, upper = 8
Output: [[1, 1], [3, 3], [5, 6], [8, 8]]
Explanation: All gaps, including the two boundaries, are included.
```

### Example 2

```text
Input: nums = [], lower = 5, upper = 7
Output: [[5, 7]]
Explanation: The whole interval is missing.
```
