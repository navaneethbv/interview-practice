## Intuition

Each method after the first must wait for a signal from the one before it. A one-shot gate per step is enough: `second` waits until `first` has printed, and `third` waits until `second` has printed.

## Approach

1. Create two gates, initially closed: `firstDone` and `secondDone`.
2. `first` prints, then opens `firstDone`.
3. `second` waits on `firstDone`, prints, then opens `secondDone`.
4. `third` waits on `secondDone`, then prints.

## Walkthrough

With order `[3, 1, 2]`, the third thread starts and blocks on `secondDone`. The first thread prints and opens `firstDone`. The second thread passes `firstDone`, prints and opens `secondDone`, which finally releases the third thread.

## Complexity

- Time: O(1) work per call apart from waiting.
- Space: O(1) for two gates.

## Edge cases

- Any start order works because every wait is on a condition, not on timing.
- A gate that is already open lets a late thread through immediately.

## Common mistakes

- Busy-waiting on a plain boolean: without `volatile` or a lock, the update may never become visible, and the loop wastes CPU.
- Using `sleep` to delay later threads; it only makes the race rarer.
- Signalling before printing, which lets the next thread print first.

## Language notes

Java: `CountDownLatch(1)` is a one-shot gate. C++: a mutex, a condition variable and a step counter. Go: closing a channel releases every receiver, so `close(firstDone)` is the gate.
