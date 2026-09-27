## Intuition

After sorting, fixing one value reduces the problem to finding pairs with a specific sum in the remaining suffix.
Two pointers can scan that suffix without checking every pair.
Skipping repeated anchor and pair values prevents duplicate value triples.

## Brute force

Enumerate every triple of different indices and deduplicate the successful value triples.
This takes O(n³) time before deduplication overhead, which is too expensive for 3,000 entries.

## Approach

1. Sort `nums` and initialize `result`.
2. Choose each `anchor` that leaves at least two later positions, skipping equal consecutive anchor values.
3. In `collectPairs` (`_collect_pairs` in Python), place `left` immediately after the anchor and `right` at the end.
4. If `total` is negative, increment `left`; if positive, decrement `right`.
5. If `total` is zero, append the triple, move both pointers inward, and skip repeated left values.

Sorting makes pointer movement safe: increasing the smaller value is the only direction that can repair a sum that is too small.
After a match, the fixed anchor and left value uniquely determine the required right value, so skipping duplicate left values is sufficient.

## Walkthrough

Example 1 sorts to `[-2, -1, -1, 0, 2, 2]`.

| Anchor value | Pair values examined | Action |
| --- | --- | --- |
| -2 | -1, 2 | Total -1; advance left |
| -2 | -1, 2 | Total -1; advance left |
| -2 | 0, 2 | Record `[-2, 0, 2]` |
| -1 at index 1 | -1, 2 | Record `[-1, -1, 2]` |
| -1 at index 1 | 0, 2 | Total 1; retreat right |
| -1 at index 2 | Not scanned | Duplicate anchor |
| 0 | 2, 2 | Total 4; retreat right |

The two recorded triples form the answer.

## Complexity

- Time: O(n²), from O(n) two-pointer scans, plus O(n log n) sorting.
- Space: O(n + k) as a conservative upper bound including sorting storage and k returned triples; the scan itself uses O(1) extra state.

## Edge cases

All zeros produce exactly one triple when there are at least three entries.
Repeated values may form a valid triple as long as their indices differ.
Arrays with no zero-sum triple return an empty result.

## Common mistakes

- Returning indices instead of values changes the contract.
- Failing to skip equal anchors duplicates answers.
- Starting `left` at the anchor reuses an input position.

## Language notes

Both references sort the input in place.
Java returns `List<List<Integer>>` and extracts duplicate advancement into `nextDistinct`.
Python skips duplicate left values after moving both pointers; these update orders produce the same triples.
The sum of three bounded input values fits Java `int`.
