## Exercise

Two workers each attempt to reserve the last available unit of an item.
The initial quantity is one.
A broken implementation reads the quantity, computes a new value in the application, and then writes that value in a separate operation.
Both workers can observe one and both can report a successful reservation even though the stored quantity ends at zero.
The final number alone does not prove correctness.

## Use an atomic condition

For this single-item exercise, express the precondition in the update itself.

```sql
UPDATE inventory
SET quantity = quantity - 1
WHERE item_id = 7 AND quantity > 0
RETURNING quantity;
```

A returned row means this statement reserved a unit.
No returned row means the item was absent or had no stock; distinguish those cases separately if the contract requires it.
Record the reservation in the same transaction so stock and ownership cannot diverge on a local failure.
Use a unique request identifier to recognize a retry of a completed reservation.

## Isolation is not a label that fixes everything

In PostgreSQL, Read Committed gives each statement a new snapshot, while Repeatable Read uses a transaction snapshot and may reject conflicting updates.
Serializable transactions can also require retries when a serialization anomaly is detected.
Retry the complete transaction with a bounded policy, not only its final statement.
Keep irreversible external effects outside a transaction retry loop unless an appropriate idempotency mechanism protects them.

## Reproduction schedule

Use two sessions against a disposable database.
For the broken version, pause both after reading quantity one, then let both write and record their reported success.
For the corrected version, run both conditional updates and verify one reservation, quantity zero, and one unsuccessful claim.
The regression should inspect both persisted state and returned outcomes.

## Follow-up

Now reserve two different items together.
Acquire locks in a consistent order when appropriate, handle deadlocks as explicit retryable failures, and roll back the entire reservation when either item is unavailable.
Explain why a single conditional update solved the first exercise but does not automatically solve every multi-row invariant.

## Source

[PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html) documents snapshot and concurrency behavior.
This inventory example is an original exercise.
