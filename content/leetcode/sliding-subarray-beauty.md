# Sliding Subarray Beauty

For each contiguous window of length k, find its x-th smallest value.
Its beauty is that value if it is negative, and 0 otherwise.
Return the window beauties from left to right.

## Examples

### Example 1

```text
Input: nums = [-3, 1, -2, 4], k = 3, x = 2
Output: [-2, 0]
Explanation: The second smallest values are -2 and 1.
```

### Example 2

```text
Input: nums = [1, 2, 3], k = 2, x = 1
Output: [0, 0]
Explanation: Both windows contain only positive values.
```

## Constraints

- 1 <= nums.length <= 100000
- 1 <= x <= k <= nums.length
- -50 <= nums[i] <= 50
