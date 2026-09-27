# Make Array Zero by Subtracting Equal Amounts

In one operation, choose a positive integer no larger than the smallest positive array entry and subtract it from every positive entry.
Return the fewest operations needed to make all entries zero.

## Examples

### Example 1

```text
Input: nums = [1, 5, 0, 3, 5]
Output: 3
Explanation: Subtract 1, then 2, then 2 from positive entries.
```

### Example 2

```text
Input: nums = [0]
Output: 0
Explanation: The array is already zero.
```

## Constraints

- 1 <= nums.length <= 100
- 0 <= nums[i] <= 100
