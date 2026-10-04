## Specify the guarantee's boundary

Delivery guarantees describe a protocol and its failure assumptions, not every effect produced by the application.
Distinguish writing a record, consuming it, and updating an external destination.
This replacement chapter uses Kafka 4.0 documentation and was reviewed October 4, 2026.

## Producer acknowledgments

| Setting | Producer waits for | Important limit |
| --- | --- | --- |
| `acks=0` | No broker acknowledgment | Sending is not proof of storage |
| `acks=1` | Partition leader acknowledgment | A leader failure before replication can lose the record |
| `acks=all` | The current in-sync replica set | Durability also depends on replication and minimum ISR settings |

`acks=all` does not mean a majority of every configured replica.
For example, configure replication factor three and `min.insync.replicas=2` with `acks=all`.
If only one in-sync replica remains, the topic's minimum requirement prevents a successful write acknowledgment under those settings.
Explain the availability cost of that durability choice.
Do not describe ordinary acknowledgment as a guarantee that every record was individually forced onto stable storage by `fsync`.

## Retries and transactions

An idempotent producer protects against duplicate records caused by its supported retry protocol.
It does not deduplicate every business request submitted again by an application.
Kafka transactions can coordinate Kafka writes and consumed offsets in suitable read-process-write flows.
Consumers that should exclude aborted transactional records need the appropriate isolation setting.
An external database or payment system is not automatically included in that Kafka transaction.

## Worked failure sequence

A consumer reads event E, updates a database, and crashes before committing its offset.
On restart it reads E again.
If the database update is applied twice, the system has duplicated the business effect even though record delivery behaved as designed.
One approach is a unique event identifier recorded atomically with the database update.
The replay finds the recorded identifier and avoids repeating the effect.
That boundary must match the application's real transaction and retention assumptions.

## Exercise

Reverse the order: commit the offset before the database update.
A crash between those steps can lose the effect instead.
Explain why merely reordering the two independent operations cannot guarantee both no loss and no duplication.

## Sources

- [Producer configuration](https://kafka.apache.org/40/configuration/producer-configs/)
- [Topic durability settings](https://kafka.apache.org/40/configuration/topic-configs/)
- [Kafka delivery semantics](https://kafka.apache.org/40/design/design/)
