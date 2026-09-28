# Nested Circles

Each circle is `[x, y, r]`.
The circles are nested if there is only one circle, or if one circle strictly contains all the others without touching them and the remaining circles are themselves nested.
Return whether the given non-empty set of circles is nested.

## Examples

### Example 1

```text
Input: circles = [[4, 4, 5], [8, 4, 2]]
Output: false
```

### Example 2

```text
Input: circles = [[5, 3, 3], [5, 3, 2], [4, 4, 5]]
Output: true
```

## Constraints

- `1 <= circles.length <= 10^4`
- `-10^4 <= x, y <= 10^4` and `1 <= r <= 10^4`
