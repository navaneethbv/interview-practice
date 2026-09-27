## Intuition

For each transaction count, track the best profit after buying and after selling.
When transactions are plentiful, every positive day-to-day increase is equivalent to an unlimited-trade solution.

## Brute force

Trying every buy and sell interval for every transaction count creates exponential choices.
Dynamic programming preserves the best state for each completed transaction count.

## Approach

1. Use the unlimited-trade shortcut when k is at least half the number of days.
2. Otherwise update buy and sell states for each transaction count on every price.
3. Return the best state after at most k sales.

## Walkthrough

Example 1:

For k 2 and prices [1,4,2,6], buy at 1 and sell at 4 for profit 3.
Then buy at 2 and sell at 6 for profit 4.
The total best profit is 7.

## Complexity

The bounded dynamic program takes O(nk) time and O(k) space.
The unlimited shortcut takes O(n) time and O(1) extra space.
Python lists and Java arrays hold buy and sell states.

## Edge cases

Decreasing prices produce zero profit.
The in-place state update may allow a harmless zero-profit same-day transition, which does not create an invalid positive trade.
At most k completed transactions may be used.

## Common mistakes

Do not count a buy as a completed transaction.
Do not use the unlimited shortcut when k is small.
Use prior transaction sell state when opening a new buy state.

## Language notes

Python represents impossible buy states with negative infinity.
Java uses a safely low integer sentinel and includes an explicit unlimited-profit helper.
