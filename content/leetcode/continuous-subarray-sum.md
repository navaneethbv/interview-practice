# Continuous Subarray Sum

Return whether a contiguous segment of at least two entries has a sum divisible by `k`.
A sum of zero qualifies because it is zero times k.

## Examples

### Example 1

```text
Input: nums = [23, 2, 4, 6, 7], k = 6
Output: true
Explanation: The adjacent entries 2 and 4 sum to 6.
```

### Example 2

```text
Input: nums = [23, 2, 6, 4, 7], k = 13
Output: false
Explanation: No segment of length at least two has a divisible sum.
```

## Constraints

- 1 <= nums.length <= 100,000
- 0 <= nums[i] <= 10^9; the total sum fits a signed 32-bit integer.
- 1 <= k <= 2^31 - 1
