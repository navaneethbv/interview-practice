## Intuition

An average sale price must weight each sale by the number of units purchased.
The applicable price depends on both product identity and purchase date.
Starting from Prices with a left join also preserves products that have no sales.

## Brute force

For each price interval, scan all purchases, accumulate matching revenue and units, and then combine totals per product.
This can require O(PU) comparisons for P price intervals and U purchase rows.
The query expresses the same matching and aggregation in SQL so the database can choose its execution plan.

## Approach

1. Use Prices as `p` and left join UnitsSold as `u`.
2. Match product ids and require the purchase date to fall between the interval's start and end, inclusively.
3. Group joined rows by product id.
4. Sum `1.0 * p.price * u.units` to calculate floating-point revenue.
5. Divide by the summed units, round to two places, and use COALESCE to replace a missing average with zero.

The nonoverlapping price intervals ensure each purchase matches exactly one price row.
Duplicate purchase rows remain separate sales and must retain their full contribution.

## Walkthrough

Example 1 prices product one at ten through January 10 and twenty starting January 11.

| Purchase date | Units | Matched price | Revenue |
| --- | ---: | ---: | ---: |
| January 10 | 3 | 10 | 30 |
| January 11 | 1 | 20 | 20 |

The joined revenue sums to fifty and the unit count sums to four.
The query computes `50.0 / 4 = 12.5`, yielding the row `[1,12.5]`.
An unweighted mean of the two price values would incorrectly produce fifteen.

## Complexity

Without assuming indexes, a nested-loop join can take O(PU) work.
Let J be the number of joined rows; grouping with sorting adds O(J log(J + 1)) work and O(J) workspace.
Here J is at most P + U because intervals do not overlap.
Actual costs depend on SQLite's selected join and grouping plan.

## Edge cases

An unsold product survives the left join and receives zero.
Purchases on either interval endpoint are included.
Multiple price intervals for one product combine into one output row.
Empty Prices produces no rows.

## Common mistakes

- Taking AVG(price) ignores the number of units.
- Putting the date condition in WHERE removes unsold products.
- Removing duplicate purchases changes their total weight.
- Rounding individual purchases before aggregation can change the final average.

## SQLite notes

Multiplying by 1.0 before division prevents integer division.
Unmatched purchase fields are NULL, so their sums remain NULL when no sales exist; COALESCE then supplies zero.
ISO date text sorts chronologically, making the inclusive BETWEEN comparison appropriate.
No ORDER BY is needed because result order is unrestricted.
