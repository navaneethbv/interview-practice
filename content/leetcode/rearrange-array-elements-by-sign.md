# Rearrange Array Elements by Sign

Rearrange the values so signs alternate, beginning with a positive value.
Preserve the original relative order among positive values and among negative values.
The input contains equal numbers of positive and negative values and no zeros.

## Examples

### Example 1

```text
Input: nums = [3, 1, -2, -5, 2, -4]
Output: [3, -2, 1, -5, 2, -4]
Explanation: The positive order 3,1,2 and negative order -2,-5,-4 are preserved.
```

### Example 2

```text
Input: nums = [-1, 1]
Output: [1, -1]
Explanation: The positive value must come first.
```

## Constraints

- nums.length is even, between 2 and 200000.
- 1 <= abs(nums[i]) <= 100000.
