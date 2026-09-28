## Intuition
Each product has its own earliest sale year, and every sale in that year must remain in the result.
A correlated minimum query compares a row with all rows for the same product.
Because the SQL result is unordered, no final ordering clause is required by the contract.

## Brute force
One could first compute a grouped minimum year and then join that result back to `Sales`.
That is often clearer for large datasets, but it still requires the same grouping and matching work.
The correlated query keeps the relationship in one statement and preserves duplicate first-year rows.

## Approach
1. Treat the outer row as candidate sale `s`.
2. In a subquery, compute `MIN(year)` over rows `t` with the same `product_id`.
3. Keep `s` only when its year equals that minimum.
4. Project the product, matching year as `first_year`, quantity, and price.

## Walkthrough
Example 1 has product 10 sales in 2020, 2021, and another 2020 row.
For each product 10 outer row, the subquery returns 2020.
Both 2020 rows satisfy the equality and are returned, while the 2021 row is filtered out.
The output therefore keeps quantities 2 and 4 as separate records.

## Complexity
The logical query performs a minimum lookup for each outer sale, with cost depending on the SQLite query plan and available indexes.
The result stores one row for every sale in a product's earliest year.
SQLite may optimize the correlated subquery, so no fixed hash-join guarantee is made.

## Edge cases
An empty `Sales` table returns no rows.
Multiple first-year sales remain separate because the filter is row-based.
Products with one sale return that sale as their first year.

## Common mistakes
Grouping only by product and selecting arbitrary quantity or price loses duplicate first-year rows.
Using `MIN(year)` across all products mixes independent product histories.
Adding an unnecessary order claim is wrong because the spec compares rows unordered.

## SQLite notes
`MIN` and the correlated equality use standard SQLite syntax.
The alias `first_year` is required by the result contract.
SQLite does not guarantee row order without `ORDER BY`, which is intentionally omitted here.
