# Maximize Area of Square Hole in Grid

A rectangular grid has n + 2 horizontal bars and m + 2 vertical bars, spaced one unit apart and numbered from 1.
You may remove any subset of the listed horizontal and vertical interior bars.
Return the area of the largest square opening that can be formed.

## Examples

### Example 1

```text
Input: n = 3, m = 3, hBars = [2, 3], vBars = [2, 3]
Output: 9
Explanation: Removing two consecutive bars in each direction creates a side-3 square.
```

### Example 2

```text
Input: n = 4, m = 4, hBars = [2, 4], vBars = [2]
Output: 4
Explanation: Only one consecutive bar can be removed in either direction, giving side length 2.
```

## Constraints

- 1 <= n, m <= 1000000000.
- 1 <= hBars.length, vBars.length <= 100.
- Horizontal candidates are distinct indices from 2 through n + 1; vertical candidates range from 2 through m + 1.
