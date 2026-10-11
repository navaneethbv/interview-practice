## Prompt and scope

Users in a group record shared expenses and see who owes whom.
An expense has a payer, an amount and a split: equal, exact amounts or percentages.
Show each user's net balance and a short list of payments that settles the group.
Assume one currency and amounts in cents.
Reviewed October 11, 2026.

## Model and invariants

```text
Group(id, members)
Expense(id, group_id, payer, amount_cents, splits: list[Split], created_at)
Split(user, amount_cents)
BalanceSheet: user -> net cents (positive means the user is owed money)
```

The splits of an expense must sum exactly to its amount.
The net balances of a group always sum to zero.
Make split strategies separate classes behind one interface, because the rules for computing shares really do vary:

```python
class SplitStrategy:
    def shares(self, amount_cents, participants, params) -> dict[str, int]: ...

class EqualSplit(SplitStrategy):
    def shares(self, amount_cents, participants, params):
        base, extra = divmod(amount_cents, len(participants))
        # Give the leftover cents to the first participants so the total is exact.
        return {u: base + (1 if i < extra else 0) for i, u in enumerate(participants)}
```

## Operations and walkthrough

Adding an expense validates the split, stores it, and updates balances: the payer gains the amount, each participant loses their share.
Alice pays 100.00 for Alice, Bob and Carol split equally: shares are 33.34, 33.33 and 33.33.
Balances become Alice +66.66, Bob -33.33, Carol -33.33.

To settle, repeatedly match the largest debtor with the largest creditor and record a payment of the smaller absolute balance.
This produces at most n - 1 payments.
Finding the true minimum number of payments is NP-hard in general, so say that the greedy result is short but not always minimal.

## Tests and extensions

Test rounding (100 cents across 3 people), percentages that do not sum to 100, a payer not in the split, and deleting an expense (which reverses its balance changes).
Extensions: multiple currencies with a recorded rate per expense, recurring expenses, and an audit log of edits.
