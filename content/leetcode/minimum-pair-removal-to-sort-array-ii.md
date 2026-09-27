# Minimum Pair Removal to Sort Array II

While the array is not nondecreasing, replace the adjacent pair with the smallest sum by that sum.
Break ties by choosing the leftmost pair in the current array.
Return the number of merges required.
This version has a much larger input bound, so repeatedly scanning every pair is too slow.

## Examples

### Example 1

```text
Input: nums = [4, 1, 2]
Output: 2
Explanation: The forced merges produce [4,3] and then [7].
```

### Example 2

```text
Input: nums = [1, 2, 2]
Output: 0
Explanation: No merge is needed.
```

## Constraints

- 1 <= nums.length <= 100000.
- -1000000000 <= nums[i] <= 1000000000.
- Merged values may require 64-bit arithmetic.
