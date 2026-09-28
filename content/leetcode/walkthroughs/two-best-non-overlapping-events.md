## Intuition

For each event chosen first, the best compatible second event is the maximum value whose start is strictly after its end.
Sorting by start time and building a suffix maximum makes that compatible best value available by binary search.

## Brute force

Checking every pair of events takes O(n^2) time.
The same later events are repeatedly scanned even though only their maximum value is needed.

## Approach

1. Sort events by start time and build `suffix_best` from right to left.
2. For each event, binary-search the first event with `start > end` using `bisect_right`.
3. Combine the current value with `suffix_best[next_index]`.
4. Also allow a single event by initializing the answer and the suffix sentinel to zero.

## Walkthrough

This is Example 1 from the local statement.
For events `[1,3,2]`, `[4,5,3]`, and `[2,4,4]`, sorting keeps starts 1, 2, and 4.
The suffix maxima are 4, 4, and 3, with a zero sentinel after the list.
For the first event, the first start strictly after end 3 is 4, so its total is 2 + 3 = 5.
The event ending at 4 cannot pair with the event starting at 4 because endpoints overlap.
The best answer is therefore 5.

## Complexity

Sorting and the suffix pass cost O(n log n), while n binary searches add O(n log n).
The sorted events, starts list, suffix array, and output bookkeeping use O(n) additional space.

## Edge cases

An event can be selected alone when no compatible event exists.
Events sharing an endpoint are incompatible because both endpoints are inclusive.
Two single-hour events at different hours can be combined.

## Common mistakes

Search for `start > end`, not `start >= end`.
Do not use a prefix maximum when the compatible event lies to the right.
Remember that choosing at most two events includes the one-event option.

## Language notes

Python uses `bisect_right`; Java implements the same strict lower-bound search manually.
Both suffix arrays include a zero sentinel for the case with no later event.
