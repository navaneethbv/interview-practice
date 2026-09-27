## Intuition

The original transfers can be compressed into one net balance per person.
People with zero net balance disappear, and the remaining positive and negative balances must be paired with transfers.
Backtracking settles one unresolved balance at a time while skipping equivalent choices.

## Brute force

A brute force search could choose arbitrary sender, receiver, and amount sequences.
That includes many transactions that undo each other and has no useful bound on the number of steps.

## Approach

1. Subtract each transaction amount from its sender and add it to its receiver.
2. Keep only nonzero balances in `debts`.
3. In `_settle`, skip zeros and select the first unresolved balance.
4. Try pairing it with each opposite-signed balance, recursively solving the remainder.
5. Restore the changed balance after each branch, skip duplicate balances, and stop after an exact cancellation.

## Walkthrough

For Example 1, transactions `[[0, 1, 5], [0, 2, 5]]` produce balances person 0 = `-10`, person 1 = `5`, and person 2 = `5`.
The first debt is `-10`.
Pairing it with person 1 leaves `-5` and `5`, which needs one more transfer.
Pairing it with person 2 is symmetric and also needs one more transfer.
Thus the best result is two transfers.

## Complexity

Balance construction is `O(t)` time for `t` transactions and `O(p)` space for people.
The settlement search is exponential in the number of nonzero balances in the worst case, while recursion and per-frame tried-balance sets use `O(p^2)` auxiliary space.

## Edge cases

Transactions that cancel leave no debts and return zero.
Negative or positive net balances are both valid, and an exact opposite pair can be settled in one transfer.

## Common mistakes

- Optimizing the original transaction list instead of net balances creates irrelevant state.
- Pairing balances with the same sign cannot settle the selected debt.
- Forgetting to restore a trial balance corrupts sibling backtracking branches.

## Language notes

Python's `defaultdict` simplifies balance accumulation, while Java uses `getOrDefault` and a mutable `List<Integer>`.
Java compares products after widening to `long` so large balances cannot overflow during the sign check.
