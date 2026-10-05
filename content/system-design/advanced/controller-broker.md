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
