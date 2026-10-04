## Intuition

A single five-sale boost can repair days with 5 through 9 sales, but cannot repair days below 5.
An unrepairable day acts as a barrier that no valid good-day window can cross.

## Brute force

Enumerating every interval and checking whether it can be repaired costs at least quadratic time.
The reference instead assigns each day a nonnegative cost and uses a sliding window.

## Approach

`_boost_cost` returns zero for already-good days, one for repairable days, and `blocked_cost = len(sales) + 1` for barriers.
Because k is at most the array length, a barrier alone always exceeds the budget.
Add each arriving day's cost, then remove days from the left while `cost > k`.
Once feasible, update `best` with the current length.
The large barrier cost forces the left boundary past every impossible day without needing a separate reset branch.
Nonnegative contributions ensure that shrinking eventually restores feasibility.

## Walkthrough

```text
Input: sales = [10, 5, 8], k = 1
Output: 2
```

Example 1 has daily costs `[0, 1, 1]` and budget 1.
The first two days form a feasible window of length 2.
Adding the final day raises the cost to 2.
Removing the first day removes zero cost, so shrinking continues and removes the middle day too.
The final feasible suffix has length 1, leaving the recorded best length at 2.

## Complexity

Each endpoint advances at most n times, giving O(n) time.
The cost mapping is computed as needed and uses O(1) extra space.

## Edge cases

A day with 4 sales is impossible even if unused boosts remain, because each day may be boosted only once.
A day with 5 sales is repairable.
An empty array returns zero.

## Common mistakes

Counting every bad day as cost one incorrectly allows impossible repairs.
Using k rather than a strictly larger value for barrier cost would admit barriers.

## Language notes

Python factors the cost calculation into a helper.
Java uses equivalent conditional expressions and a `long` running total for accumulated barrier costs.
