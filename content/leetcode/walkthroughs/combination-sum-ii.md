## Intuition

This version allows each array position to be used at most once, so recursion must move past the chosen index.
Duplicate values can still appear in the input, but equal values at the same recursion depth would create identical combinations.
Sorting makes those siblings adjacent and also enables the remaining-target cutoff.

## Brute force

Enumerating every subset and checking its sum is correct, but it explores all 2^n choices before using the target.
It also produces duplicate value combinations when equal candidates occupy different positions.
Sorted backtracking rejects oversized branches and skips only duplicate siblings.

## Approach

1. Sort the candidates into sorted_candidates.
2. Define search(start_index, remaining, path) for the unused suffix.
3. Record a copied path when remaining reaches zero.
4. At one recursion depth, skip an index when it equals the previous value at that same depth.
5. Stop the loop when the sorted value exceeds remaining.
6. Recurse from index + 1, then undo the choice and continue.

The duplicate check uses index > start_index, so a second equal value may still be chosen after the first one has been selected deeper in the path.

## Walkthrough

Example 1 uses candidates = [1, 1, 2, 3] and target = 4.

| path | remaining | Decision |
| --- | ---: | --- |
| [] | 4 | choose the first 1 |
| [1] | 3 | choose the second 1, then 2 |
| [1, 1, 2] | 0 | record this combination |
| [1] | 3 | backtrack and choose 3 |
| [1, 3] | 0 | record this combination |
| [] | 4 | skip the second root-level 1 as a duplicate sibling |

The recorded answers are [[1, 1, 2], [1, 3]].

## Complexity

Let n be the number of candidates, B the number of visited search nodes, S the number of unique returned combinations, and L their maximum length.
Sorting costs O(n log n), search iteration is O(B × n) in a simple upper bound, and result copying costs O(S × L).
The total time is O(n log n + B × n + S × L), with O(n) recursion space plus O(S × L) output space.

## Edge cases

An empty candidate list returns no combination unless the target is zero, which records the empty path.
A value equal to the remaining target is recorded before deeper choices.
Repeated input values can be used as separate positions when selected at different depths.
Positive candidates make the sorted early break valid.

## Common mistakes

- Skipping every repeated value prevents valid results such as [1, 1, 2].
- Reusing an index solves Combination Sum instead of this one-use variant.
- Checking duplicates across all levels removes legitimate repeated values.
- Forgetting to copy path corrupts combinations during backtracking.

## Language notes

Python's sorted_candidates leaves the input list unchanged.
Java sorts the input array and uses an ArrayList copy at a result leaf.
Both use start_index and index + 1 to express one-use selection.
