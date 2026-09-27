## Intuition

Only the earliest order date for each customer participates in the percentage.
The correlated `MIN(order_date)` subquery identifies that row set, and SQLite's boolean comparison supplies one for an immediate order and zero otherwise.

## Brute force

One approach could materialize earliest rows in application code and count immediate dates there.
That requires moving all candidate rows out of SQLite and makes the aggregate contract harder to preserve.

## Approach

1. For each delivery row, find the minimum order date for its `customer_id`.
2. Keep rows whose order date equals that per-customer minimum.
3. Average the boolean equality between order and preferred dates.
4. Multiply by 100 and round to two decimal places as `immediate_percentage`.

## Walkthrough

For Example 1, customer 1's earliest order is on January 1 and is immediate.
Customer 2's earliest order is also January 1, but its preferred date is January 2, so it is not immediate.
The average of one true and one false is 0.5, producing `50.0` after multiplying and rounding.

## Complexity

The correlated subquery and aggregate have plan-dependent cost, commonly `O(d^2)` without an index on customer and date.
SQLite may use temporary or indexed storage for grouping and the aggregate, so physical memory depends on the query plan.

## Edge cases

The constraints guarantee one unique earliest order per customer, avoiding duplicate contributions from tied dates.
At least one customer exists, so the aggregate has a denominator.

## Common mistakes

- Choosing the smallest `delivery_id` instead of the earliest `order_date` violates the statement.
- Averaging all deliveries includes later orders in the denominator.
- Comparing dates as non-ISO text would be unsafe, but the local ISO format sorts chronologically.

## SQLite notes

SQLite treats a true comparison as 1 and a false comparison as 0 in `AVG`.
`ROUND` returns the requested two-decimal numeric result, and no output order is promised.
