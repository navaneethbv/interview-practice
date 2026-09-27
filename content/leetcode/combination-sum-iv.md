# Combination Sum IV

Count the ordered sequences of values from `nums` whose sum is `target`.
You may reuse each value any number of times.
Different orders count as different sequences, and all values are positive.

## Examples

### Example 1

```text
Input: nums = [1, 3], target = 4
Output: 3
Explanation: The sequences are [1,1,1,1], [1,3], and [3,1].
```

### Example 2

```text
Input: nums = [2, 4], target = 3
Output: 0
Explanation: Every available value is even.
```

## Constraints

- 1 <= nums.length <= 200
- 1 <= nums[i] <= 1,000
- All nums entries are distinct.
- 1 <= target <= 1,000
- The answer fits a signed 32-bit integer.
