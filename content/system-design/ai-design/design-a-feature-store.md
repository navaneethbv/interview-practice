## Prompt and requirements

Several ML teams train and serve models on shared features such as "orders by this user in the last 7 days".
They need the same definition offline for training and online at low latency for serving, without leaking future data into training.

## Architecture

```text
Feature definitions (code, versioned) -> batch pipelines (warehouse) -> offline store (historical values with timestamps)
                                      -> streaming pipelines (events) -> online store (latest value per entity, key-value)
Training: point-in-time join of labels with the offline store
Serving: online lookups by entity id within a few milliseconds
```

## Point-in-time correctness

For a label at time t, use each feature's value as it was known at t, not its latest value.
The offline store keeps a timeline per entity, and the training join selects the latest value with a timestamp at or before t.
Getting this wrong leaks the future and produces models that look excellent offline and fail in production.

## Consistency between offline and online

Define each feature once and generate both pipelines from that definition.
Monitor skew by sampling online values at serving time and comparing them with offline values for the same entity and time.

## Follow-up questions

- How do you backfill a new feature? (Run the batch pipeline over history and write timestamped values to the offline store.)
- How fresh must features be? (Streaming for fraud and ranking signals measured in seconds; daily batch for slow-moving aggregates.)
