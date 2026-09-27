# Subarrays With K Different Integers

Count contiguous nonempty subarrays containing exactly k distinct integer values.
Different index ranges count separately even when their value sequences match.

## Examples

### Example 1

```text
Input: nums = [1, 2, 1, 2, 3], k = 2
Output: 7
Explanation: There are seven index ranges containing exactly two distinct values.
```

### Example 2

```text
Input: nums = [1, 1, 1], k = 1
Output: 6
Explanation: Every nonempty subarray qualifies.
```

## Constraints

- 1 <= nums.length <= 20000.
- 1 <= nums[i], k <= nums.length.
