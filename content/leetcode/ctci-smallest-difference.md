# Smallest Difference

Given two non-empty integer arrays, pick one value from each so that their absolute difference is as small as possible.
Return that difference.
Use a 64-bit result, since the difference can exceed the 32-bit range.

## Examples

### Example 1

```text
Input: a = [1, 3, 15, 11, 2], b = [23, 127, 235, 19, 8]
Output: 3
Explanation: The pair (11, 8) differs by 3.
```

### Example 2

```text
Input: a = [-2147483648], b = [2147483647]
Output: 4294967295
```

## Constraints

- `1 <= a.length, b.length <= 100,000`
- `-2^31 <= a[i], b[j] <= 2^31 - 1`
