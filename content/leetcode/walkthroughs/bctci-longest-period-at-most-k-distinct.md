## Intuition

A valid period is a contiguous window whose title-frequency map contains at most k keys.
When adding a new day makes too many distinct titles, removing days from the left is the only way to restore validity while retaining the new right endpoint.

## Brute force

For every starting day, extend the period while tracking a set of titles.
This can take O(n squared) total work, with heavily overlapping periods rebuilding much of the same information.

## Approach

Maintain `counts`, `left`, and `best` while advancing `right`.
Increase the entering title's count.
While the map has more than k keys, decrement the leaving title and delete its key when the count reaches zero, then advance left.
The resulting window is the longest valid one ending at right, so compare its length with best.
Titles that still occur elsewhere inside the window remain represented.

## Walkthrough

Example 1 has `book1, book1, book2, book1, book3, book1` with k two.
The first four days contain only book1 and book2, setting best to four.
Adding book3 introduces a third title.
Removing the first two book1 entries still leaves book1 present; removing book2 finally restores two distinct titles.
The final book1 extends this later window to three, so the answer stays 4.

## Complexity

Expected time is O(n) hash-table operations because each day enters and leaves once.
The frequency map stores O(min(n, k + 1)) entries, including the transient extra title before shrinking.
String hashing cost depends on title lengths.

## Edge cases

Empty input returns zero.
When k covers every distinct title, the full array qualifies.
Repeated occurrences of one title do not consume additional distinct-title budget.

## Common mistakes

Leaving zero-count keys in the map makes its size inaccurate.
Do not shrink only once when several earlier days must be removed.

## Language notes

Python explicitly deletes exhausted dictionary entries.
Java uses `merge` with -1 and removes the key only when the resulting count is zero.
