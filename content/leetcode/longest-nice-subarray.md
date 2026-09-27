# Longest Nice Subarray

Find the longest contiguous subarray in which the bitwise AND of every pair of different entries is zero.
A one-element subarray always satisfies the rule.

## Examples

### Example 1

```text
Input: nums = [1, 3, 8, 48, 10]
Output: 3
Explanation: The values 3,8,48 use disjoint bit positions.
```

### Example 2

```text
Input: nums = [3, 1, 5, 11, 13]
Output: 1
Explanation: Every adjacent pair overlaps in at least one set bit.
```

## Constraints

- 1 <= nums.length <= 100000.
- 1 <= nums[i] <= 1000000000.
