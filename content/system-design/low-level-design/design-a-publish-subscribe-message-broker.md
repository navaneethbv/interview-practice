## Prompt and scope

Publishers send messages to named topics; subscribers receive every message published to a topic after they subscribe.
Deliver messages to each subscriber in publish order, and keep a slow subscriber from blocking the others.

## Model

```text
Broker: topic name -> Topic
Topic(messages: append-only list with offsets, subscribers)
Subscription(topic, subscriber, offset)   -- next message to deliver
Subscriber.on_message(message)
```

Store messages once per topic and track an offset per subscription, rather than copying messages into per-subscriber queues.

## Delivery

Each subscription has its own delivery worker (or task) that reads from its offset, calls the subscriber, and advances the offset after a successful acknowledgement.
A slow subscriber only delays its own offset.
Retention removes messages below the minimum offset of all subscriptions, or by age with lagging subscribers skipping ahead and being told.

## Invariants and tests

Order per topic is the append order; a subscriber never sees offset k + 1 before k.
At-least-once delivery means a subscriber that crashes before acknowledging sees the message again, so handlers should be idempotent.
Tests: subscribe after messages exist (only new ones delivered), one slow and one fast subscriber, unsubscribe during delivery, and handler failure with retry.
Follow-ups: consumer groups that share a subscription's work, partitions for parallelism, and filtering by message attributes.
