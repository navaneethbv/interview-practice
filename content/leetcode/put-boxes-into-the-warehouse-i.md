# Put Boxes Into the Warehouse I

A warehouse is a row of rooms with the given heights and unit widths.
Insert unit-width boxes from the left, choosing their insertion order freely.
Boxes cannot be stacked or pass a room shorter than themselves.
Return the largest number of boxes that can fit.

## Examples

### Example 1

```text
Input: boxes = [4, 3, 4, 1], warehouse = [5, 3, 3, 4, 1]
Output: 3
Explanation: Place the box of height 1 at the far end, then heights 3 and 4 closer to the entrance.
```

### Example 2

```text
Input: boxes = [3, 4], warehouse = [2, 2]
Output: 0
Explanation: Neither box fits through the entrance.
```

## Constraints

- 1 <= boxes.length, warehouse.length <= 100000
- 1 <= boxes[i], warehouse[i] <= 1000000000
