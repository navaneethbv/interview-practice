# Maximum Width Ramp

A ramp is a pair of indices i < j with nums[i] <= nums[j], and its width is j-i.
Return the greatest width, or 0 if no ramp exists.

## Examples

### Example 1

```text
Input: nums = [6, 0, 8, 2, 1, 5]
Output: 4
Explanation: Indices 1 and 5 form a ramp of width 4.
```

### Example 2

```text
Input: nums = [5, 4, 3]
Output: 0
Explanation: Every later value is smaller.
```

## Constraints

- 2 <= nums.length <= 50,000
- 0 <= nums[i] <= 50,000
