# 4Sum

Return every distinct quadruplet of values from four different input positions whose sum equals target.
Duplicate value quadruplets must appear once.
The order of quadruplets and of their values does not matter.

## Examples

### Example 1

```text
Input: nums = [1, 0, -1, 0, 2, -2], target = 0
Output: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
Explanation: These are the three distinct value combinations.
```

### Example 2

```text
Input: nums = [2, 2, 2, 2, 2], target = 8
Output: [[2, 2, 2, 2]]
Explanation: Different index choices produce the same quadruplet.
```

## Constraints

- 1 <= nums.length <= 200.
- -1000000000 <= nums[i], target <= 1000000000.
