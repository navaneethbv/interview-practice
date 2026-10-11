## Intuition

Each operation either fully succeeds or does nothing. Checking every precondition first and only then mutating makes that atomic without any rollback.

## Approach

1. Store balances in an array indexed by account - 1.
2. An account is valid when it is between 1 and n.
3. For a transfer or withdrawal, also require enough money in the source.
4. If all checks pass, apply the change and return true; otherwise return false.

## Walkthrough

In Example 1, account 3 withdraws 10 and has 10 left. Account 5 transfers 20 to account 1, then receives a deposit of 20. Account 3 cannot transfer 15, and account 10 does not exist.

## Complexity

- Time: O(1) per call.
- Space: O(n).

## Edge cases

- Zero amounts are valid.
- Self-transfers succeed and leave the balance unchanged.
- Amounts need 64-bit integers.

## Common mistakes

- Subtracting from the source before validating the destination.
- Using 32-bit integers for balances.
