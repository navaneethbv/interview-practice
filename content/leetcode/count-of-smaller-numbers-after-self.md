# Count of Smaller Numbers After Self

For each index, count the elements strictly smaller than `nums[i]` that occur to its right.
Return these counts in the original index order.

## Constraints

- `1 <= nums.length <= 100000`.
- `-10000 <= nums[i] <= 10000`.

## Examples

### Example 1

```text
Input: nums = [4, 1, 3, 1]
Output: [3, 0, 1, 0]
Explanation: For 4, all three later numbers are smaller; equal 1 values do not count.
```

### Example 2

```text
Input: nums = [-1, -1]
Output: [0, 0]
Explanation: Equal values are never strictly smaller.
```
