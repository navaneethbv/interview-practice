# Largest Divisible Subset

Return a largest subset of the distinct positive integers such that, for every pair in the subset, one divides the other evenly.
Any maximum-size valid subset and any output order are accepted.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3]
Output: [1, 2]
Explanation: Either [1,2] or [1,3] is a largest valid subset.
```

### Example 2

```text
Input: nums = [1, 2, 4, 8]
Output: [1, 2, 4, 8]
Explanation: Every earlier value divides every later value.
```

## Constraints

- 1 <= nums.length <= 1,000
- 1 <= nums[i] <= 2 * 10^9
- All values are distinct.
