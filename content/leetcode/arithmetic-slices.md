# Arithmetic Slices

Count contiguous subarrays of length at least three whose consecutive differences are all equal.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3, 4]
Output: 3
Explanation: The two length-3 windows and the full array qualify.
```

### Example 2

```text
Input: nums = [1, 3, 6]
Output: 0
Explanation: The differences 2 and 3 do not match.
```

## Constraints

- 1 <= nums.length <= 5000.
- -1000 <= nums[i] <= 1000.
