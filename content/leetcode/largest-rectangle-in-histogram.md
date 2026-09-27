# Largest Rectangle in Histogram

Adjacent histogram bars each have width one and the heights given in `heights`.
Find the greatest area of an axis-aligned rectangle that fits completely inside the histogram.

## Examples

### Example 1

```text
Input: heights = [2, 4, 4, 1]
Output: 8
Explanation: A height-4 rectangle spans the two middle bars.
```

### Example 2

```text
Input: heights = [3, 3, 3]
Output: 9
Explanation: Use height 3 across all three bars.
```

## Constraints

- 1 <= heights.length <= 100000.
- 0 <= heights[i] <= 10000.
