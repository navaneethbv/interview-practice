# Find Minimum in Rotated Sorted Array

A strictly increasing array was rotated by moving a prefix to its end, possibly without changing its order.
Return its smallest entry in O(log n) time.

## Examples

### Example 1

```text
Input: nums = [6, 9, 1, 3]
Output: 1
Explanation: The smallest value occurs at the rotation boundary.
```

### Example 2

```text
Input: nums = [2, 5, 8]
Output: 2
Explanation: An unrotated array is allowed.
```

## Constraints

- 1 <= nums.length <= 5,000
- -5,000 <= nums[i] <= 5,000
- All entries are distinct, and nums is a rotation of an increasing array.
