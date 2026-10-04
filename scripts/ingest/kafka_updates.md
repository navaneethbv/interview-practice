# Role of ZooKeeper

## Version scope: Kafka 4.0 and later

The original course describes Kafka's historical ZooKeeper architecture.
Kafka 4.0 removed ZooKeeper mode and uses KRaft for cluster metadata management.
Use the old design as historical context, not as a dependency list for a new Kafka cluster.
This replacement chapter was reviewed October 4, 2026.

## Separate metadata from record storage

```text
Producer -> partition leader broker -> follower replicas
Consumer -> broker serving its assigned partitions

KRaft controller quorum -> cluster metadata decisions
Brokers                 -> replicated topic-partition logs
```

Brokers store record logs; describing them as stateless is incorrect.
The controller quorum maintains metadata and coordinates changes in cluster state.
Clients bootstrap through brokers and obtain metadata needed to communicate with the relevant leaders.
The control path and the record path serve different purposes.

## What changed

Historically, ZooKeeper participated in Kafka metadata coordination.
KRaft incorporates that responsibility into Kafka's own controller quorum.
Controller and broker roles can be configured separately; combined roles are possible, but isolation has operational advantages for substantial deployments.
Consumer-group offsets are stored in Kafka's internal offset topic rather than in ZooKeeper by modern consumers.

## Interview exercise

Draw a three-controller quorum and a set of brokers.
Describe what information the controllers own and which machines retain application records.
Then distinguish loss of a broker containing a partition replica from loss of a metadata-controller majority.
Avoid claiming that all existing traffic instantly stops when metadata quorum is unavailable; discuss which operations need new metadata decisions and the actual failure conditions.

## Migration boundary

A ZooKeeper-based cluster requires migration to KRaft before upgrading to Kafka 4.0.
Use the documented supported upgrade path and test recovery in an isolated environment.
Do not assume that changing a configuration flag transforms an existing metadata store or that every upgrade is reversible.

## Sources

- [Kafka 4.0 upgrade guide](https://kafka.apache.org/40/getting-started/upgrade/)
- [KRaft operations and roles](https://kafka.apache.org/40/operations/kraft/)
- [Kafka design and consumer offsets](https://kafka.apache.org/40/design/design/)

# Controller Broker

## Historical terminology and current roles

The course's “controller broker” terminology comes from the ZooKeeper-based architecture.
For Kafka 4.0 and later, explain the controller role in the KRaft metadata quorum separately from the broker role that serves partition data.
A machine can be configured with both roles, but the responsibilities remain distinct.
Reviewed October 4, 2026.

## Reason about two kinds of leadership

A partition leader handles the record stream for one partition.
The active metadata controller coordinates cluster metadata changes through its quorum.
Do not treat these as one global data leader: different partitions may have leaders on different brokers.

```text
Metadata: controller leader -> quorum replication -> committed metadata
Records:  partition leader -> in-sync replicas    -> record acknowledgment
```

The metadata quorum uses majority agreement.
That rule is not a definition of the producer's `acks=all` setting.
For record writes, the in-sync replica set and topic durability configuration determine the relevant acknowledgment conditions.
Mixing these concepts can lead to incorrect claims about which failures a write survives.

## Worked discussion

Imagine three controller voters and three replicas of an application partition.
Losing one controller can leave a controller majority available.
Losing a broker requires examining partition leadership, surviving replicas, and their synchronization state.
The same number of failed machines can have different consequences depending on role placement.
A topology diagram should label these roles rather than simply drawing three interchangeable boxes.

## Follow-up questions

- Which operations need the controller to commit a metadata change?
- Where are application records stored after a controller failure?
- What is the operational reason to isolate controllers from heavily loaded brokers?
- How would you detect lagging metadata replication versus lagging partition replication?

## Source

[Apache Kafka's KRaft documentation](https://kafka.apache.org/40/operations/kraft/) describes controller and broker roles and quorum operation.
The topology exercise is original.

# Kafka Delivery Semantics

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
