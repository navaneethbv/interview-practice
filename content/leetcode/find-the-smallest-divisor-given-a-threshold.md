# Find the Smallest Divisor Given a Threshold

Choose a positive integer divisor, divide every value by it, and round each quotient upward before summing.
Return the smallest divisor whose rounded sum is at most threshold.

## Examples

### Example 1

```text
Input: nums = [1, 2, 5, 9], threshold = 6
Output: 5
Explanation: Divisor 5 gives rounded values 1,1,1,2; divisor 4 gives a sum of 7.
```

### Example 2

```text
Input: nums = [2, 4], threshold = 6
Output: 1
Explanation: Dividing by 1 already meets the threshold.
```

## Constraints

- 1 <= nums.length <= 50000.
- 1 <= nums[i] <= 1000000.
- nums.length <= threshold <= 1000000.
