# Time Traveler

`points` is a sorted list of years where your time machine can land, and you start at `points[0]`.
A jump moves you instantly from one landing year to the next one; you have `k` jumps.
Otherwise you age one year for every year you live through.
Return whether you can reach `points[points.length - 1]` while aging at most `maxAging` years.

## Examples

### Example 1

```text
Input: points = [2020, 2024], k = 0, maxAging = 3
Output: false
```

### Example 2

```text
Input: points = [1803, 1861, 1863, 1865, 1920, 1929, 1941, 1964, 2001, 2021], k = 4, maxAging = 45
Output: true
```

## Constraints

- `2 <= points.length <= 10^5` and `0 <= k <= points.length - 1`
- `0 <= points[i] <= 10^9`
- `1 <= maxAging <= 10^9`
