# Minimum Subarray Length With Distinct Sum At Least K

For a contiguous subarray, add each distinct value only once.
Return the shortest subarray whose resulting sum is at least k, or -1 if none qualifies.

## Examples

### Example 1

```text
Input: nums = [2, 2, 5, 1], k = 7
Output: 2
Explanation: The adjacent values 2 and 5 have distinct-value sum 7.
```

### Example 2

```text
Input: nums = [3, 3, 3], k = 4
Output: -1
Explanation: Repeating 3 never increases the distinct-value sum above 3.
```

## Constraints

- 1 <= nums.length <= 100000
- 1 <= nums[i] <= 100000
- 1 <= k <= 1000000000
