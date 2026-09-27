# Contiguous Array

Return the maximum length of a contiguous segment containing the same number of 0 and 1 entries.
Return 0 if no nonempty balanced segment exists.

## Examples

### Example 1

```text
Input: nums = [0, 1, 0]
Output: 2
Explanation: Either neighboring pair has one zero and one one.
```

### Example 2

```text
Input: nums = [0, 0, 1, 1]
Output: 4
Explanation: The entire array is balanced.
```

## Constraints

- 1 <= nums.length <= 100,000
- Every entry is 0 or 1.
