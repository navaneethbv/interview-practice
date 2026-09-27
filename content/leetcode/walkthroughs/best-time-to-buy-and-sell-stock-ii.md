## Intuition

Every profitable upward step can be treated as a completed trade from one day to the next.
If a price rises from `2` to `5`, buying at 2 and selling at 5 earns the same profit as holding through every intermediate day.
Splitting a longer rise into daily rises therefore does not reduce the profit.
Every downward step should be skipped because buying before it or selling into it cannot improve a maximum.

## Brute force

A direct search could decide on every day whether to hold, sell, or buy after selling.
Those choices create exponentially many trading histories, even though many histories have the same day and holding state.
Keeping all histories also wastes work on decisions that differ only in when a flat trade is recorded.
The greedy sum removes this repeated state exploration.

## Approach

1. Scan adjacent prices from left to right.
2. For each day, compute `price_change` from the previous price.
3. Add that change to `total_profit` only when it is positive.
4. This is equivalent to buying at the start of every rising run and selling at its end.
5. It also allows a new purchase immediately after a sale, so the at-most-one-share rule is respected.

## Walkthrough

For Example 1, the prices are `[2, 5, 1, 4]`.
The change from 2 to 5 is 3, so `total_profit` becomes 3.
The change from 5 to 1 is negative, so it contributes nothing.
The change from 1 to 4 is 3, so `total_profit` becomes 6.
The two rising steps represent the trades 2 to 5 and 1 to 4.
For Example 2, each adjacent change is negative, so the result remains 0.

## Complexity

The scan takes O(n) time for n prices.
The algorithm uses O(1) extra space besides the input and returns an integer profit.
Python integer storage grows with the value, while the stated constraints keep the result within the Java `int` return range.

## Edge cases

A one-day input has no adjacent pair and returns 0.
Equal prices produce a zero change and do not create a trade.
An entirely decreasing sequence returns 0.
Several rising and falling runs are handled independently.

## Common mistakes

Do not add negative changes, since that forces an unprofitable transaction.
Do not require a gap between transactions, because selling one share and buying another on the next day is allowed.
Do not use the single-transaction minimum-price method, because it misses multiple profitable runs.

## Language notes

The Python reference updates `total_profit` with named loop variables.
The Java reference uses the same adjacent-difference logic and keeps the judge-required `maxProfit` signature.
Neither implementation mutates `prices`.
