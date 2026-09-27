# Find Pivot Index

Return the leftmost index whose entries strictly to its left and strictly to its right have equal sums.
An empty side sums to zero.
Return -1 if no such index exists.

## Examples

### Example 1

```text
Input: nums = [1, 7, 3, 6, 5, 6]
Output: 3
Explanation: Both sides of index 3 sum to 11.
```

### Example 2

```text
Input: nums = [2, 1, -1]
Output: 0
Explanation: The empty left side and the right side both sum to zero.
```

## Constraints

- 1 <= nums.length <= 10,000
- -1,000 <= nums[i] <= 1,000
