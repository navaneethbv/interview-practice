## Intuition

Every genre is already sorted by plays, so its best unreported song is always its current head.
The best remaining song overall must be one of these genre heads.
A priority queue merges those sorted sequences while producing only the requested k songs.

## Brute force

Flatten every genre and sort all songs by play count, genre index, and position.
This works but processes the entire catalog even when k is much smaller than the total number of songs.

## Approach

Insert the first song of every genre into a heap.
Each entry identifies a genre and position; priority is descending play count, then ascending genre index, then ascending position.
Repeatedly remove the best entry and append its title to `result`.
If its genre has another song, insert the next position from that same genre.
There is at most one heap entry per genre at a time, and all unrepresented songs follow their genre's represented head.
Stop as soon as `result` contains k titles.

## Walkthrough

Example 1 starts with genre-head play counts 123, 217, and 184.
The 217-play song, `Ring Of Firewalls`, is selected first and exhausts its genre.
Next comes `Boolean Rhapsody` at 184, exposing its successor at 119.
`Coding In The Deep` at 123 is next, followed by `Merge Together` at 119 and `Hey Queue` at 102.
The requested five titles are complete without outputting the remaining 99- and 98-play songs.

## Complexity

For g genres, Python heapifies in O(g), then performs O(k log g) heap work.
Java inserts initial heads individually, giving O((g + k) log g) time in the worst case.
Both use O(g) heap space and O(k) output space.

## Edge cases

A one-song genre simply disappears after selection.
When k equals the total song count, this becomes a complete multiway merge.

## Common mistakes

Do not insert all songs into the heap, which loses the bounded-frontier benefit.
Implement both tie breakers explicitly.

## Language notes

Python stores negative play counts in tuples, obtaining the tie rules lexicographically.
Java's comparator reads play counts through stored indices and uses `Integer.compare` rather than subtraction.
