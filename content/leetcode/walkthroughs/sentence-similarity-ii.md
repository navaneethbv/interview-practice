## Intuition
Similarity is transitive, so words connected by any chain belong to one disjoint-set component.
Two sentence positions are compatible when their words have the same component.

## Brute force
A graph search from each sentence word through all similar pairs can repeatedly traverse the same component.
With W words and E pairs, repeated searches can cost O(W(W + E)).
Union-find builds all components once.

## Approach
1. Initialize each word as its own parent when it is first seen.
2. Union the two words in every similarity pair.
3. Reject different sentence lengths.
4. Compare roots at each aligned position.

## Walkthrough
Example 1 compares `[fast, car]` with `[quick, auto]`.
The pairs connect `fast` to `rapid`, `rapid` to `quick`, and `car` to `auto`.
Union operations place fast, rapid, and quick in one component.
They place car and auto in a second component.
The first aligned words have equal roots, and the second aligned words also have equal roots.
The method returns `true`.

## Complexity
With W distinct words, E pairs, and N sentence positions, union by size with path compression costs O((W + E + N) alpha(W)) amortized time.
The parent and size maps use O(W) space.
Python and Java both use iterative path compression and union by size in this reference.

## Edge cases
Identical words match even without a pair because they initialize to the same root.
Different sentence lengths fail immediately.
A word absent from the pair list remains isolated.

## Common mistakes
Comparing only direct pairs misses transitive similarity.
Unioning words by literal labels without finding roots can create incorrect chains.
Forgetting to initialize sentence words makes unknown words appear connected.

## Language notes
Python accepts the list-of-lists pair contract directly.
Java uses `List<List<String>>` and a `Map<String, String>` with iterative compression.
