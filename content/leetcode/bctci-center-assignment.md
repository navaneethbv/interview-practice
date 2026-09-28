# Center Assignment

`points` has an even length.
Assign exactly half of the points to `center1` and the rest to `center2` to minimize the total Euclidean distance from points to their centers, and return that total.
Answers within `10^-3` are accepted.

## Examples

### Example 1

```text
Input: points = [[0, 1], [1, 0], [-1, 0], [0, -1]], center1 = [0, 0], center2 = [1, 1]
Output: 4.0
```

### Example 2

```text
Input: points = [[0, 0], [0, 0]], center1 = [0, 0], center2 = [1, 1]
Output: 1.41421
```

## Constraints

- `0 <= points.length <= 10^5` and the length is even.
- All coordinates are between `-10^4` and `10^4`.
