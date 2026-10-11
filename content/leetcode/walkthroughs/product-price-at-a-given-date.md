## Intuition

A product's price on a date is its most recent change on or before that date, or the starting price 10 if there was none.

## Approach

1. List every distinct product.
2. For each, select the `new_price` of the latest change with `change_date <= '2019-08-16'`.
3. Default to 10 with `COALESCE`.

## Walkthrough

In Example 1, product 1 changed to 35 on 2019-08-16, which applies. Product 2's last change before the date set 50. Product 3 first changed on 2019-08-18, so it still costs 10.

## Complexity

- Time: O(P · C) with the correlated subquery, or O(N log N) with an index on (product_id, change_date).
- Space: proportional to the result and any grouping state.

## Edge cases

- A change on the date itself applies.
- A product whose only change is later keeps price 10.

## Common mistakes

- Taking the maximum price instead of the price of the latest change.
- Forgetting products with no qualifying change.

## SQLite notes

`ORDER BY change_date DESC LIMIT 1` inside a scalar subquery picks the latest change; ISO dates sort correctly as text.
