# Search in Rotated Sorted Array

`nums` contains distinct integers in increasing order, rotated by an unknown offset.
Return the index of `target`, or -1 if absent.
Your algorithm must run in O(log n) time.

## Examples

### Example 1

```text
Input: nums = [6, 8, 1, 3, 4], target = 3
Output: 3
Explanation: The target occurs at index 3.
```

### Example 2

```text
Input: nums = [6, 8, 1, 3, 4], target = 7
Output: -1
Explanation: The target does not occur.
```

## Constraints

- 1 <= nums.length <= 5,000
- -10,000 <= nums[i], target <= 10,000
- nums is a rotation of an increasing array with distinct entries.
