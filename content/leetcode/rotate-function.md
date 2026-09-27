# Rotate Function

For a length-n array A, define F(A) as the sum of i*A[i] over all indices.
Return the maximum F value among all n cyclic rotations of nums.

## Examples

### Example 1

```text
Input: nums = [4, 3, 2, 6]
Output: 26
Explanation: The rotation [3,2,6,4] gives 0+2+12+12 = 26.
```

### Example 2

```text
Input: nums = [-2]
Output: 0
Explanation: The single position has weight zero.
```

## Constraints

- 1 <= nums.length <= 100000
- -100 <= nums[i] <= 100
- The answer fits a signed 32-bit integer.
