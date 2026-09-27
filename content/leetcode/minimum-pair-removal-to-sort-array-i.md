# Minimum Pair Removal to Sort Array I

While the array is not nondecreasing, merge the adjacent pair with the smallest sum into one entry equal to that sum.
If several pairs tie, merge the leftmost one.
Return the number of merges performed before the array becomes nondecreasing.

## Examples

### Example 1

```text
Input: nums = [4, 1, 2]
Output: 2
Explanation: Merge 1+2 to obtain [4,3], then merge again to obtain [7].
```

### Example 2

```text
Input: nums = [1, 2, 2]
Output: 0
Explanation: The array already has nondecreasing order.
```

## Constraints

- 1 <= nums.length <= 50.
- -1000 <= nums[i] <= 1000.
