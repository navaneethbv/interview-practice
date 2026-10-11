# Number of Lines To Write String

`widths[0]` is the pixel width of 'a', `widths[1]` of 'b', and so on.
Write `s` from left to right on lines at most 100 pixels wide; if a letter does not fit on the current line, it starts the next line.
Return `[number of lines, width of the last line]`.

## Constraints

- widths.length == 26 and 2 <= widths[i] <= 10
- 1 <= s.length <= 1000
- s consists of lowercase English letters.

## Examples

### Example 1

```text
Input: widths = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], s = "abcdefghijklmnopqrstuvwxyz"
Output: [3, 60]
Explanation: Ten letters fill each of the first two lines, leaving six letters (60 pixels) on the third.
```

### Example 2

```text
Input: widths = [4, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], s = "bbbcccdddaaa"
Output: [2, 4]
Explanation: Nine 10-pixel letters and two 4-pixel a's use 98 pixels; the last a does not fit and starts line two.
```
