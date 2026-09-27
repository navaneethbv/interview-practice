## Intuition

The requested order can be represented by one sortable key per node: column, then row, then value.
Recording that key makes traversal order irrelevant.
Sorting the records and grouping equal columns handles both geometry and tie-breaking in one consistent rule.

## Brute force

For each possible column, scan the entire tree to collect matching nodes and then sort that column's entries.
A skewed tree has O(n) distinct columns, so repeated scans alone can cost O(n²).
One coordinate traversal followed by a global sort avoids rediscovering the same positions.

## Approach

1. Start an explicit stack with the root at row zero and column zero.
2. Record `(column,row,value)` for each popped node.
3. Push a left child at `(row + 1,column - 1)` and a right child at `(row + 1,column + 1)`.
4. Sort all `positions` lexicographically by column, row, and value.
5. Start a new result list whenever the sorted column changes, then append the node value.

Column is the first sort key because all values from one column must stay together.
Row comes before value so a deeper small value cannot precede a shallower large value.

## Walkthrough

Example 1 is `root = [3,9,20,null,null,15,7]`.

| Node value | Column | Row |
| --- | --- | --- |
| 3 | 0 | 0 |
| 9 | -1 | 1 |
| 20 | 1 | 1 |
| 15 | 0 | 2 |
| 7 | 2 | 2 |

Sorting gives the records for 9, 3, 15, 20, and 7 in that order.
Grouping by column yields `[[9],[3,15],[20],[7]]`.
Although stack traversal visits the right branch first, the final sort establishes the required order.

## Complexity

- Time: O(n log n), dominated by sorting n coordinate records.
- Space: O(n), for records, sorting support, traversal state, and returned columns.

## Edge cases

A single root produces one single-element column.
Nodes with identical row and column are sorted by value.
Duplicate values remain separate entries.
An unbalanced tree can have a negative or positive column range extending far from zero.

## Common mistakes

- Grouping by column without sorting rows can reverse depth order.
- Using BFS order alone misses the value tie-breaker at equal positions.
- Sorting by value before row violates the stated priority.

## Language notes

Python sorts tuples directly, while Java uses chained integer comparators over coordinate arrays.
Java's `Position` wrapper holds traversal state and references the original `TreeNode`.
Both use iterative traversal and allocate output values without changing the input tree.
