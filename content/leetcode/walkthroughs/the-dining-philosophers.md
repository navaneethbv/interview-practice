## Intuition

Deadlock needs a cycle in which everyone holds one fork and waits for the next. Imposing a global order on the forks (always take the lower-numbered fork first) makes such a cycle impossible.

## Approach

1. Give each fork a lock.
2. For philosopher p, the forks are p and (p + 1) % 5.
3. Lock the lower-numbered fork, then the higher-numbered one.
4. Call pick, pick, eat, put, put, then release both locks.

## Walkthrough

Philosophers 0 to 3 each lock their left fork first. Philosopher 4 needs forks 4 and 0, so it locks fork 0 first. If philosopher 0 holds fork 0, philosopher 4 waits without holding fork 4, so philosopher 3 can finish and the chain unwinds.

## Complexity

- Time: O(1) per meal apart from waiting.
- Space: O(1) for five locks.

## Edge cases

- Two neighbours compete for the shared fork; the lock serializes them.
- Non-neighbours eat at the same time.

## Common mistakes

- Everyone taking the left fork first: all five can hold one fork and wait forever.
- Calling the put callbacks after releasing the locks, so a neighbour picks up a fork the judge still sees as held.
- Using one global lock: correct, but only one philosopher can ever eat.

## Language notes

Java: `ReentrantLock` per fork. C++: `scoped_lock` locks both mutexes with a built-in deadlock-avoidance algorithm. Go: `sync.Mutex` per fork, locked in index order.
