# Triangle Judgement

For each triple of segment lengths, report `Yes` if they can form a nondegenerate triangle and `No` otherwise.
The sum of any two lengths must strictly exceed the third.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `x`, `y`, `z`, `triangle`; row order is unrestricted.

## Tables

### Triangle

| Column | SQLite type |
| --- | --- |
| x | INTEGER |
| y | INTEGER |
| z | INTEGER |

## Constraints

- `(x, y, z)` is unique.
- Lengths are positive integers.

## Examples

### Example 1

```text
Input: {"tables": {"Triangle": [[3, 4, 5], [2, 3, 5]]}}
Output: [[3, 4, 5, "Yes"], [2, 3, 5, "No"]]
Explanation: Equality produces a flat shape and is rejected.
```

### Example 2

```text
Input: {"tables": {"Triangle": [[2, 2, 2]]}}
Output: [[2, 2, 2, "Yes"]]
Explanation: Equal positive sides form a triangle.
```
