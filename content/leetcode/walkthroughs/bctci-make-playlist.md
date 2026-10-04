## Intuition

An artist with many remaining songs is the hardest one to separate.
Choose the most numerous available artist next, but temporarily withhold the artist used immediately before it so that adjacent songs always differ.

## Brute force

Try permutations of all titles and check adjacent artists.
There can be n factorial permutations, even though titles by the same artist have identical effects on the adjacency constraint.

## Approach

Group titles in `by_artist` and place artist counts in a maximum-priority heap.
Pop an available artist, take one of its titles, and append that title to `playlist`.
Only after choosing it should the previous `held` artist return to the heap.
Hold the newly used artist if it still has songs.
If the heap becomes empty while an artist remains held, no separator remains and the algorithm returns `[]`.
Otherwise every title has been placed successfully.

## Walkthrough

Example 1 has titles a and b by X, and c by Y.
The reference stores X's titles as a stack, so it may select b first, then c, then a.
While X is held after b, only Y is eligible.
The resulting `["b", "c", "a"]` is accepted just like the statement's `["a", "c", "b"]`, because both alternate artists and use every title exactly once.

## Complexity

With n songs and a artists, heap operations take O(n log(a + 1)) time.
Grouping, the heap, and output use O(n + a) space, or O(n) overall.

## Edge cases

An empty collection returns empty successfully.
One song is valid.
An artist appearing more than the other songs plus one makes a complete alternating playlist impossible.

## Common mistakes

Reinserting the held artist before selection can immediately choose it again.
Do not compare the result against one exact ordering when the contract permits any valid playlist.

## Language notes

Python simulates a max-heap with negative counts.
Java orders artist names by their current remaining deque sizes, changing a size only while that artist is outside the priority queue.
