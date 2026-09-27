# Maximum Product Subarray

Find the largest product of a nonempty contiguous segment of `nums`.
Negative values and zero can change which segment is best.

## Examples

### Example 1

```text
Input: nums = [-2, 3, -4]
Output: 24
Explanation: Multiplying all three entries gives 24.
```

### Example 2

```text
Input: nums = [0, -3, 2]
Output: 2
Explanation: The final entry alone has the largest product.
```

## Constraints

- 1 <= nums.length <= 20,000
- -10 <= nums[i] <= 10
- The product of any contiguous segment fits a signed 32-bit integer.
