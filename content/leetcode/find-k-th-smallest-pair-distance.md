# Find K-th Smallest Pair Distance

For every index pair i < j, form the absolute difference between its values.
Return the kth smallest pair distance, counting equal distances separately.

## Examples

### Example 1

```text
Input: nums = [1, 3, 1], k = 1
Output: 0
Explanation: The two 1 occurrences form a zero-distance pair.
```

### Example 2

```text
Input: nums = [1, 6, 1], k = 3
Output: 5
Explanation: The distances are 0, 5, and 5.
```

## Constraints

- 2 <= nums.length <= 10,000
- 0 <= nums[i] <= 10^6
- 1 <= k <= nums.length * (nums.length - 1) / 2
