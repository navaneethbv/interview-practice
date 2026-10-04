## Intuition

An artist with many remaining songs is the hardest one to separate.
Prefer the most frequent available artist, but temporarily withhold the artist used for the previous song.
That delay guarantees adjacent choices differ without repeatedly searching the whole catalog.

## Brute force

Try every permutation of song titles and reject adjacent equal artists.
There can be factorially many permutations, even though only artist frequencies constrain feasibility.

## Approach

Group titles by artist in `by_artist` and keep a maximum-priority queue ordered by remaining group size.
Remove the highest-priority artist, take one of its titles, and append it to `playlist`.
Only after this selection, return the previously `held` artist to the heap.
Hold the artist just used if it still has titles remaining.
Choosing the largest available group prevents a scarce separator from being spent while a more urgent group grows disproportionately large.
If the heap empties while an artist remains held, no different artist can separate its remaining songs, so return an empty list.
Otherwise the completed sequence uses each title exactly once.

## Walkthrough

Example 1 groups `a` and `b` under X and `c` under Y.
The references pop the most recently stored X title, so they may produce `b` first.
X is held while Y supplies `c`.
X becomes available again and supplies `a`, producing `b, c, a`.
The displayed `a, c, b` is equally valid because the checker accepts any arrangement satisfying the adjacency rule.

## Complexity

For n songs and a artists, grouping costs O(n).
Heap operations cost O(n log a), with O(n + a) stored titles, heap entries, and output.

## Edge cases

An empty input returns an empty playlist.
One artist with multiple songs is impossible; a single song is valid.

## Common mistakes

Reinserting the selected artist before choosing the next artist permits an invalid immediate repeat.
Do not compare against only the displayed sample ordering.

## Language notes

Python negates counts for `heapq` and uses artist names as deterministic tie breakers.
Java's comparator reads remaining deque sizes; those sizes change only while their artist is outside the heap.
