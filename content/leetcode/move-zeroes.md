# Move Zeroes

Move all zero entries to the end of `nums` in place while preserving the relative order of the nonzero entries.
Use constant auxiliary space.
The displayed output is the updated array.

## Examples

### Example 1

```text
Input: nums = [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
Explanation: The nonzero values stay in their original order.
```

### Example 2

```text
Input: nums = [0]
Output: [0]
Explanation: The array contains only a zero.
```

## Constraints

- 1 <= nums.length <= 10,000
- -2^31 <= nums[i] <= 2^31 - 1
