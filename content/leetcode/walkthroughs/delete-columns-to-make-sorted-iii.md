## Intuition

A retained column can follow another retained column only when every row is nondecreasing between those two positions.
This creates a longest increasing subsequence over columns, where the comparison is checked across all strings.

## Brute force

Trying every retained column subset is exponential in the string width.
The dynamic program records the best valid retained sequence ending at each column.

## Approach

1. Initialize `longest[column]` to one for every possible final column.
2. For each pair `left < right`, test `strs[row][left] <= strs[row][right]` for every row.
3. If valid, extend the best sequence ending at `left` into `right`.
4. Delete all columns outside the longest retained sequence.

## Walkthrough

This is Example 1 from the local statement.
For `['babca','bbazb']`, the per-column best lengths become `[1,1,1,2,2]` as each candidate predecessor is checked across both rows.
Keeping columns 1 and 4 gives `aa` and `bb`, so two columns can be retained even though the other three cannot be inserted without decreasing one row.
Since the strings have five columns, the minimum deletion count is `5 - 2 = 3`.

## Complexity

There are O(m²) column pairs and each pair checks r rows, giving O(m²r) time.
The `longest` array uses O(m) auxiliary space.

## Edge cases

One column is always a valid retained sequence.
Already nondecreasing rows keep every column.
Equal characters between columns are allowed because the target order is nondecreasing.

## Common mistakes

Check the column relation across every row, not just the first string.
Use `<=`, not `<`, for equal characters.
Return width minus the longest retained sequence, not the number of failed pairs.

## Language notes

Python uses a nested `all` check, while Java exits its row loop when a violation is found.
Both references use O(m) dynamic-programming storage and preserve the original strings.
