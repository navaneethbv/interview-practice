# Sum Swap

Two integer arrays are given.
Find a value `x` in `a` and a value `y` in `b` such that swapping them gives both arrays the same sum.
If several pairs work, return the one with the smallest `x`; that choice determines `y`.
Return `[x, y]`, or an empty array when no swap works.

## Examples

### Example 1

```text
Input: a = [4, 1, 2, 1, 1, 2], b = [3, 6, 3, 3]
Output: [1, 3]
Explanation: The sums are 11 and 15; swapping 1 and 3 makes both 13.
```

### Example 2

```text
Input: a = [1], b = [2]
Output: []
```

## Constraints

- `1 <= a.length, b.length <= 100,000`
- `-10^6 <= a[i], b[j] <= 10^6`
