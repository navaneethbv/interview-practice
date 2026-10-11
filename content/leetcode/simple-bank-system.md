# Simple Bank System

Accounts are numbered from 1 to `n`; account `i` starts with `balance[i - 1]`.
`transfer(account1, account2, money)`, `deposit(account, money)` and `withdraw(account, money)` return `true` and apply the change when it is valid.
An operation is invalid, and changes nothing, when an account number is outside 1 to `n` or when the source account has less than `money`.

Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- 1 <= n <= 10^5 and balances fit in a 64-bit integer.
- Transferring to the same account is valid when the account exists and has enough money.

## Examples

### Example 1

```text
Input: ctor = [[10, 100, 20, 50, 30]], ops = ["withdraw", "transfer", "deposit", "transfer", "withdraw"], args = [[3, 10], [5, 1, 20], [5, 20], [3, 4, 15], [10, 50]]
Output: [true, true, true, false, false]
Explanation: Account 3 has only 10 left when asked to transfer 15, and account 10 does not exist.
```

### Example 2

```text
Input: ctor = [[5]], ops = ["transfer", "withdraw", "withdraw"], args = [[1, 1, 5], [1, 5], [1, 1]]
Output: [true, true, false]
Explanation: A self-transfer leaves the balance unchanged.
```
