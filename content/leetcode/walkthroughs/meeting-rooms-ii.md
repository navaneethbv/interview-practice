## Intuition

The number of rooms needed at any moment equals the number of simultaneous meetings.
Process meetings by start time and keep the finish times of meetings still active.
A min-heap exposes the earliest finish, making it easy to release rooms before admitting the next meeting.

## Brute force

For every meeting start, scan all other meetings and count which ones overlap that time.
This takes O(n²) time.
Sorting plus a heap maintains the active count incrementally instead of recomputing it.

## Approach

1. Sort `intervals` by start time and initialize an empty min-heap `ends`.
2. Before each meeting, remove every heap finish time at or before its `start`.
3. Push the meeting's `end` into the heap.
4. Update `best` with the largest heap size seen.
5. Return `best`.

After cleanup and insertion, the heap contains exactly the meetings active at the current start time.
Every one requires its own room, giving a lower bound that a room-reuse schedule can achieve.
Only meeting starts can increase the required room count.

## Walkthrough

Example 1 uses `[[0, 5], [2, 7], [5, 8]]`.
The heap contents below are shown sorted for readability.

| Meeting | Finishes removed | Active `ends` | `best` |
| --- | --- | --- | --- |
| `[0, 5]` | None | `[5]` | 1 |
| `[2, 7]` | None | `[5, 7]` | 2 |
| `[5, 8]` | 5 | `[7, 8]` | 2 |

At time 5, the first room becomes available exactly when the third meeting begins.
Two rooms suffice, so return 2.

## Complexity

- Time: O(n log n), including sorting and at most one heap insertion and removal per meeting.
- Space: O(n), for sorting storage and the active finish-time heap.

## Edge cases

Back-to-back meetings reuse a room.
Meetings with equal start times require separate rooms because all have positive duration.
Fully overlapping meetings require one room each.
The code also returns zero for an empty input, though this statement requires at least one meeting.

## Common mistakes

- Removing only finishes strictly before the start overcounts rooms at equal endpoints.
- Returning the final heap size loses an earlier peak.
- Treating a heap's entire internal array as sorted misunderstands its representation.

## Language notes

Python uses `heapq` on a list, with the minimum at index zero.
Java uses `PriorityQueue<Integer>` with `peek`, `remove`, and `add`.
Python sorts a copy of the interval list, while Java sorts the outer array in place.
