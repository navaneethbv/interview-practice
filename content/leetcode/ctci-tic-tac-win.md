# Tic Tac Win

An `n x n` tic-tac-toe board is given as `n` strings, each of length `n`.
Cells contain `'X'`, `'O'`, or `' '` for empty.
Return `"X"` or `"O"` if that player has filled an entire row, column, or either main diagonal, and `""` if nobody has.
At most one player has a winning line.

## Examples

### Example 1

```text
Input: board = ["XO ", "XO ", "X  "]
Output: "X"
```

### Example 2

```text
Input: board = ["XOX", "OXO", "OXO"]
Output: ""
```

## Constraints

- `1 <= n <= 100`
