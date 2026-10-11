## Intuition

The two threads take turns, so model the turn explicitly. Whoever holds the turn prints and hands it to the other thread.

## Approach

1. Start with the turn belonging to `foo`.
2. `foo` loops `n` times: wait for its turn, print, give the turn to `bar`.
3. `bar` loops `n` times: wait for its turn, print, give the turn back.

## Walkthrough

For `n = 2`, `bar` starts first and blocks. `foo` prints `foo` and hands over; `bar` prints `bar` and hands back; this repeats once more, giving `foobarfoobar`.

## Complexity

- Time: O(n) prints with constant work per handoff.
- Space: O(1).

## Edge cases

- `n = 1` is a single handoff.
- If `bar` starts first, it must wait rather than print.

## Common mistakes

- Using one shared lock without a turn flag: the same thread can reacquire it and print twice.
- Signalling with `notify` before changing the flag, so the woken thread sees the old turn and waits forever.

## Language notes

Java: two semaphores with permits 1 and 0 encode the turn. C++: a mutex, a condition variable and a `fooTurn` flag. Go: two buffered channels pass a token back and forth.
