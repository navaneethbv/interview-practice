# Longest Consecutive Sequence

Find the largest number of distinct consecutive integers present in `nums`.
Their positions in the array do not matter, and duplicates do not extend a sequence.
Return 0 for an empty array.
Design an algorithm with expected O(n) running time.

## Examples

### Example 1

```text
Input: nums = [8, 2, 4, 3, 2, 20]
Output: 3
Explanation: The consecutive values 2, 3, and 4 give length 3.
```

### Example 2

```text
Input: nums = []
Output: 0
Explanation: No values are present.
```

## Constraints

- 0 <= nums.length <= 100000.
- -1000000000 <= nums[i] <= 1000000000.
