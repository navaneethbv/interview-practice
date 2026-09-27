# Sum of Absolute Differences in a Sorted Array

For each index, compute the sum of absolute differences between that entry and every entry in the nondecreasing array.
Return these sums in index order.

## Examples

### Example 1

```text
Input: nums = [1, 4, 6]
Output: [8, 5, 7]
Explanation: For the first entry, the distances are 0, 3, and 5.
```

### Example 2

```text
Input: nums = [2, 2]
Output: [0, 0]
Explanation: Equal values contribute zero distance.
```

## Constraints

- 2 <= nums.length <= 100000
- 1 <= nums[i] <= 10000
- nums is sorted in nondecreasing order.
