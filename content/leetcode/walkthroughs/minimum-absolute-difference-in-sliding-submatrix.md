## Intuition
Duplicates do not form a pair of distinct values.
Once the distinct values in a window are sorted, the smallest difference is between adjacent values.

## Brute force
Comparing every pair in every window is quadratic in the window area.
A set and adjacent-gap scan are simpler and faster.

## Approach
1. Enumerate every window top-left corner.
2. Collect its values as a distinct set.
3. Sort the values or maintain them in a tree set.
4. Scan adjacent values for the smallest gap.
5. Return zero when fewer than two values exist.

## Walkthrough
For Example 1, the two-by-two window has distinct values `[2,5,9]`.
Its gaps are 3 and 4, so the result is `[[3]]`.
Every one-cell window in Example 2 has only one distinct value and returns zero.

## Complexity
There are W windows, each collecting O(k^2) values and sorting up to that many distinct values.
The direct time bound is O(W k^2 log(k^2)) and temporary space is O(k^2) for one window plus O(W) for the output matrix.

The output dimensions are `(rows-k+1) by (columns-k+1)`, matching the number of valid top-left positions.

## Edge cases
Repeated values are inserted once.
Negative values work because sorting still orders differences.

Sorting is applied independently to each window because neighboring windows can have different sets of distinct values.

## Common mistakes
Compare distinct values, not duplicate copies.
Map results to the correct top-left corner.
Return zero when there is no pair.

## Language notes
Python uses a set followed by sorting.
Java uses `TreeSet` to keep values distinct and ordered.
