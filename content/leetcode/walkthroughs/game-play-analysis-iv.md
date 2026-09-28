## Intuition

First find one earliest date per player.
A player qualifies when Activity contains a row exactly one calendar day after that date, regardless of device or games played.

## Brute force

Comparing every activity row with every other row repeats player scans.
A first-date grouping plus an existence check isolates one test per player.

## Approach

1. Group Activity by player and compute `MIN(event_date)`.
2. For each first date, test whether `date(first_date, '+1 day')` exists for that player.
3. Average the boolean results and round to two decimals.

## Walkthrough

For Example 1, player 1 first logs in on January 1 and also logs in January 2, so qualifies.
Player 2 has only January 1 and does not qualify.
The average of one true among two players is 0.5.

## Complexity

For A activity rows, grouping and the correlated existence checks depend on SQLite's query plan.
Without indexes SQLite may rescan Activity for each player, while an index or materialized grouping can reduce that work.
The aggregate and date expression use temporary state proportional to the number of players when required.

## Edge cases

Zero games still count as a login.
A later consecutive pair does not qualify unless it follows the first date.
Leap-day and year-boundary dates are handled by SQLite's date function.

## Common mistakes

Compare calendar dates, not timestamps or games played.
Use distinct players from the first-date grouping.
Divide by all players, not only qualifying players.

## SQLite notes

The local SQL uses a CTE and `EXISTS`; result row order is unrestricted.
