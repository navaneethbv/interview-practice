# Remove Duplicates from Sorted Array II

Modify sorted `nums` in place so each distinct value appears at most twice, preserving order.
Return the retained length k; only the first k entries are judged.
The displayed output is that retained prefix.
Use constant extra space.

## Examples

### Example 1

```text
Input: nums = [1, 1, 1, 2, 2, 3]
Output: [1, 1, 2, 2, 3]
Explanation: Keep only the first two copies of 1.
```

### Example 2

```text
Input: nums = [0, 0, 1, 1, 1, 1, 2, 3, 3]
Output: [0, 0, 1, 1, 2, 3, 3]
Explanation: Every retained value occurs at most twice.
```

## Constraints

- 1 <= nums.length <= 30,000
- -10,000 <= nums[i] <= 10,000
- nums is sorted in nondecreasing order.
