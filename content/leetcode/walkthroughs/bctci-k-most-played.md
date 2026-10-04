## Intuition

Keep only the best k songs seen so far, with the weakest retained song easy to remove.
A min-heap arranged by retention strength provides exactly that boundary.
For equal play counts, alphabetically later titles are weaker.

## Brute force

Sort all songs by descending play count and ascending title, then take the first k.
This takes O(n log n) comparisons and stores all ranked entries, even when k is small.

## Approach

The Python heap `weakest` stores `(count, reversed_title_key, title)`.
The title key negates character codes and ends with a positive sentinel, reversing alphabetical preference correctly even when one title is a prefix of another.
Fill the heap until it has k entries, then replace its root only when a stronger entry arrives.
Java instead heaps indices with the ranking comparator reversed and removes one entry whenever size exceeds k.
Both maintain the invariant that every discarded song ranks no higher than the retained boundary.

## Walkthrough

Example 1 asks for three songs.
The two songs with 291 plays outrank every other song: `All About That Base Case` and `Here Comes The Bug`.
The next highest count is 274 for `Oops! I Broke Prod Again`.
The heap eventually retains exactly those three titles, discarding the entries with 193, 146, and 132 plays.
Heap iteration may return the retained titles in a different order, which the spec accepts.

## Complexity

With bounded title lengths, time is O(n log(min(k, n) + 1)) and heap space is O(min(k, n)).
For maximum title length L, string-key construction and comparison can add a factor of L, and Python's stored keys require O(kL) space.

## Edge cases

An empty catalog returns an empty list.
When k exceeds the number of songs, every title is retained.

## Common mistakes

The root must be the weakest retained song, not the strongest.
Equal counts still require the alphabetical tie rule.

## Language notes

Python uses `heapq` tuples and explicitly reverses title order.
Java uses `PriorityQueue` with a reversed comparator; its iteration order is not sorted order.
