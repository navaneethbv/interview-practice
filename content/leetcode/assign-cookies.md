# Assign Cookies

Each child requires a cookie of size at least its greed factor in `g`.
Each cookie in `s` may go to at most one child, and each child receives at most one cookie.
Return the largest number of satisfied children.

## Constraints

- `1 <= g.length <= 30000`.
- `0 <= s.length <= 30000`.
- Greed factors and sizes are positive signed 32-bit integers.

## Examples

### Example 1

```text
Input: g = [2, 3], s = [1, 2, 3]
Output: 2
Explanation: Give cookies 2 and 3 to the two children.
```

### Example 2

```text
Input: g = [3, 4], s = [1, 2]
Output: 0
Explanation: Every cookie is too small.
```
