## Intuition

Among intervals that can be selected next, the one ending earliest leaves the greatest amount of room for all later choices.
Its starting point matters only for compatibility with the previously selected interval.
This gives a greedy selection order based on finishing times.

## Brute force

Enumerate all subsets, reject subsets with overlapping intervals, and maximize the number selected.
There are exponentially many subsets, even though most choices can be compared using their end times alone.

## Approach

Sort intervals by their right endpoint.
Track `last_end`, the end of the most recently selected interval, and `chosen`, the selected count.
Select an interval only when its start is strictly greater than `last_end`.
After selection, replace `last_end` with that interval's end.
The strict comparison is essential because both endpoints belong to the interval.
The greedy choice is safe by an exchange argument: replacing an optimal solution's first compatible interval with the earliest-finishing compatible interval cannot obstruct any later interval in that solution.
Repeat the same reasoning after each selection.

## Walkthrough

Example 1 orders the intervals by ends 3, 3, 4, 6, and 9.
Choose one `[2, 3]` interval first.
The duplicate overlaps, `[1, 4]` overlaps, and `[3, 6]` also overlaps because it includes the shared point 3.
The interval `[8, 9]` starts after 3 and is selected.
The result is two non-overlapping intervals.

## Complexity

Sorting n intervals costs O(n log n), and the greedy scan costs O(n).
Both references copy the outer interval collection before sorting, using O(n) auxiliary space.
The scan itself uses only a counter and one endpoint.

## Edge cases

Empty input returns zero.
Single-point intervals are valid, but another interval touching that point cannot be selected with them.
The initial endpoint -1 is safe because all starts are nonnegative.

## Common mistakes

Sorting by start time can choose a long interval that blocks several shorter ones.
Using greater-than-or-equal would incorrectly allow touching closed intervals.

## Language notes

Python's `sorted` returns a separate list.
Java clones the outer array and compares right endpoints with a comparator, leaving the original ordering unchanged.
