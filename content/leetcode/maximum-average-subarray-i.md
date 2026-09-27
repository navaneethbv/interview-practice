# Maximum Average Subarray I

Return the largest average among all contiguous segments containing exactly `k` entries.

## Examples

### Example 1

```text
Input: nums = [1, 12, -5, -6, 50, 3], k = 4
Output: 12.75
Explanation: The segment [12,-5,-6,50] has average 12.75.
```

### Example 2

```text
Input: nums = [5], k = 1
Output: 5.0
Explanation: The only segment is the whole array.
```

## Constraints

- 1 <= k <= nums.length <= 100,000
- -10,000 <= nums[i] <= 10,000
