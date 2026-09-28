## Intuition
At each row, record the height of consecutive ones ending there in every column.
Because whole columns may be rearranged, sort these heights in descending order and use the tallest `width` columns as a rectangle whose height is the last height in that prefix.

## Brute force
Trying every column permutation is factorial.
Checking every rectangle and then searching for a useful rearrangement repeats the same height information.

## Approach
1. Process rows from top to bottom.
2. Increase a column height for a one and reset it for a zero.
3. Sort the current heights in descending order.
4. For each prefix width, multiply its last height by that width.
5. Keep the largest area.

## Walkthrough
For Example 1, `matrix = [[0,0,1],[1,1,1],[1,0,1]]`.
After the last row, heights are `[2,0,3]`, which sort to `[3,2,0]`.
The width-two prefix supports height 2, giving area 4, and the complete row scan records that best area.
The scan checks all row states and returns 4.

## Complexity
Updating heights costs O(RC), and sorting each row costs O(R C log C).
The height and sorted arrays use O(C) auxiliary space.

## Edge cases
An all-zero row contributes no area.
A one-row input returns its count of ones.

## Common mistakes
Sort current heights rather than independently moving original columns.
Use the last height of each sorted prefix as its limiting height.
Reset after zeros.

## Language notes
Python uses a sorted copy for each row.
Java clones and sorts the height array.
