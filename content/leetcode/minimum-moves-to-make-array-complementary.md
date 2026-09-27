# Minimum Moves to Make Array Complementary

The even-length array is complementary when every mirrored pair nums[i] and nums[n-1-i] has the same sum.
A move replaces one entry with any integer from 1 through limit.
Return the fewest moves needed.

## Examples

### Example 1

```text
Input: nums = [1, 2, 4, 3], limit = 4
Output: 1
Explanation: Replace the 4 with 2 so both mirrored pair sums are 4.
```

### Example 2

```text
Input: nums = [1, 1, 2, 2], limit = 2
Output: 0
Explanation: Both mirrored pair sums are 3.
```

## Constraints

- 2 <= nums.length <= 100000; length is even.
- 1 <= nums[i] <= limit <= 100000
