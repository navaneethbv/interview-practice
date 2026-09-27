## Intuition
On each day, attending the event that ends soonest leaves the most future options.
A min-heap of end days represents all events that have started but are not yet attended.
Expired events can be discarded before selecting the day's event.

## Brute force
Trying every event on every day can be quadratic and can also make poor early choices.
Sorting starts and using a heap gives the earliest-ending greedy choice at each day.

## Approach
1. Sort events by start day.
2. If the heap is empty, jump to the next event's start day.
3. Add every event whose start is at most the current day.
4. Remove events whose end is before the current day.
5. Attend the event with the smallest end day, then advance one day.

## Walkthrough
Example 1 has events `[1,2]`, `[2,3]`, and `[3,4]`.
On day 1, the first event enters the heap and is attended.
On day 2, the second event becomes available and is attended.
On day 3, the third event becomes available and is attended.
The count reaches 3, and each event uses a distinct valid day.

## Complexity
Sorting takes O(E log E), and each event enters and leaves the heap once, for O(E log E) total time.
The sorted event storage and heap use O(E) space.

## Edge cases
Events with the same one-day interval compete for one slot, so only one can be attended.
An expired heap entry must be removed before choosing.
Large gaps between events are skipped by jumping the day.

## Common mistakes
Choosing the event with the latest end can block many short events.
Adding only events that start exactly today misses already available events.
Advancing the day when no heap event exists wastes time and can overrun later intervals.

## Language notes
Python uses `heapq` and mutates the sorted event list.
Java uses `PriorityQueue<Integer>` with a comparator for event starts.
Both references keep only end days in the heap because starts are already processed.
