## Intuition

Each name is transformed independently: uppercase the first character and lowercase the remainder.
SQLite's `substr` preserves the two pieces, while concatenation joins them.

## Brute force

A client could fetch every row and normalize names outside SQL, but that adds a data-transfer and application-processing step.
The query performs the transformation directly in the database.

## Approach

1. Extract position one with `substr(name, 1, 1)` and apply `upper`.
2. Extract the remainder starting at position two and apply `lower`.
3. Concatenate the pieces as the projected `name` column.
4. Order by `user_id` ascending as required by the exact comparison.

## Walkthrough

For Example 1, row 2 has `bOB`, which becomes `B` plus `ob`, or `Bob`.
Row 1 has `aNA`, which becomes `A` plus `na`, or `Ana`.
Ordering by user id returns `[1, "Ana"]` followed by `[2, "Bob"]`.

## Complexity

The query processes each user name with work proportional to its character length, then sorts by `user_id`, with plan-dependent time that may include `O(u log u)` sorting.
It uses result or temporary sort storage proportional to the rows and transformed text.

## Edge cases

A one-character name has an empty remainder, and SQLite concatenates the uppercase first character with that empty string.
The ASCII input constraint makes SQLite's built-in case functions sufficient.

## Common mistakes

- Lowercasing the whole name loses the required uppercase first character.
- Starting the remainder at position one repeats the first character.
- Omitting `ORDER BY user_id` violates the exact row order contract.

## SQLite notes

SQLite `substr` uses one-based positions, matching the query's positions 1 and 2.
This uses SQLite `upper`, `lower`, and `||`, rather than MySQL-specific functions or syntax.
