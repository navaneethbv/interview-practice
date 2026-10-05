## Intuition

Each genre is already sorted, so its best unchosen song is always at the front of its remaining suffix.
The global next song must be one of those genre fronts.
A heap merges these sorted streams while reading only as far as the requested k results.

## Brute force

Flatten every song into one list and sort by play count and tie rules.
That takes O(N log N) time for N total songs, even when only a small prefix is needed.

## Approach

Insert each genre's first position into `heap`.
Use descending play count, then ascending genre index, then ascending within-genre index as the rank.
Pop the best entry and append its title to `result`.
If that genre has another song, insert its next position.
Repeat until k titles have been emitted.
The heap always contains exactly the first unchosen song from each nonexhausted genre, so its best entry dominates every unseen song behind those fronts.

## Walkthrough

Example 1 starts with genre fronts having 123, 217, and 184 plays.
Pop `Ring Of Firewalls` at 217, exhausting its genre.
Next pop `Boolean Rhapsody` at 184 and reveal `Merge Together` at 119.
Then pop `Coding In The Deep` at 123, followed by `Merge Together` at 119.
That reveals `Hey Queue` at 102, which outranks the remaining front at 99.
These five titles are the requested ordered result.

## Complexity

With G genres, Python heapifies in O(G), then performs O(k log(G + 1)) selection work.
Java inserts initial fronts individually, adding O(G log(G + 1)) setup time.
The heap uses O(G) space, excluding the O(k) result.

## Edge cases

A genre with one song disappears after its first pop.
Equal play counts are resolved by genre index, and songs in one genre retain their input order.

## Common mistakes

Do not use alphabetical title order for ties in this problem.
Push only the next song from the genre just popped.

## Language notes

Python negates play counts in heap tuples.
Java stores genre/index pairs and compares their counts directly using `Integer.compare`.
