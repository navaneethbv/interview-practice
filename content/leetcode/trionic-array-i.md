# Trionic Array I

Determine whether the array consists of three consecutive nonempty runs of steps: strictly increasing, then strictly decreasing, then strictly increasing.
There must be indices 0 < p < q < n-1 marking the two turning points.

## Examples

### Example 1

```text
Input: nums = [1, 4, 2, 5]
Output: true
Explanation: The values rise to 4, fall to 2, then rise to 5.
```

### Example 2

```text
Input: nums = [1, 2, 3]
Output: false
Explanation: There is no decreasing section.
```

## Constraints

- 3 <= nums.length <= 100
- -1000 <= nums[i] <= 1000
