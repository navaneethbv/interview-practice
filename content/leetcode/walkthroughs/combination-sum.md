## Intuition

A combination can reuse a candidate, so after choosing a value the next search may start at that same index.
Sorting candidates lets the search stop as soon as a value exceeds the remaining target.
The path records one nondecreasing combination, which prevents different orderings of the same values.

## Brute force

A naive recursive search tries ordered candidate choices until their running sum reaches or passes the target.
For c candidates and depth bound D = floor(target / m), where m is the smallest candidate, a loose bound is O(c^(D + 1)) for c >= 2, or O(D) with one candidate.
It repeats equivalent orders such as [2,5] and [5,2]; the sorted search avoids those duplicate branches.

## Approach

1. Sort the candidates into sorted_candidates.
2. Define search(start_index, remaining, path) for the next reusable candidate and remaining sum.
3. When remaining is zero, copy path into result.
4. Iterate from start_index, stop when a candidate is too large, and append a chosen value.
5. Recurse with the same candidate index and a smaller remaining sum, then remove the value before trying the next choice.
6. Start with index zero and the full target.

The same index in the recursive call allows unlimited reuse.
Because each call only chooses the current index or a later index, the values in each path stay sorted.

## Walkthrough

Example 1 uses candidates = [2, 5, 7] and target = 7.

| path | remaining | Decision |
| --- | ---: | --- |
| [] | 7 | choose 2 |
| [2] | 5 | choose 2 again |
| [2, 2] | 3 | choose 2, then reach remaining 1 |
| [2, 2, 2] | 1 | every candidate is too large, backtrack |
| [2] | 5 | choose 5 |
| [2, 5] | 0 | copy [2, 5] |
| [] | 7 | choose 5, then backtrack |
| [] | 7 | choose 7 |
| [7] | 0 | copy [7] |

The returned combinations are [[2, 5], [7]], independent of traversal order.

## Complexity

Let c be the number of candidates, B the number of visited search nodes, S the number of returned combinations, and L their maximum length.
Sorting costs O(c log c), search iteration is O(B × c) in a simple upper bound, and copying results costs O(S × L).
The total time is O(c log c + B × c + S × L), where B is bounded by the exponential path count above.
The recursion path and sorted candidate copy use O(L + c) auxiliary space, while returned combinations use O(S × L) space.

## Edge cases

A target of zero records one empty combination at the root.
Candidates larger than the remaining target are skipped by the sorted break.
A target that cannot be formed returns an empty list.
Candidates are positive, so recursive remaining values strictly decrease.

## Common mistakes

- Advancing to index + 1 forbids the reuse required by this problem.
- Omitting sorting prevents the early break and can waste substantial search.
- Adding the mutable path itself lets later backtracking change saved results.
- Treating different orderings as separate answers creates duplicates.

## Language notes

Python uses sorted_candidates without changing the caller's list.
Java sorts the input array in place, then passes the same array to search.
Both implementations copy the path only when a complete combination is found.
