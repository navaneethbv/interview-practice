## Intuition

Only the largest k values can affect the next kth-largest answer.
Keep those values in a min-heap so its smallest entry is exactly the kth largest overall.
Whenever a new value makes the heap too large, discard the smallest entry.

## Brute force

Retain the entire stream and sort it after every insertion.
With m values seen, an update can cost O(m log m) time and storage keeps growing.
A bounded heap retains just the candidates that can still matter.

## Approach

1. Construct `heap` empty and retain the requested rank `k`.
2. Feed each initial value through `_retain` in Python or `retain` in Java.
3. To retain a value, push it into the min-heap.
4. If the heap now contains more than k entries, remove its minimum.
5. For `add(val)`, perform the same retention step and return the heap minimum.

After every retention step, the heap contains the largest min(k, values-seen) entries, including duplicates.
A discarded value can never become one of the largest k after further insertions because insertions do not remove the values already ahead of it.
The contract guarantees at least k total values whenever `add` must return an answer.

## Walkthrough

Example 1 initializes `k = 3` with `[4, 5, 8, 2]`.
Heap contents below are shown sorted for clarity, not as their internal array representation.

| Event | Retained values | Returned value |
| --- | --- | --- |
| Constructor finishes | `[4, 5, 8]` | Omitted |
| `add(3)` | `[4, 5, 8]` | 4 |
| `add(5)` | `[5, 5, 8]` | 5 |
| `add(10)` | `[5, 8, 10]` | 5 |

The two copies of 5 count separately until one is displaced by 10.

## Complexity

- Time: O(m log(k + 1)) for m constructor values and O(log(k + 1)) per `add`; reading the minimum is O(1).
- Space: O(k), with at most k + 1 heap entries temporarily during insertion.

## Edge cases

Rank 1 tracks the largest value seen.
An initially empty collection is allowed when k = 1.
Negative values use ordinary ordering, and duplicates retain their full multiplicity.
No artificial zero values are inserted to fill an initially short heap.

## Common mistakes

- A max-heap exposes the largest value rather than the kth largest boundary.
- Removing duplicates changes the requested rank.
- Keeping only k - 1 entries before returning exposes the wrong boundary.

## Language notes

Python's `heapq` operates on a list; Java's `PriorityQueue<Integer>` is a min-heap by default.
Neither heap's entire iteration order is sorted.
Only `heap[0]` or `peek()` is needed for the answer.
