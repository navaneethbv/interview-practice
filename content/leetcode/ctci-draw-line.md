# Draw Line

A monochrome screen is stored as an array of bytes, each holding eight horizontally adjacent pixels.
Rows are stored one after another, and each row is `width` pixels wide, where `width` is a multiple of 8.
Within a byte, the most significant bit is the leftmost pixel.
Each byte is given as an integer from 0 to 255.

Draw a horizontal line from pixel column `x1` to `x2` inclusive on row `y` by setting those pixels to 1, and return the updated screen.

## Examples

### Example 1

```text
Input: screen = [0, 0, 0, 0], width = 16, x1 = 3, x2 = 10, y = 1
Output: [0, 0, 31, 224]
Explanation: Row 1 is bytes 2 and 3; columns 3 to 7 and 8 to 10 are set.
```

### Example 2

```text
Input: screen = [0], width = 8, x1 = 0, x2 = 7, y = 0
Output: [255]
```

## Constraints

- `1 <= screen.length <= 10,000`
- `width` is a positive multiple of 8 and `screen.length * 8` is a multiple of `width`.
- `0 <= x1 <= x2 < width`
- `y` is a valid row.
- Pixels that are already set stay set.
