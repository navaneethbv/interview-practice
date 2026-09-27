# Domino and Tromino Tiling

Count tilings of a 2 by n board using 2-cell dominoes and L-shaped 3-cell trominoes.
Tiles may be rotated, and must cover every cell exactly once.
Return the count modulo 1000000007.

## Examples

### Example 1

```text
Input: n = 2
Output: 2
Explanation: Use two vertical dominoes or two horizontal dominoes.
```

### Example 2

```text
Input: n = 3
Output: 5
Explanation: There are three domino-only arrangements and two using trominoes.
```

## Constraints

- 1 <= n <= 1000.
