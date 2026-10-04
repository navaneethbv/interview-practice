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
