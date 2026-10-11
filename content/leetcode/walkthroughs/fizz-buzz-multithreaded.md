## Intuition

All four threads walk the same counter. At each step exactly one of them owns the current number; the others wait until it advances.

## Approach

1. Keep `current`, starting at 1, under a lock.
2. Each thread loops while `current <= n`.
3. If `current` belongs to this thread, print it, increment `current` and wake everyone.
4. Otherwise wait for the counter to change.

## Walkthrough

For `n = 5`: number prints 1 and 2, fizz prints at 3, number prints 4, buzz prints at 5. The counter then exceeds 5, every waiting thread wakes, sees the loop condition fail and returns.

## Complexity

- Time: O(n) prints; each advance wakes the other threads.
- Space: O(1).

## Edge cases

- A thread with nothing to print, such as `fizzbuzz` for n < 15, must still exit.
- The ownership tests must not overlap: multiples of 15 belong only to `fizzbuzz`.

## Common mistakes

- Waking only one thread (`notify` instead of `notifyAll`), which may wake the wrong owner and stall.
- Checking the loop condition only before waiting, so threads stay blocked after the last number.

## Language notes

Java: a synchronized method with `wait` and `notifyAll`. C++: `condition_variable::wait` with a predicate that also returns when the counter passes n. Go: `sync.Cond` with `Broadcast`.
