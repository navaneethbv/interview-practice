# Design Spreadsheet

A spreadsheet has columns `'A'` to `'Z'` and rows `1..rows`; every cell starts at 0.
Cells are named like `"B10"`.
`setCell(cell, value)` stores a value, `resetCell(cell)` sets it back to 0, and
`getValue(formula)` evaluates a formula of the form `"=X+Y"`, where each of `X` and `Y` is either a non-negative integer or a cell name.

Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- 1 <= rows <= 10^3
- 0 <= value <= 10^5
- Formulas always have the form =X+Y.

## Examples

### Example 1

```text
Input: ctor = [3], ops = ["getValue", "setCell", "getValue", "setCell", "getValue", "resetCell", "getValue"], args = [["=5+7"], ["A1", 10], ["=A1+6"], ["B2", 15], ["=A1+B2"], ["A1"], ["=A1+B2"]]
Output: [12, null, 16, null, 25, null, 15]
Explanation: Unset and reset cells count as 0.
```

### Example 2

```text
Input: ctor = [1], ops = ["getValue"], args = [["=Z1+0"]]
Output: [0]
Explanation: A cell that was never set is 0.
```
