# Missing Number

An array of length `n` contains distinct numbers selected from 0 through `n`.
Return the one number from that range that is absent.
Try to use linear time and constant extra space.

## Examples

### Example 1

```text
Input: nums = [4, 0, 2, 1]
Output: 3
Explanation: The range is 0 through 4; only 3 is absent.
```

### Example 2

```text
Input: nums = [1]
Output: 0
Explanation: The array contains 1 but not 0.
```

## Constraints

- 1 <= nums.length <= 10,000
- 0 <= nums[i] <= nums.length
- All entries are distinct.
