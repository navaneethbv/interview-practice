# Design Excel Sum Formula

Build a small spreadsheet with rows `1..height` and columns `'A'..width`; every cell starts at 0.
`set(row, column, val)` stores a value, replacing any formula in that cell.
`get(row, column)` returns the cell's current value.
`sum(row, column, numbers)` makes the cell a formula equal to the sum of the cells listed in `numbers`, and returns its current value.
Each entry of `numbers` is a single cell such as `"A1"` or a rectangle such as `"A1:B2"`; a cell listed twice counts twice.
A formula stays live: when a referenced cell changes, the formula's value changes too.

Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- 1 <= height <= 26 and 'A' <= width <= 'Z'
- Formulas never form a cycle.
- At most 100 operations.

## Examples

### Example 1

```text
Input: ctor = [3, "C"], ops = ["set", "sum", "set", "get"], args = [[1, "A", 2], [3, "C", ["A1", "A1:B2"]], [2, "B", 2], [3, "C"]]
Output: [null, 4, null, 6]
Explanation: C3 = A1 + (A1 + B1 + A2 + B2) = 4 at first; setting B2 to 2 makes it 6.
```

### Example 2

```text
Input: ctor = [2, "B"], ops = ["sum", "set", "get"], args = [[1, "A", ["B1"]], [1, "A", 5], [1, "A"]]
Output: [0, null, 5]
Explanation: Setting a value removes the formula.
```
