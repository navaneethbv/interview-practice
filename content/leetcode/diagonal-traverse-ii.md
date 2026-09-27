# Diagonal Traverse II

Return entries grouped by increasing row-plus-column index.
Within each diagonal, visit entries from the greatest row index to the smallest.
Rows may have different lengths.

## Examples

### Example 1

```text
Input: nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Output: [1, 4, 2, 7, 5, 3, 8, 6, 9]
Explanation: Each diagonal is read from its lowest row upward.
```

### Example 2

```text
Input: nums = [[1, 2], [3], [4, 5, 6]]
Output: [1, 3, 2, 4, 5, 6]
Explanation: Missing positions do not contribute entries.
```

## Constraints

- 1 <= nums.length, nums[i].length <= 100,000
- Total number of entries is at most 100,000.
- 1 <= nums[i][j] <= 100,000
