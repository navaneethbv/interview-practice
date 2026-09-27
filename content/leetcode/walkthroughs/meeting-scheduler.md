## Intuition

Two availability intervals overlap from the later start to the earlier end.
If that overlap is too short, the interval that ends first cannot help with any later interval from the other person.
Sorting both schedules allows a two-pointer scan that discards only such exhausted possibilities.

## Brute force

Compare every pair of intervals and keep the earliest overlap long enough for the meeting.
For m and n intervals, this costs O(mn) time.
Sorting establishes a chronological order so each interval needs to be advanced past only once.

## Approach

1. Make sorted outer copies of both slot lists, ordered by start time.
2. Initialize `first` and `second` to the first interval in each schedule.
3. Set `start` to the larger start and `end` to the smaller end.
4. If `end - start` is at least duration, return `[start,start + duration]`.
5. Otherwise advance the pointer whose interval ends earlier; on equal ends, advance second.
6. Return an empty list if either schedule is exhausted.

As pointers advance, candidate overlap starts cannot move backward.
Therefore the first overlap that fits gives the earliest possible meeting.
Equal interval ends are safe: neither exhausted interval can create a positive overlap beyond that boundary.

## Walkthrough

Example 1 has `slots1 = [[10,30]]`, `slots2 = [[20,40]]`, and duration five.

| Value | Calculation | Result |
| --- | --- | ---: |
| start | max(10,20) | 20 |
| end | min(30,40) | 30 |
| shared duration | 30 - 20 | 10 |
| meeting end | 20 + 5 | 25 |

Ten shared units are enough, so the method immediately returns `[20,25]`.
There is no need to occupy the entire overlap through time thirty.

## Complexity

Sorting costs O(m log m + n log n), followed by an O(m + n) scan.
Auxiliary space is O(m + n) for the sorted outer copies and sorting workspace.
The returned meeting uses O(1) additional space.

## Edge cases

An overlap exactly equal to duration is accepted.
Intervals touching at one endpoint have zero shared duration and cannot fit a positive meeting.
Unsorted input is handled by sorting.
No qualifying pair returns an empty list.

## Common mistakes

- Using the smaller start includes time when one person is unavailable.
- Returning the entire overlap ignores the requested duration.
- Advancing the later-ending interval can skip an earlier valid match.

## Language notes

Python uses sorted lists; Java clones the outer arrays before sorting them.
Neither version changes the caller's interval order or endpoint values.
Java uses a comparator rather than subtracting endpoints, and the accepted meeting ends within the supplied interval bounds.
