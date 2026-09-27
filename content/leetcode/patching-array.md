# Patching Array

You may add positive integers to sorted nums.
Return the minimum number of additions needed so every integer from 1 through n can be formed as the sum of some subset, using each array occurrence at most once.

## Constraints

- nums contains 1 to 1000 sorted positive integers no greater than 10000.
- `1 <= n <= 2147483647`.

## Examples

### Example 1

```text
Input: nums = [1, 3], n = 6
Output: 1
Explanation: Adding 2 lets subsets represent every value through 6.
```

### Example 2

```text
Input: nums = [1, 2, 2], n = 5
Output: 0
Explanation: The existing numbers already cover the entire range.
```
