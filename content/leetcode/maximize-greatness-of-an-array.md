# Maximize Greatness of an Array

You may permute `nums` into a new array `perm`.
The greatness of `perm` is the number of indices `i` where `perm[i] > nums[i]`.
Return the maximum greatness you can achieve.

## Constraints

- 1 <= nums.length <= 10^5
- 0 <= nums[i] <= 10^9

## Examples

### Example 1

```text
Input: nums = [1, 3, 5, 2, 1, 3, 1]
Output: 4
Explanation: Four positions can be beaten, for example with perm = [2, 5, 1, 3, 3, 1, 1].
```

### Example 2

```text
Input: nums = [1, 2, 3, 4]
Output: 3
Explanation: Shifting gives perm = [2, 3, 4, 1].
```
