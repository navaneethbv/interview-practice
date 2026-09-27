# Minimum Removals to Balance Array

Remove as few entries as possible while keeping at least one, so the largest remaining value is at most k times the smallest remaining value.
Return the number removed.

## Examples

### Example 1

```text
Input: nums = [1, 3, 4, 9], k = 2
Output: 2
Explanation: Keep 3 and 4, whose ratio is at most 2.
```

### Example 2

```text
Input: nums = [5, 5, 5], k = 1
Output: 0
Explanation: All values already agree.
```

## Constraints

- 1 <= nums.length <= 100000
- 1 <= nums[i] <= 1000000000
- 1 <= k <= 100000
