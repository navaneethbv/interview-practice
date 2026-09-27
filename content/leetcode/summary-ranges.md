# Summary Ranges

Compress the sorted distinct integers into maximal consecutive ranges.
Format a one-value range as a and a longer range as a->b.
Return ranges in ascending order.

## Examples

### Example 1

```text
Input: nums = [0, 1, 2, 4, 5, 7]
Output: ["0->2", "4->5", "7"]
Explanation: Group the consecutive runs.
```

### Example 2

```text
Input: nums = [1]
Output: ["1"]
Explanation: A singleton has no arrow.
```

## Constraints

- 0 <= nums.length <= 20
- Values fit signed 32-bit integers and are strictly increasing.
