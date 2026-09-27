# Optimal Account Balancing

Each transaction `[from,to,amount]` records money already transferred from one person to another.
Settle the resulting net balances using the fewest additional transfers between any people.
Only each person's net balance matters, and transfer amounts may be any positive value.

## Constraints

- There are 1 to 8 transactions.
- Person ids range from 0 to 11; transfer amounts are positive integers.
- Sender and receiver differ.

## Examples

### Example 1

```text
Input: transactions = [[0, 1, 5], [0, 2, 5]]
Output: 2
Explanation: Two people each owe a nonzero balance to person 0.
```

### Example 2

```text
Input: transactions = [[0, 1, 5], [1, 0, 5]]
Output: 0
Explanation: The transfers cancel completely.
```
