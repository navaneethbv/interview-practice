# Time Traveler Max Year

`points` is a sorted list of years where your time machine can land, and you start at `points[0]`.
A jump moves you instantly from one landing year to the next one; you have `k` jumps.
Otherwise you age one year for every year you live through.
You may keep living past the last landing year.
Return the latest year you can reach while aging at most `maxAging` years.

## Examples

### Example 1

```text
Input: points = [2020, 2024], k = 1, maxAging = 1
Output: 2025
```

### Example 2

```text
Input: points = [1, 3, 6, 7, 11, 16, 17, 19], k = 2, maxAging = 4
Output: 12
```

## Constraints

- `2 <= points.length <= 10^5` and `0 <= k <= points.length - 1`
- `0 <= points[i] <= 10^9`
- `1 <= maxAging <= 10^9`
