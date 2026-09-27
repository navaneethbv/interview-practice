# Count of Range Sum

Count nonempty contiguous subarrays whose sums lie in the inclusive range [lower,upper].

## Examples

### Example 1

```text
Input: nums = [-2, 5, -1], lower = -2, upper = 2
Output: 3
Explanation: The qualifying segments are [-2], [-1], and [-2,5,-1].
```

### Example 2

```text
Input: nums = [0], lower = 0, upper = 0
Output: 1
Explanation: The single zero qualifies.
```

## Constraints

- 1 <= nums.length <= 100,000
- Array values fit signed 32-bit integers.
- -100,000 <= lower <= upper <= 100,000
- The answer fits a signed 32-bit integer.
