## Intuition
At each price, either hold a stock or hold cash.
The best state for today comes from keeping yesterday's state or completing the other action today.

## Brute force
Enumerating every buy and sell pair takes O(n^2) time and choosing compatible repeated transactions requires extra bookkeeping.
Dynamic programming compresses all profitable histories into two state values.

## Approach
1. Initialize cash to zero and holding to the cost of buying the first price.
2. For each later price, save the old cash value.
3. Update cash by either keeping cash or selling the held stock after the fee.
4. Update holding by either keeping the stock or buying at today's price from old cash.

## Walkthrough
Example 1 has prices `[1, 5, 2, 8]` and fee 2.
After price 1, cash is 0 and holding is -1.
At price 5, selling gives 2, so cash becomes 2, while holding stays -1.
At price 2, cash remains 2, and buying from that cash changes holding to 0.
At price 8, selling the held state gives 6, so cash becomes 6.
The method returns 6.

## Complexity
The scan takes O(n) time and O(1) auxiliary space.
Both references index the original prices and use O(1) auxiliary storage.

## Edge cases
One price cannot produce profit.
A fee equal to a gain can make a sale unprofitable.
Transactions cannot overlap because the holding state represents one stock.

## Common mistakes
Updating holding from already updated cash can buy and sell at the same price incorrectly.
Charging the fee on purchase instead of sale changes the state invariant.
Allowing multiple simultaneous holdings violates the contract.

## Language notes
Python integers are unbounded.
Java uses `int` states under the local result bounds and saves previous cash before updating.
