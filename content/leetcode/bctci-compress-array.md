# Compress Array

A compress step finds the first pair of adjacent equal numbers and replaces the pair with their sum.
Apply compress steps until no two adjacent numbers are equal, and return the final array.

## Examples

### Example 1

```text
Input: arr = [8, 4, 2, 2, 2, 4]
Output: [16, 2, 4]
Explanation: [8, 4, 2, 2, 2, 4] becomes [8, 4, 4, 2, 4], then [8, 8, 2, 4], then [16, 2, 4].
```

### Example 2

```text
Input: arr = [4, 4, 4, 4]
Output: [16]
```

## Constraints

- `0 <= arr.length <= 10^5`
- `0 <= arr[i] < 1,000`
