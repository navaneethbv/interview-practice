An event records something that has already happened and can notify other contexts without requiring a shared transaction.
Events are useful for decoupling, but they introduce ordering, duplication, replay, and schema-evolution concerns.

## Make workflows explicit

A workflow that spans multiple aggregates or contexts should record its state and define compensation for a failed step.
Do not pretend that a distributed sequence is atomic when the system cannot guarantee atomicity.
Use idempotency keys and correlation identifiers so retries can be recognized and investigated.

## Events are not logs by default

Decide whether an event is an integration notification, an audit record, or the source of truth for rebuilding state.
Each role requires different retention, privacy, and replay guarantees.
