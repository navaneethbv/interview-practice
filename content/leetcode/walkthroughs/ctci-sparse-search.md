## Intuition

Empty strings interrupt the physical array but do not change the sorted order of its nonempty words.
A binary-search comparison remains useful after relocating an empty midpoint to a nearby nonempty position.
An interval containing only empty strings cannot contain the nonempty target.

## Brute force

Scan the entire array until the target appears.
This takes O(n) word checks and is a valid baseline, especially when the sparse layout makes midpoint recovery expensive.

## Approach

Within the current bounds, `_nearest_word` searches outward from the midpoint, checking the left candidate before the right candidate.
If it finds no word, return -1.
Compare the recovered word with target and keep only the appropriate side of that actual index.
Return the index immediately on equality.
The algorithm never compares an empty placeholder to target to choose a direction.
Nonempty values retain their lexicographic ordering across every narrowed interval.

## Walkthrough

Example 1 searches for `ball`.
The initial midpoint is index 6, an empty string.
Outward searching finds `car` at index 7, so the next interval is indices 0 through 6.
Its midpoint 3 is empty, but the nearby word `ball` at index 4 is found.
That word equals target, so return 4.

## Complexity

Worst-case time is O(n) word positions inspected because long empty stretches can require a linear search.
String comparisons add their character-comparison cost.
Auxiliary space is O(1), since both binary search and midpoint recovery are iterative.

## Edge cases

An all-empty array returns -1.
An empty array skips the main loop.
The target is guaranteed nonempty, so placeholders never count as a successful match.

## Common mistakes

Moving only left from an empty midpoint can overlook the only nonempty word on the right.
Updating bounds relative to the old midpoint rather than the recovered word can discard a valid region.

## Language notes

Python uses truthiness to detect nonempty strings and native lexicographic comparisons.
Java uses `isEmpty()` and `compareTo()`; the signed comparison result selects the same search direction.
