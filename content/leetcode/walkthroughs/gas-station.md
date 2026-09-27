## Intuition

A complete circuit is possible only when total gas covers total cost.
If the running tank becomes negative after station i, no station from the current start through i can be a valid start.
The next station is the next candidate that has not been ruled out, and the scan can continue once with an empty tank.

## Brute force

Trying every station and simulating a full circuit takes O(n²) time.
The running-balance argument eliminates all starts proven impossible by one failed segment.

## Approach

1. Track total_balance for the whole route and tank_balance from start_station.
2. Add gas minus cost at each station to both balances.
3. When tank_balance is negative, set start_station to the following station and reset tank_balance.
4. After the scan, return start_station only when total_balance is nonnegative.
5. Otherwise return -1.

## Walkthrough

Example 1 uses gas = [1, 2, 3, 4, 5] and cost = [3, 4, 5, 1, 2].

| station | balance | tank_balance | start_station |
| --- | --- | --- | --- |
| 0 | -2 | -2, reset | 1 |
| 1 | -2 | -2, reset | 2 |
| 2 | -2 | -2, reset | 3 |
| 3 | 3 | 3 | 3 |
| 4 | 3 | 6 | 3 |

The total balance is zero, so station 3 completes the circuit.

## Complexity

- Time: O(n), for one pass through both arrays.
- Space: O(1), for three integer variables.

## Edge cases

A single station returns its index when its gas covers its cost.
A route with negative total balance is impossible regardless of the chosen start.
Zero balances can preserve a valid candidate.
The segment elimination proof and nonnegative total balance establish that the surviving candidate completes the circuit.

## Common mistakes

- Returning the first station whose local balance is positive ignores future deficits.
- Keeping the old tank after a failure lets an invalid prefix influence the next candidate.
- Checking only total gas misses the required start index.
- Simulating each candidate loses the linear-time proof.

## Language notes

Python uses zip to read matching stations.
Java indexes both arrays directly.
Both versions keep totals in int, which is safe under the stated maximum sums.
