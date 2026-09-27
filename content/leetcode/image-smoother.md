# Image Smoother

Replace every pixel by the floor of the average of its original value and all existing neighbors in the surrounding three-by-three square.
Cells outside the image are excluded from the divisor.
Compute all results from the original image.

## Constraints

- Image dimensions range from 1 to 200.
- Pixel values range from 0 to 255.

## Examples

### Example 1

```text
Input: img = [[1, 2], [3, 4]]
Output: [[2, 2], [2, 2]]
Explanation: Each cell averages the same four pixels, flooring 2.5.
```

### Example 2

```text
Input: img = [[9]]
Output: [[9]]
Explanation: The only pixel is its own entire neighborhood.
```
