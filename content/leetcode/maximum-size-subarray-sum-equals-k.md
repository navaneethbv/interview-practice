# Maximum Size Subarray Sum Equals k

Return the greatest length of a contiguous subarray whose sum equals k.
Return zero if no nonempty subarray has that sum.
Negative and zero values are allowed, so a growing window need not have a growing sum.

## Examples

```text
Input: nums = [1,-1,5,-2,3], k = 3
Output: 4
Explanation: The first four values sum to 3.
```

```text
Input: nums = [-2,-1,2,1], k = 1
Output: 2
Explanation: The middle pair -1,2 sums to 1.
```

## Constraints

- 1 <= nums.length <= 200,000
- Each value is between -10,000 and 10,000.
- k is a signed 32-bit integer.
