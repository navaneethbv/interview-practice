# Minimum Distance to the Target Element

Return the smallest absolute index difference between start and any position containing target.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3, 4, 5], target = 5, start = 3
Output: 1
Explanation: The target is one index to the right.
```

### Example 2

```text
Input: nums = [1, 1, 1], target = 1, start = 2
Output: 0
Explanation: The start position already contains the target.
```

## Constraints

- 1 <= nums.length <= 1,000
- 1 <= nums[i], target <= 10,000
- 0 <= start < nums.length
- target occurs at least once.
