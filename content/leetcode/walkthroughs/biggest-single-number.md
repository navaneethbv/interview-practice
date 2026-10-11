## Intuition

First find the numbers that appear exactly once, then take the largest. Aggregating over an empty set yields null, which matches the required answer when nothing qualifies.

## Approach

1. Group MyNumbers by `num` and keep groups with `COUNT(*) = 1`.
2. Select `MAX(num)` over that subquery.

## Walkthrough

In Example 1, 8 and 3 appear twice; 1, 4, 5 and 6 appear once, so the answer is 6. In Example 2 every number repeats, so `MAX` over no rows returns null.

## Complexity

- Time: O(N log N) to group N rows.
- Space: proportional to the result and any grouping state.

## Edge cases

- An empty table returns one row containing null.
- Negative numbers are allowed.
- A number appearing three times is not single.

## Common mistakes

- `SELECT num ... ORDER BY num DESC LIMIT 1` returns no row instead of a null row when nothing qualifies.
- Filtering with `COUNT(*) < 2` after a join that duplicates rows.

## SQLite notes

An aggregate query without `GROUP BY` always returns exactly one row in SQLite.
