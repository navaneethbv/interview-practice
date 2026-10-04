## Intuition

Once the fox's row in one column is known, the next snowprint can only be one row above, on the same row, or one row below.
Find the first snowprint with a full column scan, then follow the narrow trail locally.
The smallest row encountered is the closest approach to the river.

## Brute force

Inspect every grid cell and take the minimum row containing a snowprint.
This takes O(rows times columns) time, ignoring the adjacent-column movement guarantee.

## Approach

Scan column zero until locating its unique one and initialize `closest` to that row.
For each subsequent column, check the three candidate rows around the previously located print.
Ignore candidates outside the grid.
When the unique snowprint is found, replace the current row and stop checking that column.
Update closest with the smaller of its previous value and the current row.
The promised trail continuity guarantees one of those candidates succeeds.
The algorithm follows the actual trail rather than attempting to infer distances from grid cells without prints.

## Walkthrough

Example 1 locates its first print at row two.
Across later columns, the print rows are two, one, two, three, and three.
The running minimum begins at two, falls to one in column two, and never improves afterward.
The result is 1, indicating the closest print lies one row below row zero's river boundary.
The fox's final row is three, which does not affect that earlier closest approach.

## Complexity

The initial search takes O(rows), and every later column examines at most three candidates.
Both references therefore run in O(rows + columns) time and O(1) auxiliary space.
They do not copy or mutate the field.

## Edge cases

A one-column field returns its sole print's row.
A trail touching row zero makes the answer zero.
Boundary candidate checks prevent accessing a row above zero or below the grid.

## Common mistakes

Do not return the final trail row instead of the minimum row seen.
This local search relies on both uniqueness per column and the at-most-one-row movement guarantee.

## Language notes

Python uses a generator to locate the first print.
Java uses a while loop, then breaks immediately after updating the row during each candidate scan.
