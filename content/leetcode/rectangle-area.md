# Rectangle Area

Two axis-aligned rectangles are specified by their bottom-left and top-right corners.
Return their total covered area, counting any overlap once.

## Examples

### Example 1

```text
Input: ax1 = 0, ay1 = 0, ax2 = 2, ay2 = 2, bx1 = 1, by1 = 1, bx2 = 3, by2 = 3
Output: 7
Explanation: The two area-four rectangles share one unit square.
```

### Example 2

```text
Input: ax1 = 0, ay1 = 0, ax2 = 1, ay2 = 1, bx1 = 2, by1 = 2, bx2 = 3, by2 = 3
Output: 2
Explanation: The rectangles do not overlap.
```

## Constraints

- All coordinates are integers between -10,000 and 10,000.
- ax1 < ax2, ay1 < ay2, bx1 < bx2, and by1 < by2.
