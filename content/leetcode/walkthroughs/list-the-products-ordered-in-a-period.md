## Intuition

Filter orders to February 2020, total units per product, and keep products with at least 100.

## Approach

1. Join Orders to Products.
2. Keep orders between '2020-02-01' and '2020-02-29'.
3. Group by product and keep `SUM(unit) >= 100`.

## Walkthrough

In Example 1, Leetcode Solutions sold 60 + 70 = 130 units in February and Leetcode Kit sold 50 + 50 = 100. Jewels of Stringology sold only 80 in February.

## Complexity

- Time: O(N log N) for N orders.
- Space: proportional to the result and any grouping state.

## Edge cases

- Exactly 100 units qualifies.
- 2020 is a leap year, so February ends on the 29th.

## Common mistakes

- Filtering on the total with `WHERE` instead of `HAVING`.
- Ending the range on 2020-02-28.

## SQLite notes

ISO date strings compare correctly as text in SQLite.
