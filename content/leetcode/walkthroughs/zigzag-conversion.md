## Intuition

Characters travel down the rows and then diagonally upward in a repeating cycle.
A direction flag tells whether the next character moves down or up.
Appending each character directly to its current row lets the final answer be read row by row.

## Brute force

A literal grid simulation could allocate rows and columns for every position in the visual zigzag.
That representation uses O(n times numRows) potential cells even though most cells are empty.
The row buffers keep only characters that belong to the output and avoid empty grid positions.

## Approach

1. Return the input when there is one row or when rows exceed the string length.
2. Create one character buffer for each row.
3. Append each character to the current row.
4. Reverse direction at the top and bottom row.
5. Join the row buffers in row order.

## Walkthrough

Example 1 converts ABCDEFG with three rows.
A enters row 0, B row 1, and C row 2 while moving downward.
The direction reverses, so D enters row 1 and E enters row 0.
The next downward movement places F in row 1 and G in row 2.
Reading rows gives AE, BDF, and CG, which combine to AEBDFCG.

## Complexity

Let n be the input length and r be the number of rows.
Each character is appended once and each output character is joined once, giving O(n) time.
The row buffers and returned string require O(n) total storage.
The direction and row indices use O(1) additional scalar space.

## Edge cases

One row preserves the original order.
At least as many rows as characters also preserves the original order.
The first and last rows reverse direction before the next character.
Empty input returns immediately because the row condition is true.

## Common mistakes

- Moving past the bottom row before reversing causes an invalid index.
- Reading the visual grid by columns produces a different ordering.
- Treating the first row like an ordinary middle row starts in the wrong direction.
- Building a full rectangular grid wastes space on empty cells.

## Language notes

Python uses lists of characters so repeated append does not rebuild a row string on every character.
Java uses one StringBuilder per row and reads with charAt instead of allocating a character array.
Both methods return a string without changing the source string.
