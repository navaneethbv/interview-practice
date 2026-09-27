# Minimum Distance Between Three Equal Elements I

Choose three distinct indices whose values are equal.
Their distance is the sum of the three pairwise absolute index differences.
Return the smallest possible distance, or -1 if no such triple exists.

## Examples

### Example 1

```text
Input: nums = [2, 2, 1, 2]
Output: 6
Explanation: Indices 0, 1, and 3 have pairwise distances 1, 2, and 3.
```

### Example 2

```text
Input: nums = [1, 2, 1]
Output: -1
Explanation: No value occurs three times.
```

## Constraints

- 1 <= nums.length <= 100
- 1 <= nums[i] <= nums.length
