# Binary Subarrays With Sum

Count contiguous nonempty subarrays whose sum equals goal.
The input values are all binary.

## Examples

### Example 1

```text
Input: nums = [1, 0, 1, 0, 1], goal = 2
Output: 4
Explanation: There are four windows containing exactly two ones.
```

### Example 2

```text
Input: nums = [0, 0, 0], goal = 0
Output: 6
Explanation: Every nonempty window sums to zero.
```

## Constraints

- 1 <= nums.length <= 30000.
- nums[i] is 0 or 1.
- 0 <= goal <= nums.length.
