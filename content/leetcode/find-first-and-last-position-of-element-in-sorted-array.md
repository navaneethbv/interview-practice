# Find First and Last Position of Element in Sorted Array

Find the first and last zero-based positions of target in a nondecreasing array.
Return `[-1, -1]` when target is absent.
Use O(log n) time.

## Examples

### Example 1

```text
Input: nums = [1, 2, 2, 2, 4], target = 2
Output: [1, 3]
Explanation: The block of 2s occupies indices 1 through 3.
```

### Example 2

```text
Input: nums = [1, 3, 5], target = 2
Output: [-1, -1]
Explanation: The target is absent.
```

## Constraints

- 0 <= nums.length <= 100000.
- Values and target are signed 32-bit integers.
