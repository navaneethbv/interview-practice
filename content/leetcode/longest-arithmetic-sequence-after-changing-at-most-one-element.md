# Longest Arithmetic Sequence After Changing At Most One Element

You may replace at most one array entry with any integer.
Return the longest contiguous subarray that can then have a constant difference between consecutive entries.

## Examples

### Example 1

```text
Input: nums = [2, 4, 99, 8, 10]
Output: 5
Explanation: Replace 99 with 6 to get constant difference 2.
```

### Example 2

```text
Input: nums = [1, 2, 6, 7]
Output: 3
Explanation: Changing the first value to -2 makes the first three values arithmetic.
```

## Constraints

- 4 <= nums.length <= 100000
- 1 <= nums[i] <= 100000
