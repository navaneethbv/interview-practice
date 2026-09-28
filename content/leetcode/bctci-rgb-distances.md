# RGB Distances

`screen` is a grid of pixels, each `R`, `G`, or `B`, and it contains at least one of each.
The taxicab distance between `(r1, c1)` and `(r2, c2)` is `|r1 - r2| + |c1 - c2|`.
Return a grid where a red pixel holds its distance to the nearest green pixel, a green pixel its distance to the nearest blue pixel, and a blue pixel its distance to the nearest red pixel.

## Examples

### Example 1

```text
Input: screen = ["RRRGRB", "BGRGRR", "RRRGRR", "RGRRRR", "GBGRGG"]
Output: [[2, 1, 1, 2, 1, 1], [1, 1, 1, 3, 1, 2], [2, 1, 1, 4, 1, 2], [1, 1, 1, 1, 1, 1], [1, 2, 1, 1, 3, 4]]
```

### Example 2

```text
Input: screen = ["RGB"]
Output: [[1, 1, 2]]
```

## Constraints

- `1 <= rows, columns <= 1,000`
