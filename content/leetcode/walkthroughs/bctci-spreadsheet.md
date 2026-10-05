## Intuition

Sorting a spreadsheet rearranges entire rows or columns, preserving associations among all their cells.
The selected row or column supplies sort keys, and equal keys must retain their current relative order.

## Brute force

Sorting only the selected cells destroys the relationship with other cells in their rows or columns.
A column permutation records the required rearrangement once and applies it consistently to every row.

## Approach

Store the grid in `cells`.
For column sorting, stably sort column indices by the chosen row's values, then rebuild every row using that `order`.
For row sorting, stably sort the row objects by their chosen column value.
Get and set use current coordinates.

## Walkthrough

Example 1 first forms rows `[5,3,8]`, `[6,0,0]`, and `[0,1,0]`.
Sorting columns by row 0 uses order `[1,0,2]`, yielding `[3,5,8]`, `[0,6,0]`, and `[1,0,0]`.
Sorting rows by column 1 orders keys 0, 5, 6, so `get(1,1)` returns 5.

## Complexity

Get and set take O(1).
For R rows and C columns, column sorting takes O(C log C + RC) time and O(RC) temporary space.
Row sorting takes O(R log R) time and O(R) sorting space.
Persistent grid storage is O(RC).

## Edge cases

All cells initially contain zero.
Equal keys keep their prior relative ordering, including ordering established by earlier operations.
A one row or one column sheet still uses the same methods.
Negative values follow ordinary numeric ordering.

## Common mistakes

Apply a column permutation uniformly to every row.
Do not read keys from a partially rearranged grid while rebuilding it.
Stability refers to current order at the time of the operation, not immutable original coordinates.

## Language notes

Python's `sorted` and list sort are stable.
Java sorts boxed column indices and row array references using stable object array sorting.
The spec maps snake case sorting methods to their Java camelCase counterparts.
