# Search Insert Position

Return target's index if it is present in the strictly increasing array.
Otherwise return the index at which inserting target preserves the order.
Use O(log n) time.

## Examples

### Example 1

```text
Input: nums = [1, 4, 7], target = 5
Output: 2
Explanation: Insert 5 before 7.
```

### Example 2

```text
Input: nums = [1, 4, 7], target = 4
Output: 1
Explanation: 4 already occupies index 1.
```

## Constraints

- 1 <= nums.length <= 10000.
- -10000 <= nums[i], target <= 10000.
