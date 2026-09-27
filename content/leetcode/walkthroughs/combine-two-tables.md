## Intuition

Every row in `Person` must survive, even when `Address` contains no matching row.
A left outer join expresses exactly that requirement: matching addresses contribute their fields, and unmatched people receive NULL address fields.
The result can contain multiple rows for a person because the statement permits multiple addresses.

## Approach

1. Use the left join pattern with `Person` as the left table, aliased as `p`.
2. Join `Address`, aliased as `a`, on equality of the two `personId` columns.
3. Project `p.firstName`, `p.lastName`, `a.city`, and `a.state` in the required order.
4. Keep all joined rows, with no deduplication or ordering requirement.

The join condition connects people by their identifier, rather than by names that might be shared.
An address with no corresponding person contributes no row because the preserved side is `Person`.
This problem is a direct join exercise, so no separate brute-force implementation is needed.

## Walkthrough

In Example 1, `Person` contains `[1, "Park", "Mina"]` and `[2, "Lee", "Jae"]`.
The only address is `[5, 2, "Seattle", "WA"]`, whose `personId` is 2.

| Person examined | Matching address | Output row |
| --- | --- | --- |
| Mina Park, ID 1 | None | `["Mina", "Park", null, null]` |
| Jae Lee, ID 2 | Address ID 5 | `["Jae", "Lee", "Seattle", "WA"]` |

Mina remains in the output even though the right table has no matching identifier.
Jae receives the city and state from the matching address.
The order shown is illustrative; SQL does not guarantee this order without `ORDER BY`.

## Complexity

Let P be the number of people, A the number of addresses, and R the number of output rows.

- Time: query-plan dependent; a nested scan without an index can take O(P × A + P + R), while an index on `Address.personId` supports roughly O(P log(A + 1) + R) probes after index construction.
- Space: O(R) to materialize the returned rows in this judge, plus query-plan storage; a temporary lookup index can require O(A) additional space.

The supplied query does not declare an index, so a fixed linear-time claim would not be justified.
SQLite may choose an automatic index, whose construction also has a cost.

## Edge cases

An empty `Person` table produces an empty result.
An empty `Address` table produces one row per person with NULL city and state.
Multiple matching addresses produce multiple rows, including repeated projected values if different addresses share the same text.

## Common mistakes

- Using an inner join drops people without addresses.
- Adding a right-table filter in `WHERE` can discard the NULL-extended rows.
- Using `DISTINCT` can incorrectly collapse legitimate address rows.

## SQLite notes

SQLite supports `LEFT JOIN` directly with the same essential semantics used here in MySQL.
Use SQL NULL, not the string `'null'`, for missing data; the judge serializes SQL NULL as JSON `null`.
To test NULL in a predicate, use `IS NULL`, because equality with NULL does not evaluate to true.
No window functions or dialect-specific date functions are needed for this query.
