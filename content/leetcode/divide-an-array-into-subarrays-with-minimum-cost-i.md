# Divide an Array Into Subarrays With Minimum Cost I

Divide nums into exactly three nonempty contiguous subarrays.
The cost of each subarray is its first value.
Return the smallest sum of the three costs.

## Examples

### Example 1

```text
Input: nums = [8, 3, 5, 1, 4]
Output: 12
Explanation: Use [8], [3,5], and [1,4], costing 8+3+1.
```

### Example 2

```text
Input: nums = [2, 7, 4]
Output: 13
Explanation: Three entries force three one-entry subarrays.
```

## Constraints

- 3 <= nums.length <= 50
- 1 <= nums[i] <= 50
