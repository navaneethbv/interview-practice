## Intuition

The requested output is ordered, and the input is ordered too.
A pointer into the input can therefore move only forward while candidate values increase from `low` through `high`.
Values passed by that pointer can never become relevant again.

## Brute force

For every integer in the requested range, search the entire array for a match.
With n array elements and w range values, that can require O(n times w) comparisons.

## Approach

Initialize `index` to zero and an empty result `missing`.
For each candidate `value`, advance `index` while the pointed-to input value is smaller than the candidate.
After this loop, either the input is exhausted or its current value is at least the candidate.
If the current value equals the candidate, it is present and should be skipped.
Otherwise no later input value can equal it, so append the candidate.
There is no need to increment the pointer immediately after a match; the next candidate's advance loop moves beyond that value and any duplicates.

## Walkthrough

Example 1 asks for integers 9 through 13 in `[6, 9, 12, 15, 18]`.
The pointer first skips 6 and finds 9, so 9 is omitted.
For candidate 10 it advances to 12, proving 10 is missing.
The same 12 also proves 11 is missing, then matches candidate 12.
Candidate 13 advances to 15 and is appended.
The resulting list is `[10, 11, 13]`.

## Complexity

Let w equal `high - low + 1`.
Both references take O(n + w) worst-case time because the input pointer advances at most n times.
Auxiliary working space is O(1), with O(w) possible output storage.
Java additionally uses a temporary boxed list before creating the returned primitive array.

## Edge cases

An empty input makes every candidate missing.
Duplicates and values outside the range are harmless because pointer advancement compares values rather than indices.

## Common mistakes

The upper range endpoint is inclusive.
Do not append a candidate merely because earlier array entries are smaller; first finish advancing the pointer.

## Language notes

Python's `range` ends at `high + 1`.
Java uses a `long` loop variable so incrementing a large upper endpoint is safe.
