# Count Number of Nice Subarrays

Count contiguous nonempty subarrays containing exactly k odd numbers.

## Examples

### Example 1

```text
Input: nums = [1, 1, 2, 1, 1], k = 3
Output: 2
Explanation: The qualifying ranges begin at indices 0 and 1.
```

### Example 2

```text
Input: nums = [2, 4, 6], k = 1
Output: 0
Explanation: The array has no odd values.
```

## Constraints

- 1 <= nums.length <= 50000.
- 1 <= nums[i] <= 100000.
- 1 <= k <= nums.length.
