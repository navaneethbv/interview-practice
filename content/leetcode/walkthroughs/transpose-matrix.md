## Intuition

Transposing exchanges row and column coordinates.
An entry at row r and column c becomes the entry at row c and column r.

## Brute force

There is no useful shortcut that avoids writing every output entry.
Repeatedly searching for each transposed position can still take O(RC) time but adds unnecessary indexing work.

## Approach

1. Allocate an output with C rows and R columns.
2. Visit every input coordinate.
3. Store matrix[row][column] at transposed[column][row].

## Walkthrough

Example 1:

For [[1,2,3],[4,5,6]], entry 1 at row 0 column 0 stays at output row 0 column 0.
Entry 2 moves to output row 1 column 0, and entry 4 moves to output row 0 column 1.
Completing those coordinate swaps produces [[1,4],[2,5],[3,6]].
The output dimensions are three rows by two columns, the reverse of the input dimensions.

## Complexity

Every of the R times C entries is read and written once, so time is O(RC).
The output itself uses O(RC) space.
Python creates nested lists, while Java allocates a primitive two-dimensional array.

## Edge cases

A one-row matrix becomes one column.
A one-column matrix becomes one row.
The input is guaranteed rectangular, so the first row determines the column count.

## Common mistakes

Do not allocate the output with the original dimensions.
Do not reverse values within rows instead of exchanging coordinates.
Keep every input value, including zeros or negative values if allowed by the caller.

## Language notes

The Python reference uses explicit indices rather than zip so its coordinate mapping is visible.
The Java reference uses primitive arrays and preserves the required rectangular result.
