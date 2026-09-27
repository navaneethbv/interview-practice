# Next Permutation

Rearrange `nums` in place into the next lexicographically greater ordering of its values.
If it is already the greatest ordering, rearrange it into ascending order.
Use constant extra space.
The displayed output is the modified array.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3]
Output: [1, 3, 2]
Explanation: This is the next ordering after 1,2,3.
```

### Example 2

```text
Input: nums = [3, 2, 1]
Output: [1, 2, 3]
Explanation: The largest ordering wraps around.
```

## Constraints

- 1 <= nums.length <= 100
- 0 <= nums[i] <= 100
