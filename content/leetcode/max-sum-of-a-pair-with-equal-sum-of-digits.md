# Max Sum of a Pair With Equal Sum of Digits

Choose two different indices `i` and `j` such that `nums[i]` and `nums[j]` have the same sum of decimal digits.
Return the maximum value of `nums[i] + nums[j]`, or -1 if no such pair exists.

## Constraints

- 1 <= nums.length <= 10^5
- 1 <= nums[i] <= 10^9

## Examples

### Example 1

```text
Input: nums = [18, 43, 36, 13, 7]
Output: 54
Explanation: 18 and 36 both have digit sum 9; 43 and 7 both have 7. The best is 18 + 36 = 54.
```

### Example 2

```text
Input: nums = [10, 12, 19, 14]
Output: -1
Explanation: No two numbers share a digit sum.
```
