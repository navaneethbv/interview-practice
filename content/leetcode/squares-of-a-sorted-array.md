# Squares of a Sorted Array

Return the squares of the sorted input values, arranged in nondecreasing order.
Aim for O(n) time.

## Examples

### Example 1

```text
Input: nums = [-4, -1, 0, 3, 10]
Output: [0, 1, 9, 16, 100]
Explanation: Squaring changes the relative order of negative and positive entries.
```

### Example 2

```text
Input: nums = [-3, -2, -1]
Output: [1, 4, 9]
Explanation: Reverse the magnitude order of an all-negative array.
```

## Constraints

- 1 <= nums.length <= 10,000
- -10,000 <= nums[i] <= 10,000
- nums is sorted in nondecreasing order.
