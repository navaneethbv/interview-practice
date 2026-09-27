# Customer Who Visited but Did Not Make Any Transactions

Count visits without any transaction for each customer who has at least one such visit.
A visit with multiple transactions still counts as a visit with transactions and is excluded.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `customer_id`, `count_no_trans`; row order is unrestricted.

## Tables

### Visits

| Column | SQLite type |
| --- | --- |
| visit_id | INTEGER |
| customer_id | INTEGER |

### Transactions

| Column | SQLite type |
| --- | --- |
| transaction_id | INTEGER |
| visit_id | INTEGER |
| amount | INTEGER |

## Constraints

- Visit ids and transaction ids are unique in their respective tables.
- Transactions reference existing visits; amounts are nonnegative integers.

## Examples

### Example 1

```text
Input: {"tables": {"Visits": [[1, 5], [2, 5], [3, 7]], "Transactions": [[1, 1, 10]]}}
Output: [[5, 1], [7, 1]]
Explanation: Visits 2 and 3 have no transactions.
```

### Example 2

```text
Input: {"tables": {"Visits": [[1, 5]], "Transactions": [[1, 1, 0]]}}
Output: []
Explanation: A zero-amount transaction is still a transaction.
```
