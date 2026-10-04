## Intuition

Sorting rows or columns must move entire records across the grid, not just sort the selected key cells.
For column sorting, compute one permutation from the chosen row and apply it to every row.
For row sorting, the rows themselves are the movable records.

## Approach

Store the current integer matrix in `cells`, initialized to zero.
Set and get access one indexed cell directly.
To sort columns, create their current indices and stably sort those indices by the values in the selected row.
Build a new matrix by reading each original row in that shared index order.
To sort rows, stably sort the outer collection using the selected column's value as the key.
Stability always refers to the order immediately before the operation, including any earlier sorts.
These transformations preserve each whole column or row's internal associations while changing its position.

## Walkthrough

Example 1's set operations create rows `[5, 3, 8]`, `[6, 0, 0]`, and `[0, 1, 0]`.
Sorting columns by row zero chooses original column order one, zero, two.
The rows become `[3, 5, 8]`, `[0, 6, 0]`, and `[1, 0, 0]`.
Sorting rows by column one then orders their keys zero, five, six.
The cell at row one, column one is now 5, which the final get returns.

## Complexity

Set and get take O(1) time.
For r rows and c columns, column sorting costs O(c log c + r times c) time and O(r times c) additional space for the replacement grid.
Row sorting costs O(r log r) time and up to O(r) sorting workspace.
The stored matrix occupies O(r times c) space.

## Edge cases

All-zero keys leave their current relative order unchanged.
A one-row or one-column spreadsheet still obeys the same whole-record movement rules.

## Common mistakes

Do not sort each row independently during a column reorder.
An unstable sort can violate equal-key order after earlier operations.

## Language notes

Python uses stable `sorted` and list sorting.
Java sorts object arrays of boxed indices or row arrays, whose sort preserves equal-key order.
