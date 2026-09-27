# Maximum Frequency After Subarray Operation

Choose one nonempty contiguous subarray and one integer x, then add x to every value in that subarray.
Return the greatest possible number of occurrences of k afterward.
Choosing x = 0 is allowed.

## Examples

### Example 1

```text
Input: nums = [1, 2, 2, 1], k = 1
Output: 4
Explanation: Add -1 to the middle pair of 2s.
```

### Example 2

```text
Input: nums = [1, 2, 1, 2], k = 1
Output: 3
Explanation: Converting one 2 adds an occurrence without losing an existing 1.
```

## Constraints

- 1 <= nums.length <= 100000.
- 1 <= nums[i], k <= 50.
