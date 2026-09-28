# The Floor Is Lava

Each piece of furniture is an axis-aligned rectangle `[xMin, yMin, xMax, yMax]`; pieces do not overlap but may touch.
You may jump between two pieces when the straight-line distance between their closest points is at most `d`.
Starting on piece 0, return whether you can reach the last piece without touching the floor.

## Examples

### Example 1

```text
Input: furniture = [[1, 1, 9, 5], [12, 9, 20, 13], [16, 2, 22, 7], [24, 9, 26, 11], [29, 1, 31, 5]], d = 5
Output: true
```

### Example 2

```text
Input: furniture = [[1, 1, 9, 5], [12, 9, 20, 13], [16, 2, 22, 7], [24, 9, 26, 11], [29, 1, 31, 5]], d = 4
Output: false
```

## Constraints

- `1 <= furniture.length <= 1,000`
- `0 <= xMin < xMax < 10^9` and `0 <= yMin < yMax < 10^9`
- `1 <= d <= 10^9`
