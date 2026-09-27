# Find All Lonely Numbers in the Array

A number is lonely if it occurs exactly once and neither value one smaller nor value one larger occurs anywhere in nums.
Return all lonely numbers in any order.

## Constraints

- `1 <= nums.length <= 100000`.
- `0 <= nums[i] <= 1000000`.

## Examples

### Example 1

```text
Input: nums = [2, 4, 4, 7, 8, 10]
Output: [2, 10]
Explanation: 4 repeats, and 7 and 8 have consecutive neighbors.
```

### Example 2

```text
Input: nums = [1, 2, 3]
Output: []
Explanation: Every value has a consecutive neighbor.
```
