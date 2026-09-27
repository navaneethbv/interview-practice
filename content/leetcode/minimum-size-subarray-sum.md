# Minimum Size Subarray Sum

Return the shortest length of a contiguous segment whose sum is at least `target`.
All entries are positive.
Return 0 if no segment reaches the target.

## Examples

### Example 1

```text
Input: target = 7, nums = [2, 3, 1, 2, 4, 3]
Output: 2
Explanation: The segment [4,3] reaches 7 with two entries.
```

### Example 2

```text
Input: target = 20, nums = [1, 2, 3]
Output: 0
Explanation: Even the whole array is too small.
```

## Constraints

- 1 <= target <= 10^9
- 1 <= nums.length <= 100,000
- 1 <= nums[i] <= 10,000
