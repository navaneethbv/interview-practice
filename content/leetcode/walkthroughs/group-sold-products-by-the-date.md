## Intuition

Deduplicate (date, product) pairs and sort them first; then each date's group is already in the order the product list needs.

## Approach

1. Select distinct `(sell_date, product)` ordered by date and product.
2. Group by `sell_date`.
3. Count products and join names with `GROUP_CONCAT(product, ',')`.
4. Order by `sell_date`.

## Walkthrough

In Example 1, 2020-05-30 has Basketball, Headphone and T-Shirt. 2020-06-02 sold Mask twice, which counts once.

## Complexity

- Time: O(N log N) to sort N rows.
- Space: proportional to the result and any grouping state.

## Edge cases

- Duplicate sales of a product on one day count once.
- Product names must be sorted, not left in insertion order.

## Common mistakes

- `GROUP_CONCAT(DISTINCT product)` has no guaranteed order.
- Counting rows instead of distinct products.

## SQLite notes

SQLite 3.44 added `ORDER BY` inside aggregates; sorting in a subquery works on older versions too.
