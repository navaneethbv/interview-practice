# Next Greater Element II

Treat `nums` as circular.
For each position, return the first strictly greater value encountered while moving right and wrapping at the end, or -1 if none exists.

## Examples

### Example 1

```text
Input: nums = [1, 2, 1]
Output: [2, -1, 2]
Explanation: The final 1 wraps around to find 2.
```

### Example 2

```text
Input: nums = [3, 3, 3]
Output: [-1, -1, -1]
Explanation: Equal values are not greater.
```

## Constraints

- 1 <= nums.length <= 10,000
- -10^9 <= nums[i] <= 10^9
