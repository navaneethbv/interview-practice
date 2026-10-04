## Intuition

The meeting that ends earliest is the first deadline that must be covered.
Scheduling a run at its endpoint covers it while placing the run as far right as possible, leaving the best opportunity to cover later meetings too.

## Brute force

Try combinations of meeting endpoints until finding a set that intersects every interval.
The number of candidate subsets grows exponentially, even though a simple exchange argument identifies an optimal next choice.

## Approach

Sort meetings by their ending times.
Track the most recent chosen time in `last_run`, initially -1 because all meeting times are nonnegative.
If a meeting starts after that time, it is not covered, so schedule a new run at its end and increment `runs`.
Otherwise the previous run lies inside the meeting: its time is no later than this meeting's end because of the sorting order.
Moving any first required run to the earliest end cannot lose coverage of a later-ending interval that already contained it.

## Walkthrough

Example 1 contains `[2, 3]`, `[1, 4]`, another `[2, 3]`, `[3, 6]`, and `[8, 10]`.
The first earliest-ending meeting chooses time 3.
The duplicate, `[1, 4]`, and `[3, 6]` all include that time.
The last meeting starts at 8, so a second run is chosen at 10.
The answer is 2.

## Complexity

Sorting n meetings takes O(n log n) time; the greedy scan is O(n).
Both references create a separate ordered collection, requiring O(n) auxiliary space.

## Edge cases

No meetings require no runs.
Duplicate intervals share the same run.
Intervals touching at one endpoint can be covered together because endpoints are inclusive.

## Common mistakes

Use `start > last_run`, not greater-than-or-equal.
Sorting by start time and selecting early starts does not establish the same greedy guarantee.

## Language notes

Python's `sorted` leaves the input unchanged.
Java clones the outer array before sorting its meeting references and keeps the chosen time in `lastRun`.
