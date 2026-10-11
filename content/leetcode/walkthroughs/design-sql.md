## Intuition

Each table is a map from row id to row, plus an auto-increment counter. Using a map rather than a list means deleting a row does not shift the ids of later rows.

## Approach

1. Create an empty map and a counter starting at 1 for each table.
2. `insertRow` stores the row under the counter's value and increments it.
3. `deleteRow` removes the id from the map.
4. `selectCell` reads `row[columnId - 1]`.

## Walkthrough

In Example 1, table two gets row 1 and then row 2. Deleting row 1 leaves row 2 with id 2, and its second column is fifth.

## Complexity

- Time: O(row length) per insert, O(1) otherwise.
- Space: O(total cells).

## Edge cases

- Ids are per table.
- Deleted ids stay unused, like auto-increment keys in real databases.

## Common mistakes

- Storing rows in a list and deleting by index, which renumbers later rows.
- Reusing the id of a deleted row.
