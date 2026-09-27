# 3Sum Closest

Choose three different indices in `nums` whose values have a sum closest to `target`.
Return that sum.
The closest sum is guaranteed to be unique.

## Examples

### Example 1

```text
Input: nums = [-1, 2, 1, -4], target = 1
Output: 2
Explanation: The values -1, 2, and 1 sum to 2, one away from the target.
```

### Example 2

```text
Input: nums = [0, 0, 0], target = 1
Output: 0
Explanation: There is only one possible sum.
```

## Constraints

- 3 <= nums.length <= 500
- -1,000 <= nums[i] <= 1,000
- -10,000 <= target <= 10,000
