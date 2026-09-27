# Maximum Good Subarray Sum

A contiguous subarray is good when the absolute difference between its first and last values is exactly k.
Return the largest sum of a good subarray, or 0 if none exists.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3, 4], k = 3
Output: 10
Explanation: The whole array has endpoint difference 3.
```

### Example 2

```text
Input: nums = [-3, -2, -1], k = 1
Output: -3
Explanation: The best good subarray is [-2,-1].
```

## Constraints

- 2 <= nums.length <= 100000
- -1000000000 <= nums[i] <= 1000000000
- 1 <= k <= 1000000000
