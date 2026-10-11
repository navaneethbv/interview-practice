# Operating systems essentials

These chapters are a quick reference for the fundamentals questions that appear in phone screens and system design follow-ups.
Each section ends with questions to answer aloud; if you cannot explain an answer in two or three sentences, study that topic further.
Reviewed October 11, 2026.

## Processes and threads

A **process** has its own virtual address space, file descriptors and security context.
A **thread** is a schedulable unit of execution inside a process; threads share the address space and descriptors but each has its own stack and registers.
Creating and switching threads is cheaper than processes, but shared memory requires synchronization.

A **context switch** saves one thread's registers and loads another's; switching processes also changes the page tables, which can flush the TLB.

## Virtual memory

Each process sees a contiguous virtual address space divided into pages, usually 4 KiB.
The MMU translates virtual pages to physical frames through page tables, caching translations in the TLB.
A page fault occurs when a page is not resident: the kernel loads it from disk or allocates it.
Thrashing happens when the working set exceeds physical memory and the system spends its time paging.

## Scheduling

Modern general-purpose kernels use preemptive, priority-aware schedulers that aim for fairness (Linux's CFS and its successor EEVDF).
Know the classic trade-offs: first-come-first-served is simple but suffers convoy effects; round robin bounds waiting time; shortest-job-first minimizes average waiting time but needs job length estimates and can starve long jobs.

## I/O models

- **Blocking I/O:** the thread waits until data is ready. One thread per connection is simple but expensive at high concurrency.
- **Non-blocking I/O with readiness notification:** `epoll` (Linux) or `kqueue` (BSD/macOS) report which sockets are ready; one thread can serve thousands of connections. This underlies Node.js, nginx and Netty.
- **Completion-based I/O:** submit operations and receive completions (`io_uring`, Windows IOCP).

## Questions to answer aloud

- Why can a program with more threads than cores run slower?
- What happens, step by step, when a process reads a file it has never opened?
- Why does a memory leak eventually slow the whole machine before it crashes?

# Networking essentials

## The path of a web request

1. **DNS:** the resolver finds the IP address for the host name, using caches with TTLs.
2. **TCP handshake:** SYN, SYN-ACK, ACK establishes a connection (one round trip).
3. **TLS handshake:** TLS 1.3 negotiates keys in one round trip, or zero with resumption.
4. **HTTP request and response** over the encrypted connection.
5. Connection reuse (keep-alive, HTTP/2 multiplexing) amortizes the setup cost over many requests.

## TCP versus UDP

TCP provides reliable, ordered byte streams with flow control and congestion control.
UDP sends independent datagrams with no delivery guarantee; applications that need low latency and can tolerate loss (games, voice) or that implement their own reliability (QUIC) use it.
HTTP/3 runs over QUIC, which is built on UDP and avoids TCP's head-of-line blocking across streams.

## HTTP

- Methods: GET and HEAD are safe; GET, PUT and DELETE are idempotent; POST is neither.
- Status classes: 2xx success, 3xx redirection, 4xx client error, 5xx server error. Know 200, 201, 204, 301, 304, 400, 401, 403, 404, 409, 429, 500, 502, 503 and 504.
- Caching: `Cache-Control`, `ETag` with `If-None-Match`, and CDNs at the edge.
- HTTP/2 multiplexes many streams over one TCP connection; HTTP/3 does the same over QUIC.

## Load balancing layers

Layer 4 balancers route by IP and port and are fast; layer 7 balancers understand HTTP and can route by path, header or cookie, terminate TLS and retry.

## Questions to answer aloud

- What happens when you type a URL into a browser and press Enter?
- Why does a TCP connection take longer to reach full speed on a long-distance link?
- When would you choose WebSockets over server-sent events, and over long polling?

# Database essentials

## Indexes

A B-tree index keeps keys sorted, supporting equality and range lookups in O(log n) and ordered scans.
A composite index on `(a, b)` serves queries on `a` and on `a` with `b`, but not on `b` alone.
Indexes speed reads and slow writes, because every insert and update maintains them.
LSM trees (used by Cassandra, RocksDB) buffer writes in memory and merge sorted files in the background, favoring write-heavy workloads.

## Transactions and isolation

ACID: atomicity, consistency, isolation, durability.
Isolation levels trade anomalies for concurrency:

| Level | Prevents | Still allows |
| --- | --- | --- |
| Read committed | Dirty reads | Non-repeatable reads, lost updates without care |
| Repeatable read / snapshot | Non-repeatable reads | Write skew |
| Serializable | All of the above | Nothing, at the cost of aborts or locking |

Many databases implement snapshot isolation with MVCC: readers see a consistent snapshot and do not block writers.

## Replication and partitioning

Leader-follower replication sends writes to one leader and reads can go to followers, which may lag.
Partitioning (sharding) splits data by key range or hash; choose a key that spreads load and keeps related data together.
Cross-partition transactions need two-phase commit or application-level patterns such as sagas.

## Normalization and denormalization

Normalize to avoid update anomalies; denormalize read paths when joins become the bottleneck, and keep the copies consistent with events or scheduled rebuilds.

## Questions to answer aloud

- Why might adding an index make a query slower?
- Two users withdraw from a shared account at the same time. Which isolation level or query prevents an overdraft?
- What breaks when you shard a table by user id and later need a report across all users?

# Concurrency primitives

## The building blocks

- **Mutex:** one thread at a time in a critical section.
- **Read-write lock:** many readers or one writer.
- **Semaphore:** a counter of permits; a binary semaphore behaves like a mutex without ownership.
- **Condition variable:** wait until a condition holds, always in a loop that rechecks the condition, because of spurious wake-ups.
- **Atomic operations:** compare-and-swap and fetch-and-add without locks, for counters and lock-free structures.
- **Channels and message passing:** share data by sending it rather than by sharing memory (Go, actors).

## Classic problems

| Problem | Shape | Practice |
| --- | --- | --- |
| Producer-consumer | Bounded buffer with two conditions | Bounded blocking queue |
| Ordering threads | One thread signals the next | Print in Order, Print FooBar Alternately |
| Resource allocation | Avoid deadlock with ordering | The Dining Philosophers |
| Barriers | Groups of threads proceed together | Building H2O |

The Concurrency list in the problem sets runs these on real threads in Java, C++ and Go.

## Deadlock

Deadlock requires four conditions at once: mutual exclusion, hold and wait, no preemption, and circular wait.
Breaking any one prevents it; lock ordering, which breaks circular wait, is the most common practical fix.
Livelock and starvation are related failures where threads run but make no progress, or one thread never gets a turn.

## Memory visibility

Without synchronization, one thread's writes may not be visible to another, and the compiler or CPU may reorder them.
Locks, atomics, and language features such as Java's `volatile` establish happens-before relationships that guarantee visibility.

## Questions to answer aloud

- Why must a condition variable wait be in a loop?
- How would you implement a thread-safe lazy singleton, and what is wrong with naive double-checked locking?
- When is a lock-free structure worth its complexity?

# Complexity cheat sheet

## Data structure operations

| Structure | Access | Search | Insert | Delete | Notes |
| --- | --- | --- | --- | --- | --- |
| Array / dynamic array | O(1) | O(n) | O(1) amortized at end, O(n) middle | O(n) | Cache-friendly |
| Linked list | O(n) | O(n) | O(1) with a node reference | O(1) with a node reference | |
| Hash table | | O(1) average | O(1) average | O(1) average | O(n) worst case |
| Balanced BST / tree map | O(log n) | O(log n) | O(log n) | O(log n) | Ordered iteration |
| Binary heap | O(1) min | O(n) | O(log n) | O(log n) pop | Build in O(n) |
| Trie | | O(L) | O(L) | O(L) | L = key length |
| Union-find | | ~O(1) amortized | | | With path compression and union by rank |

## Algorithms

| Algorithm | Time | Space |
| --- | --- | --- |
| Comparison sort (merge, heap, quick average) | O(n log n) | O(n), O(1), O(log n) |
| Counting / radix sort | O(n + k), O(d(n + k)) | O(n + k) |
| Binary search | O(log n) | O(1) |
| BFS / DFS | O(V + E) | O(V) |
| Dijkstra with a binary heap | O((V + E) log V) | O(V) |
| Topological sort | O(V + E) | O(V) |
| Floyd-Warshall | O(V^3) | O(V^2) |

## Reading constraints

| n up to | Typical target |
| --- | --- |
| 10 to 12 | O(n!) or O(2^n · n) |
| 20 to 25 | O(2^n) |
| 500 | O(n^3) |
| 5,000 | O(n^2) |
| 10^5 to 10^6 | O(n log n) or O(n) |
| 10^9 and more | O(log n) or O(1) |

# Latency and estimation numbers

## Approximate latencies

| Operation | Time |
| --- | --- |
| L1 cache reference | ~1 ns |
| Main memory reference | ~100 ns |
| Read 1 MB sequentially from memory | ~10 µs to a few tens of µs |
| Round trip within a data center | ~0.5 ms |
| SSD random read | ~20 to 100 µs |
| Read 1 MB sequentially from SSD | ~0.1 to 1 ms |
| HDD seek | ~5 to 10 ms |
| Round trip across a continent | ~30 to 80 ms |
| Round trip across an ocean | ~100 to 150 ms |

Exact values vary by hardware; the orders of magnitude are what matter in an interview.

## Handy conversions

- One day is 86,400 seconds; use 100,000 for quick estimates.
- 1 million requests per day is about 12 per second; 1 billion per day is about 12,000 per second.
- Peak traffic is often 2 to 10 times the average.
- 1 KB per record times 1 billion records is 1 TB.

## A worked estimate

A photo app has 50 million daily users who each upload 2 photos of 2 MB.
Uploads: 100 million per day, about 1,200 per second on average and perhaps 5,000 at peak.
Storage: 200 TB per day, about 73 PB per year before replication.
That number alone says the design needs object storage, tiering to colder storage, and probably resized derivatives served from a CDN.
