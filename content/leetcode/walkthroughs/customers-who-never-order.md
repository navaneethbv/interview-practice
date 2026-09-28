## Intuition

A customer qualifies when no order joins to that customer's id.
A left join preserves every customer, and the null joined key identifies the unmatched rows.

## Brute force

A `NOT IN` subquery could exclude customer ids appearing in `Orders`.
The left join makes the absence test explicit and avoids null behavior surprises in a general schema.

## Approach

1. Start with every row in `Customers` as alias `c`.
2. Left join `Orders` alias `o` on `o.customerId = c.id`.
3. Keep rows where `o.customerId IS NULL`.
4. Return the customer name with the `Customers` alias.

## Walkthrough

For Example 1, Ana has an order with customer id 1, so her joined order key is non-null.
Bo has no matching order, so the left join fills the order columns with null.
The null filter returns only `Bo`.

## Complexity

Join and filtering cost depend on indexes and the SQLite query plan: indexed nested-loop lookups can be near linear in customers, while scan-based nested loops can approach the product of table sizes.
The join may use temporary or indexed structures proportional to the participating rows.

## Edge cases

An empty `Orders` table leaves every customer unmatched and therefore eligible.
Customer names may repeat, but each qualifying customer row is retained because the query does not use `DISTINCT`.

## Common mistakes

- An inner join removes customers with no orders before they can be selected.
- Filtering `o.id = NULL` never succeeds; SQL requires `IS NULL`.
- Using an order count without grouping can return duplicate or aggregated rows instead of names.

## SQLite notes

`LEFT JOIN` and `IS NULL` are standard SQLite behavior for this anti-join pattern.
The result is unordered under the local spec, so no sort is added.
