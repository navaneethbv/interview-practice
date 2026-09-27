# N-Queens

Place `n` queens on an `n` by `n` chessboard so that no two share a row, column, or diagonal.
Return every distinct board, using Q for a queen and . for an empty cell.
Each board is a list of rows from top to bottom; boards may appear in any order.

## Examples

### Example 1

```text
Input: n = 1
Output: [["Q"]]
Explanation: The single cell holds the only queen.
```

### Example 2

```text
Input: n = 4
Output: [[".Q..", "...Q", "Q...", "..Q."], ["..Q.", "Q...", "...Q", ".Q.."]]
Explanation: These are the two boards without attacking queens.
```

## Constraints

- 1 <= n <= 9
