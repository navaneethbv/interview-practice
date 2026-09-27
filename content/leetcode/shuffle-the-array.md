# Shuffle the Array

The first half of nums contains x1 through xn and the second half contains y1 through yn.
Return the interleaving `[x1,y1,x2,y2,...,xn,yn]`.

## Examples

### Example 1

```text
Input: nums = [2, 5, 1, 3, 4, 7], n = 3
Output: [2, 3, 5, 4, 1, 7]
Explanation: Alternate values from the two halves.
```

### Example 2

```text
Input: nums = [1, 2], n = 1
Output: [1, 2]
Explanation: The single pair already has the desired order.
```

## Constraints

- 1 <= n <= 500.
- nums.length == 2 * n.
- 1 <= nums[i] <= 1000.
