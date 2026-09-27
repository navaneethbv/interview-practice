# Monotonic Array

Return whether nums is entirely nondecreasing or entirely nonincreasing.
Equal neighboring values are permitted in either direction.

## Examples

### Example 1

```text
Input: nums = [1, 2, 2, 3]
Output: true
Explanation: The values never decrease.
```

### Example 2

```text
Input: nums = [1, 3, 2]
Output: false
Explanation: There is both an increase and a decrease.
```

## Constraints

- 1 <= nums.length <= 100000.
- -100000 <= nums[i] <= 100000.
