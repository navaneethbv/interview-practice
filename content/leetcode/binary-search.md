# Binary Search

Find `target` in the strictly increasing array `nums`.
Return its zero-based index, or -1 when it is absent.
Use O(log n) time.

## Examples

### Example 1

```text
Input: nums = [-5, -1, 3, 8, 12], target = 8
Output: 3
Explanation: The value 8 is at index 3.
```

### Example 2

```text
Input: nums = [1, 4, 9], target = 5
Output: -1
Explanation: The target is absent.
```

## Constraints

- 1 <= nums.length <= 10000.
- -10000 <= nums[i], target <= 10000.
- All values in nums are distinct and sorted.
