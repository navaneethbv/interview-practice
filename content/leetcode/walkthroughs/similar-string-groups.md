## Intuition
Under the given anagram guarantee, two strings are similar when they differ at zero or two positions, because one swap can transform one into the other.
Union similar pairs so connected components represent groups.

## Brute force
A naive approach runs a graph search from every string and compares all neighbors repeatedly.
Comparing every pair already costs O(S^2 L) for S strings of length L, while repeated searches add avoidable work.
Union-find keeps the pair scan and merges components incrementally.

## Approach
1. Start each string in its own component.
2. Compare every pair and count differing positions.
3. Union the pair when the difference count is at most two.
4. Count distinct roots after all unions.

## Walkthrough
Example 1 is `tars, rats, arts, star`.
`tars` and `rats` differ at two positions, so they join a component.
`rats` and `arts` also differ at two positions, joining `arts` to that component.
`star` differs from each of those three strings in four positions, so it remains separate.
The local expected result is 2, because `tars`, `rats`, and `arts` form one group while `star` forms the other.
The method returns 2.

## Complexity
For S strings of length L, pair comparison costs O(S^2 L) time.
Union by size with path compression adds O(S^2 alpha(S)) amortized work, for O(S^2 (L + alpha(S))) total time.
The parent and size arrays and root set use O(S) auxiliary space.

## Edge cases
Identical strings are similar and merge immediately.
A one-character string forms its own group unless another identical string exists.
A difference count above two cannot be fixed by one swap.

## Common mistakes
Treating one differing position as a valid swap ignores that swaps preserve character counts.
Counting pairs instead of connected components misses transitive similarity.
Comparing only adjacent input strings misses valid nonadjacent unions.

## Language notes
Python uses `zip` to count position differences.
Java compares indexed characters and uses an integer parent array with path compression.
