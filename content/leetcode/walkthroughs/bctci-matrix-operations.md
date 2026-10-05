## Intuition

Square-matrix rotations can be decomposed into a transpose followed by a reflection.
Each primitive transformation exchanges pairs of cells or row references.
This permits in-place transformations without allocating another matrix for every operation.

## Brute force

Allocate a new n-by-n matrix and place each old cell at its transformed coordinates.
That gives O(n²) temporary space, violating the transformation requirement.

## Approach

`transpose` swaps only cells above the diagonal with their reflected positions below it.
`reflect_horizontally` reverses the order of rows, matching this problem's explicit naming convention.
`reflect_vertically` reverses each row's columns.
Clockwise rotation performs transpose followed by vertical reflection; anticlockwise rotation performs transpose followed by horizontal reflection.
For example, clockwise mapping sends old `(r, c)` to `(c, n - 1 - r)`.
The constructor copies the input grid, and `get_grid` returns a fresh copy so callers receive a snapshot rather than a mutable alias.

## Walkthrough

Example 1 constructs the matrix `[[1, 2], [3, 4]]` and rotates clockwise.
Transposing swaps 2 and 3, giving `[[1, 3], [2, 4]]`.
Reversing each row then produces `[[3, 1], [4, 2]]`.
The transformation's operation result is null.
The following getter returns that two-row grid, giving the stated result list.

## Complexity

Transpose, either rotation, and vertical reflection take O(n²) time.
Horizontal reflection swaps row references and takes O(n).
Transformations use O(1) extra space.
Construction and getters take O(n²) time and space for their required copies.

## Edge cases

A one-cell matrix remains unchanged under every transformation.
Repeated operations compose on the current grid, so four clockwise rotations recover the original values.

## Common mistakes

Swapping both halves during transpose would undo the operation.
Respect the statement's row-swapping definition of horizontal reflection.

## Language notes

Python uses tuple assignment and list reversal.
Java uses temporary variables for cell swaps and temporary row references for horizontal reflection.
