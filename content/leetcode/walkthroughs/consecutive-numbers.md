## Intuition

Because log ids are consecutive integers, a three-row self-join can represent three successive ids directly.
Matching the `num` values across the three aliases identifies every qualifying run, and `DISTINCT` reports a number once.

## Brute force

A procedural scan could sort logs and track the current run length.
The SQL join expresses the same adjacency rule without relying on physical table order.

## Approach

1. Use aliases `a`, `b`, and `c` for the first, second, and third log rows.
2. Join `b.id = a.id + 1` and `c.id = a.id + 2`.
3. Require all three `num` values to be equal.
4. Select `DISTINCT a.num` under the required alias.

## Walkthrough

For Example 1, rows with ids 1, 2, and 3 all contain `4`.
The joins align them as `a`, `b`, and `c`, and all equality predicates pass.
The query returns one distinct row containing `4`.

## Complexity

Join cost depends on indexes and SQLite's plan, with up to three log scans or indexed lookups.
`DISTINCT` may use temporary storage proportional to qualifying numbers, and no output order is guaranteed.

## Edge cases

A number with more than three consecutive rows still appears once because of `DISTINCT`.
Separated ids or a changed value break the equality or adjacency predicates and produce no row.

## Common mistakes

- Joining on physical row order instead of ids makes the query depend on storage order.
- Selecting without `DISTINCT` repeats numbers with multiple qualifying windows.
- Checking only two rows finds pairs rather than the required triples.

## SQLite notes

The integer id arithmetic and equality joins use standard SQLite expressions.
The spec compares rows as unordered, so the query intentionally has no `ORDER BY`.
