# Maximum Subarray Min-Product

The min-product of a nonempty contiguous subarray is its minimum value multiplied by its sum.
Return the greatest min-product modulo 1,000,000,007, choosing the maximum before taking the modulus.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3, 2]
Output: 14
Explanation: The segment [2,3,2] has minimum 2 and sum 7.
```

### Example 2

```text
Input: nums = [2, 3, 3, 1, 2]
Output: 18
Explanation: The two 3 entries give 3 times 6.
```

## Constraints

- 1 <= nums.length <= 100,000
- 1 <= nums[i] <= 10^7
- The maximum min-product fits a signed 64-bit integer.
