## Requirements

- Send and receive email for 1 billion users, store mailboxes, search and thread messages, and filter spam.
- Durable delivery: an accepted message is never lost.

## Architecture

```text
Outgoing: Web/app -> API -> outbound queue -> SMTP senders (per destination domain, rate-limited, retries with backoff)
Incoming: MX servers (SMTP) -> spam and malware filtering -> delivery -> mailbox store -> push notifications
Mailbox store: metadata (folders, flags, threads) in a sharded DB keyed by user; bodies and attachments in object storage
Search: per-user inverted index updated asynchronously
```

## Deep dives

**Durability.** Acknowledge an incoming SMTP transaction only after the message is written to replicated storage.
Outbound messages sit in a durable queue and are retried for days according to SMTP rules before bouncing.

**Sharding.** Shard everything by user id so a mailbox lives on one shard; large attachments are deduplicated by content hash in object storage.

**Deliverability.** SPF, DKIM and DMARC authenticate outbound mail; per-domain sending rates and warm-up protect IP reputation.

**Spam.** Layered: connection reputation, authentication results, content and attachment scanning, and per-user feedback.

## Follow-up questions

- How do you implement threading? (Group by the `References` and `In-Reply-To` headers, falling back to normalized subjects.)
- How do you search a 50 GB mailbox quickly? (A per-user index sharded with the mailbox, built incrementally.)
