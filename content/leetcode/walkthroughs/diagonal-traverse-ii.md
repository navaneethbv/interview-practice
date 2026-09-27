## Intuition

Ragged rows still share diagonals identified by row plus column.
Grouping values by that key collects all valid entries without assuming missing cells exist.
Within each group, later rows must appear first, so reversing each insertion-order list gives the required traversal.

## Brute force

Testing every possible row and column pair for each diagonal can waste work on missing positions.
Sorting all individual cell triples by diagonal and row also costs O(N log N).
Python groups the N existing entries once, then sorts only the distinct diagonal keys; Java maintains the keys in a `TreeMap` throughout insertion.

## Approach

1. Iterate every existing value with its row and column.
2. Append the value to the list keyed by row plus column.
3. Visit diagonal keys in increasing order.
4. Extend the result with each diagonal list in reverse row order.
5. Return the flattened result.

## Walkthrough

Example 1 uses nums = [[1,2,3],[4,5,6],[7,8,9]].

| diagonal key | insertion order by row | output contribution |
| ---: | --- | --- |
| 0 | [1] | [1] |
| 1 | [2,4] | [4,2] |
| 2 | [3,5,7] | [7,5,3] |
| 3 | [6,8] | [8,6] |
| 4 | [9] | [9] |

The result is [1,4,2,7,5,3,8,6,9].

## Complexity

Let N be the total number of entries and D the number of diagonal keys.
Python grouping and output take O(N) expected time, and sorting keys adds O(D log D).
Java performs a `TreeMap` lookup per value, giving O(N log(D + 1)) time before linear output traversal.
The map and lists use O(N) space, while result is another O(N) output allocation.

## Edge cases

A one-value row contributes normally even when neighboring rows have different lengths.
A single row keeps its original order because each diagonal has one value.
Rows with different lengths simply omit nonexistent coordinates.
The first diagonal contains the top-left value; in a ragged input, the last diagonal can contain several values.

## Common mistakes

- Assuming all rows have equal length causes invalid indexing.
- Sorting values within a diagonal by value changes the required row order.
- Traversing diagonals in decreasing key order reverses the groups.
- Forgetting to reverse each group lists entries from top to bottom.

## Language notes

Python uses defaultdict lists and sorted diagonal keys.
Java uses TreeMap to maintain diagonal order while storing ArrayList groups.
Both preserve insertion order within each group before reversing it during output.
