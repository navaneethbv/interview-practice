# Increasing Triplet Subsequence

Return whether there are indices i < j < k such that nums[i] < nums[j] < nums[k].
The selected values need not be adjacent.
Use O(n) time and constant additional space.

## Examples

### Example 1

```text
Input: nums = [5, 1, 4, 2, 3]
Output: true
Explanation: The subsequence 1, 2, 3 is strictly increasing.
```

### Example 2

```text
Input: nums = [3, 2, 1]
Output: false
Explanation: Every later value is smaller.
```

## Constraints

- 1 <= nums.length <= 500000.
- Values are signed 32-bit integers.
