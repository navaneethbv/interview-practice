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
