# Sign of the Product of an Array

Return 1 if the product of every input value is positive, -1 if it is negative, and 0 if it is zero.
Determine the sign without overflowing a fixed-width integer.

## Examples

### Example 1

```text
Input: nums = [-2, -3, 4]
Output: 1
Explanation: Two negative factors produce a positive product.
```

### Example 2

```text
Input: nums = [1, 0, -2]
Output: 0
Explanation: A zero factor makes the product zero.
```

## Constraints

- 1 <= nums.length <= 1000.
- -100 <= nums[i] <= 100.
