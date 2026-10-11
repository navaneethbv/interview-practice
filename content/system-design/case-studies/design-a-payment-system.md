## Requirements

- Accept payments from customers to merchants through external payment processors.
- Never charge a customer twice for one order, and never lose a successful charge.
- Record every money movement in a ledger that balances.
- Pay merchants out on a schedule; reconcile with processors daily.

Non-functional: correctness over latency, auditability, and availability of the checkout path.
Assume 1,000 payments per second at peak and 50 million per day.

## API

```text
POST /payments           {order_id, amount, currency, method_token}  Idempotency-Key: <uuid>
GET  /payments/{id}
POST /refunds            {payment_id, amount}                          Idempotency-Key: <uuid>
POST /webhooks/processor (signed)
```

## Data model

```text
payments(id, order_id UNIQUE, amount, currency, status, processor_ref, idempotency_key UNIQUE, created_at)
ledger_entries(id, transaction_id, account, debit, credit, currency, created_at)   -- append-only
outbox(id, topic, payload, published_at)
```

Status moves only forward: `created -> authorized -> captured -> settled`, or `failed`, or `refunded`.

## Architecture

```text
Checkout -> Payment API -> payments DB (status + idempotency) -> Processor adapter -> Card network
                       \-> outbox -> event bus -> Ledger service -> ledger DB
Processor webhooks -> Webhook handler -> payments DB
Nightly: Reconciliation job compares processor settlement files with the ledger
```

## Deep dives

**Exactly-once charging.** Networks fail between "processor charged the card" and "we recorded it".
Store the idempotency key with the payment row before calling the processor, and pass the same key to the processor so its side deduplicates too.
On a timeout, do not retry blindly: query the processor by reference, or let the webhook or reconciliation settle the status.

**Double-entry ledger.** Every transaction writes entries that sum to zero, for example debit customer funds and credit merchant payable.
Entries are never updated; corrections are new entries.
Balances are derived by summing entries, cached in snapshot tables for speed.

**Consistency between payment and ledger.** Write the payment status and an outbox row in one transaction; a relay publishes outbox rows.
The ledger consumer is idempotent on transaction id, so redelivery is harmless.

## Failure modes

- Processor down: fail over to a second processor for new authorizations only; never move an in-flight payment between processors.
- Duplicate webhook: idempotent on processor event id.
- Ledger lag: checkout does not wait for the ledger; reconciliation alerts on mismatches.

## Follow-up questions

- How would you support multiple currencies and FX? (Store amounts in minor units with currency; record the rate used as its own ledger transaction.)
- How do you prevent fraud? (Risk scoring before authorization, velocity limits, 3-D Secure when risk is high.)
- How do you handle PCI scope? (Tokenize card data at the edge with the processor's hosted fields so raw card numbers never reach your servers.)
