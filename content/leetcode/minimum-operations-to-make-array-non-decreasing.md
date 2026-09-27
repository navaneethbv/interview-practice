# Minimum Operations to Make Array Non Decreasing

An operation chooses a contiguous subarray and adds a positive integer x to every entry in it.
The operation costs x.
Return the minimum total cost needed to make nums nondecreasing.

## Examples

### Example 1

```text
Input: nums = [5, 2, 4, 1]
Output: 6
Explanation: Add 3 to the suffix starting at index 1, then add 3 to the final entry.
```

### Example 2

```text
Input: nums = [1, 2, 2, 5]
Output: 0
Explanation: The array is already nondecreasing.
```

## Constraints

- 1 <= nums.length <= 100000
- 1 <= nums[i] <= 1000000000
