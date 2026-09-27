# Find Peak Element

Return the index of any element strictly greater than its immediate neighbors.
Treat the values just outside the array as negative infinity.
Adjacent input values are always different, so at least one peak exists.
Use O(log n) time; any valid peak index is accepted.

## Examples

### Example 1

```text
Input: nums = [1, 4, 2]
Output: 1
Explanation: The value 4 exceeds both neighbors.
```

### Example 2

```text
Input: nums = [5, 3, 1]
Output: 0
Explanation: The first value exceeds its only real neighbor.
```

## Constraints

- 1 <= nums.length <= 1000.
- Values are signed 32-bit integers.
- nums[i] != nums[i + 1] for every adjacent pair.
