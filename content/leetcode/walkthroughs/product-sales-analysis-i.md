## Intuition

Every sale needs the name of its product, which lives in another table, so this is an inner join on `product_id`.

## Approach

1. Join Sales to Product on `product_id`.
2. Select `product_name`, `year` and `price` for every sale row.

## Walkthrough

Example 1 has three sales of products 100 and 200. Each sale picks up Nokia or Apple. Samsung never appears in Sales, so the inner join drops it.

## Complexity

- Time: O(S + P) with a hash or index join on `product_id`; result size equals the number of sales.
- Space: proportional to the result and any grouping state.

## Edge cases

- A product with no sales does not appear.
- Several sales of one product appear once each.
- No sales means no rows.

## Common mistakes

- Using a LEFT JOIN from Product adds products without sales and null years.
- Grouping or deduplicating rows that should all be reported.

## SQLite notes

A plain `JOIN ... ON` is an inner join in SQLite.
