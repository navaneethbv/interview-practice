# Find the Grid of Region Average

A region is a three-by-three subgrid in which every horizontally or vertically adjacent pair of pixels differs by at most threshold.
A region's average is the floor of the sum of its nine values divided by nine.
For each pixel, return the floor of the average of all region averages for regions containing that pixel.
If no region contains it, retain its original value.
All regions are determined from the original image.

## Constraints

- Image dimensions range from 3 to 500.
- Pixel values and threshold range from 0 to 255.

## Examples

### Example 1

```text
Input: image = [[0, 0, 0], [0, 9, 0], [0, 0, 0]], threshold = 9
Output: [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
Explanation: The one valid region has floor average 1.
```

### Example 2

```text
Input: image = [[0, 0, 0], [0, 9, 0], [0, 0, 0]], threshold = 8
Output: [[0, 0, 0], [0, 9, 0], [0, 0, 0]]
Explanation: An adjacent difference of 9 invalidates the only region.
```
