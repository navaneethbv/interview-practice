# N-Repeated Element in Size 2N Array

The array has 2n entries and n + 1 distinct values.
Exactly one value appears n times, while every other value appears once.
Return the repeated value.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3, 3]
Output: 3
Explanation: 3 appears twice in this four-element array.
```

### Example 2

```text
Input: nums = [2, 1, 2, 5, 3, 2]
Output: 2
Explanation: 2 appears three times.
```

## Constraints

- 2 <= n <= 5000.
- nums.length == 2 * n.
- 0 <= nums[i] <= 10000.
