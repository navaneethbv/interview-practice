## Intuition

Every valid transformation changes one character and must remain in the dictionary.
Breadth-first search discovers words by shortest distance.
Recording every parent from the previous level preserves all shortest paths, and a backtracking pass reconstructs them.

## Brute force

A naive method could enumerate all word sequences and reject sequences that repeat or exceed the shortest length.
The number of sequences is exponential in dictionary size.
BFS limits parent recording to shortest levels before reconstruction.

## Approach

1. Put dictionary words in a remaining set and return empty when endWord is absent.
2. Expand one BFS level by changing each character to every lowercase letter.
3. Record every current-level parent that discovers a word in the next level.
4. Remove a completed next level only after all current words have contributed parents.
5. Backtrack from endWord through parents and reverse each built path.

## Walkthrough

Example 1 transforms hit to cog.
The first level discovers hot, then the next levels discover dot and lot.
From dot and lot, dog and log are reached, and both parents are retained for cog.
Backtracking yields hit,hot,dot,dog,cog and hit,hot,lot,log,cog.
Both paths have the shortest transformation length.

## Complexity

Let W be the number of words and L their common length.
Generating candidates costs O(26 times W times L squared) because each mutation copies O(L) characters in Python and Java.
The parent graph can contain E shortest-level edges, so its storage is O(W plus E), while Q returned paths of H words use O(QH) output space.
The recursive reconstruction takes O(QH) output-copy time and keeps O(H) active path entries for one shortest path.

## Edge cases

If endWord is absent, no path is possible.
Multiple parents at the same shortest depth must all be retained.
A word discovered at an earlier level must not be re-added later.

## Common mistakes

- Removing words immediately during one level drops valid sibling parents.
- Stopping after the first parent loses alternate shortest paths.
- Using depth-first search alone does not establish minimum length.
- Backtracking without reversing produces paths from end to begin.

## Language notes

Python stores parent lists in defaultdict and recursively reconstructs paths.
Java uses character arrays for candidate generation and a mutable path list.
The Java recursion depth is bounded by the shortest path length, which is limited by the dictionary contract.
