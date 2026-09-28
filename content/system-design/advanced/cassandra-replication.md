Each node in Cassandra serves as a replica for a different range of data. Cassandra stores multiple copies of data and spreads them across various replicas, so that if one node is down, other replicas can respond to queries for that range of data. This process of replicating the data on to different nodes depends upon two factors:

- Replication factor
- Replication strategy

<figure><img src="/course-assets/system-design/advanced/3736794551551c9b.webp" width="524" height="147" alt="Diagram: Replication" loading="lazy"></figure>

## Replication factor

The replication factor is the number of nodes that will receive the copy of the same data. This means, if a cluster has a replication factor of 3, each row will be stored on three different nodes. Each keyspace in Cassandra can have a different replication factor.

## Replication strategy

The node that owns the range in which the hash of the partition key falls will be the first replica; all the additional replicas are placed on the consecutive nodes. Cassandra places the subsequent replicas on the next node in a clockwise manner. There are two replication strategies in Cassandra:

### Simple replication strategy

This strategy is used only for a single data center cluster. Under this strategy, Cassandra places the first replica on a node determined by the partitioner and the subsequent replicas on the next node in a clockwise manner.

<figure><img src="/course-assets/system-design/advanced/290faca71798c2c5.webp" width="524" height="328" alt="Simple replication with 3 replicas" loading="lazy"><figcaption>Simple replication with 3 replicas</figcaption></figure>

### Network topology strategy

This strategy is used for multiple data-centers. Under this strategy, we can specify different replication factors for different data-centers. This enables us to specify how many replicas will be placed in each data center. Additional replicas are always placed on the next nodes in a clockwise manner.

<figure><img src="/course-assets/system-design/advanced/d01ff9580bcd8308.webp" width="524" height="294" alt="Network topology strategy for replication" loading="lazy"><figcaption>Network topology strategy for replication</figcaption></figure>
