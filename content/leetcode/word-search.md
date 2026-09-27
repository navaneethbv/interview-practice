# Word Search

Determine whether `word` can be traced through the letter grid.
Each step moves one cell horizontally or vertically, and the letters along the path must spell the word in order.
A cell can appear at most once in a path.
Letters are case sensitive.

## Examples

### Example 1

```text
Input: board = [["C", "A", "T"], ["R", "R", "E"]], word = "CATE"
Output: true
Explanation: Move across the top row, then down from T to E.
```

### Example 2

```text
Input: board = [["A", "B"], ["C", "D"]], word = "ABA"
Output: false
Explanation: Spelling ABA would require reusing the A cell.
```

## Constraints

- 1 <= board rows, board columns <= 6.
- 1 <= word.length <= 15.
- The board and word contain uppercase or lowercase English letters.
