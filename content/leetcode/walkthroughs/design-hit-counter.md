## Intuition

The counter needs hits from the inclusive 300-second window ending at `timestamp`.
Because timestamps arrive in nondecreasing order, stale hits form a prefix of the deque.
Remove that prefix during `getHits`, then the deque length is the current count.

## Brute force

Scanning every stored hit on every query and counting timestamps above `timestamp - 300` takes O(H) per query for H stored hits.
Removing stale entries once makes each hit leave the deque at most once, giving amortized linear work across queries.

## Approach

1. Append each `timestamp` in `hit`.
2. In `getHits`, repeatedly remove the front while it is at or before `timestamp - 300`.
3. Return the remaining deque length.

## Walkthrough

Example 1 calls `hit(1)`, `hit(2)`, `getHits(300)`, and `getHits(301)`.

| operation | stale threshold | deque after cleanup | result |
| --- | ---: | --- | ---: |
| `hit(1)` | none | `[1]` | null |
| `hit(2)` | none | `[1,2]` | null |
| `getHits(300)` | 0 | `[1,2]` | 2 |
| `getHits(301)` | 1 | `[2]` | 1 |

The hit at time 1 is exactly 300 seconds old at time 301 and is removed.

## Complexity

- Time: O(1) for `hit`, and O(r + 1) for a `getHits` call removing r stale entries, with each hit removed once overall.
- Space: O(H), where H is the number of retained hit entries, including unexpired entries from before the last cleanup.
Stale hits can accumulate if `getHits` is not called.

## Edge cases

A hit at `timestamp - 299` remains in the window.
A hit at `timestamp - 300` is excluded by the strict 300-second window.
Multiple hits at one timestamp are stored and counted separately.
Calling `getHits` repeatedly without new hits performs no additional removals.

## Common mistakes

- Removing hits strictly before the threshold incorrectly keeps a boundary hit.
- Cleaning only one stale hit leaves older hits counted.
- Claiming storage is always bounded by 300 misses that timestamps are event values, not array positions.

## Language notes

Python uses `collections.deque` and `popleft`.
Java uses `ArrayDeque<Integer>` and removes from its front.
Both implementations rely on nondecreasing hit timestamps from the design contract.
