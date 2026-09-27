# Maximum Subarray Sum With Length Divisible by K

Return the largest sum of a nonempty contiguous subarray whose length is divisible by k.
Negative values are allowed, so the answer may be negative.

## Examples

### Example 1

```text
Input: nums = [1, 2, -5, 4, 3], k = 2
Output: 7
Explanation: The final two values sum to 7.
```

### Example 2

```text
Input: nums = [-3, -2, -5], k = 2
Output: -5
Explanation: The best allowed window is [-3,-2].
```

## Constraints

- 1 <= k <= nums.length <= 200000.
- -1000000000 <= nums[i] <= 1000000000.
