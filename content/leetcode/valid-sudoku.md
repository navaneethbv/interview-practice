# Valid Sudoku

Check whether the filled cells in a 9 by 9 Sudoku board obey the rules.
Each row, each column, and each of the nine 3 by 3 boxes may contain each digit from 1 through 9 at most once.
A period marks an empty cell.
You only need to detect violations in the current board; you do not need to decide whether it can be completed.

## Examples

### Example 1

```text
Input: board = [["1", "2", "3", "4", "5", "6", "7", "8", "9"], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."]]
Output: true
Explanation: The only filled row has no repeated digits.
```

### Example 2

```text
Input: board = [["1", "1", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", ".", "."]]
Output: false
Explanation: The first row repeats 1.
```

## Constraints

- board has exactly 9 rows and 9 columns.
- Each cell is a period or a digit from 1 through 9.
