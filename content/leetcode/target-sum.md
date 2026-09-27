# Target Sum

Place either a plus or minus sign before every entry of `nums`, then add the signed entries.
Return how many sign assignments produce `target`.
Assignments to different positions count separately, even when their values are equal or zero.

## Examples

### Example 1

```text
Input: nums = [1, 1, 1], target = 1
Output: 3
Explanation: Choose any one of the three positions to carry a minus sign.
```

### Example 2

```text
Input: nums = [0, 0], target = 0
Output: 4
Explanation: Each zero independently accepts either sign.
```

## Constraints

- 1 <= nums.length <= 20
- 0 <= nums[i] <= 1,000; sum(nums) <= 1,000
- -1,000 <= target <= 1,000
