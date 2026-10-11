## Intuition

A customer bought every product when the number of different products they bought equals the total number of products.

## Approach

1. Group Customer by `customer_id`.
2. Count `DISTINCT product_key` in each group.
3. Keep groups whose count equals `(SELECT COUNT(*) FROM Product)`.

## Walkthrough

In Example 1, customers 1 and 3 bought products 5 and 6; customer 2 bought only 6.

## Complexity

- Time: O(N log N) for N purchase rows.
- Space: proportional to the result and any grouping state.

## Edge cases

- Repeated purchases of one product count once.
- If Product has a single row, anyone who bought it qualifies.

## Common mistakes

- Counting purchases rather than distinct products lets duplicates satisfy the condition.

## SQLite notes

This is relational division expressed with counts; it relies on every purchase referencing an existing product.
