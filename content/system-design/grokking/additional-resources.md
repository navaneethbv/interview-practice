Here are some useful links for further reading:

1. **Dynamo** - Highly Available Key-value Store -

- <https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf>

2. **Kafka** - A Distributed Messaging System for Log Processing -

- <http://notes.stephenholiday.com/Kafka.pdf>

3. **Consistent Hashing** - Original paper -

- <https://www.akamai.com/es/es/multimedia/documents/technical-publication/consistent-hashing-and-random-trees-distributed-caching-protocols-for-relieving-hot-spots-on-the-world-wide-web-technical-publication.pdf>

4. **Paxos** - Protocol for distributed consensus - `https://www.microsoft.com/en-us/research/uploads/prod/2016/12/paxos-simple-Copy.pdf`
5. **Concurrency Controls** - Optimistic methods for concurrency controls -

- <http://sites.fas.harvard.edu/~cs265/papers/kung-1981.pdf>

6. **Gossip protocol** - For failure detection and more. -

- <http://highscalability.com/blog/2011/11/14/using-gossip-protocols-for-failure-detection-monitoring-mess.html>

7. **Chubby** - Lock service for loosely-coupled distributed systems -

- <http://static.googleusercontent.com/media/research.google.com/en/us/archive/chubby-osdi06.pdf>

8. **ZooKeeper** - Wait-free coordination for Internet-scale systems -

- <https://www.usenix.org/legacy/event/usenix10/tech/full_papers/Hunt.pdf>

9. **MapReduce** - Simplified Data Processing on Large Clusters -

- <https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf>

10. **Hadoop** - A Distributed File System -

- <http://storageconference.us/2010/Papers/MSST/Shvachko.pdf>

Whenever we are designing a large system, we need to consider a few things:

1. What are the different architectural pieces that can be used?
2. How do these pieces work with each other?
3. How can we best utilize these pieces: what are the right tradeoffs?

Investing in scaling before it is needed is generally not a smart business proposition; however, some forethought into the design can save valuable time and resources in the future. In the following chapters, we will try to define some of the core building blocks of scalable systems. Familiarizing these concepts would greatly benefit in understanding distributed system concepts. In the next section, we will go through Consistent Hashing, CAP Theorem, Load Balancing, Caching, Data Partitioning, Indexes, Proxies, Queues, Replication, and choosing between SQL vs. NoSQL.

Let’s start with the Key Characteristics of Distributed Systems.
