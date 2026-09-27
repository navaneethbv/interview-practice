# Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit

Find the longest contiguous subarray in which the absolute difference between any two values is at most limit.
Return its length.

## Examples

### Example 1

```text
Input: nums = [8, 2, 4, 7], limit = 4
Output: 2
Explanation: The windows [2,4] and [4,7] have length 2 and fit the limit.
```

### Example 2

```text
Input: nums = [4, 4, 4], limit = 0
Output: 3
Explanation: Equal values have difference zero.
```

## Constraints

- 1 <= nums.length <= 100000.
- 1 <= nums[i] <= 1000000000.
- 0 <= limit <= 1000000000.
