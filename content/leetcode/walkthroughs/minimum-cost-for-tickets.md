## Intuition

For each calendar day, the cheapest plan either carries forward yesterday's cost or buys a pass when travel occurs that day.
A pass of duration `d` leaves the optimal cost through day `day - d` as its predecessor.

## Brute force

Trying every pass choice at every travel day recursively creates repeated subproblems.
The calendar is only days 1 through 365, so a one-dimensional DP table stores each prefix result once.

## Approach

1. Put travel days in `travel_days` for constant membership checks.
2. For each day, copy the previous cost when there is no travel.
3. On a travel day, minimize the three options using durations 1, 7, and 30.
4. Return the cost through day 365, which includes every listed travel day.

## Walkthrough

For Example 1, travel occurs on days 1 through 7 and costs are `[2, 7, 20]`.
At day 1, the daily pass costs 2, the weekly option costs 7, and the monthly option costs 20, so the best is 2.
The weekly pass option becomes 7 for day 7, covering all seven days at once.
The final minimum is `7`.

## Complexity

The fixed calendar loop takes `O(365 * 3)`, which is `O(1)` under the stated day bound.
The DP array and travel-day set use `O(365)` space.

## Edge cases

Nontravel days inherit the previous cost and never force a purchase.
Sparse days such as `[1, 40]` can favor separate daily passes over a longer pass.

## Common mistakes

- Charging a pass on every day instead of only travel days overpays.
- Using `day - duration + 1` with this DP changes the meaning of the predecessor index.
- Returning the cost on the last travel day without considering later array days is safe only if that index is handled deliberately.

## Language notes

Python uses a set and a generator for the three options, while Java uses a boolean day array and an explicit duration loop.
Both references exploit the maximum travel day of 365 from the local statement.
