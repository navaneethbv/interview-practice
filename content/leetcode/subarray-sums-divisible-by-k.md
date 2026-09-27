# Subarray Sums Divisible by K

Count contiguous nonempty subarrays whose sums are divisible by k.
A sum of zero is divisible by k, and array values may be negative.

## Examples

### Example 1

```text
Input: nums = [4, 5, 0, -2, -3, 1], k = 5
Output: 7
Explanation: Seven index ranges have sums that are multiples of 5.
```

### Example 2

```text
Input: nums = [1, 2, 3], k = 3
Output: 3
Explanation: The ranges [1,2], [3], and the full array qualify.
```

## Constraints

- 1 <= nums.length <= 30000.
- -10000 <= nums[i] <= 10000.
- 2 <= k <= 10000.
