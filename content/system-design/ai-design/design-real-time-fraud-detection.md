## Prompt and requirements

Score every card payment for fraud in under 100 milliseconds before authorization.
Blocking good customers costs revenue and trust; missing fraud costs chargebacks.

## Architecture

```text
Payment request -> feature service (online store: velocity counts, device, merchant risk, user history)
                -> rules engine (hard blocks, allowlists) + model score
                -> decision: approve, challenge (step-up auth), or decline
Event stream -> streaming aggregations (counts per card per 1 min / 1 h / 1 day) -> online store
Chargebacks and analyst labels (arrive weeks later) -> training data
```

## Features that matter

Velocity features dominate: attempts per card, per device and per IP over several windows, and distance from the user's usual location and merchants.
They must be computed in streaming with low latency, and the same definitions must be used for training with point-in-time joins.

## Labels and evaluation

Fraud labels arrive late and are incomplete: chargebacks take weeks, and declined transactions never get a label.
Evaluate on matured data, and measure precision at the operating threshold, approval rate and fraud loss in money, not just AUC.

## Follow-up questions

- How do you adapt to new attack patterns? (Rules for fast response, frequent retraining, and anomaly detection on feature distributions.)
- How do you explain a decline to support staff? (Log the top contributing features and rules with each decision.)
