# Majority Element II

Return every value occurring more than floor(n/3) times in an array of length n.
The result may be in any order.
Try to use linear time and constant extra space.

## Examples

### Example 1

```text
Input: nums = [3, 2, 3]
Output: [3]
Explanation: The threshold is one occurrence, and only 3 exceeds it.
```

### Example 2

```text
Input: nums = [1, 2]
Output: [1, 2]
Explanation: Both values exceed floor(2/3), which is zero.
```

## Constraints

- 1 <= nums.length <= 50,000
- -10^9 <= nums[i] <= 10^9
