# Single Element in a Sorted Array

In sorted `nums`, every value occurs exactly twice except one value that occurs once.
Return the single value in O(log n) time and constant extra space.

## Examples

### Example 1

```text
Input: nums = [1, 1, 2, 3, 3, 4, 4]
Output: 2
Explanation: Only 2 lacks a duplicate.
```

### Example 2

```text
Input: nums = [3, 3, 7, 7, 10, 11, 11]
Output: 10
Explanation: The single entry is 10.
```

## Constraints

- 1 <= nums.length <= 100,000
- 0 <= nums[i] <= 100,000
- The array is sorted and exactly one value is unpaired.
