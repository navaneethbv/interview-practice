# Sliding Window Median

Return the median of each contiguous window of k values, moving from left to right.
For odd k, use the middle value in sorted order; for even k, average the two middle values.

## Examples

### Example 1

```text
Input: nums = [1, 4, 2, 3], k = 3
Output: [2.0, 3.0]
Explanation: The sorted windows are [1, 2, 4] and [2, 3, 4].
```

### Example 2

```text
Input: nums = [1, 2, 3], k = 2
Output: [1.5, 2.5]
Explanation: Each window has two central values to average.
```

## Constraints

- 1 <= k <= nums.length <= 100000.
- Values are signed 32-bit integers.
- Output values are compared with floating-point tolerance.
