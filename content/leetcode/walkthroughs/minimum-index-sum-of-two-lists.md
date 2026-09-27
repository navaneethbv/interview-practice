## Intuition
Each restaurant in the first list has an index representing its preference rank.
Store those indices, then scan the second list and keep names whose combined index sum is smallest.
A single best sum and result list handle ties naturally.

## Brute force
Comparing every pair of restaurants from the two lists costs O(mn) time.
A map avoids searching the first list for every second-list entry.

## Approach

1. Map each restaurant in `list1` to its index.
2. Scan `list2` from left to right.
3. For a name present in both lists, compute `index1 + index2`.
4. If that sum is smaller than the current best, replace the result list with this name.
5. If it equals the best, append the name.
6. The second-list scan order does not define the required output order, so the implementation preserves the discovered tie order accepted by the problem contract.

## Walkthrough
For Example 1, `list1 = ["a", "b", "c"]` and `list2 = ["c", "b", "a"]`.
Each shared name has index sum 2, so the scan appends `c`, then `b`, then `a` as ties are found.
The result contains all three names, preserving the local tie order accepted by the contract.

## Complexity
Building the map visits all characters in the first list names, so its work is proportional to their total character count.
Scanning the second list uses expected hash lookups, with hashing work proportional to each name length.
For total input character count T, expected time is O(T), with O(m) map entries for the first list and O(min(m,n)) output references.
The map and output reuse the input names rather than copying their contents.

## Edge cases
A shared restaurant at index zero contributes no extra index cost.
Several names can tie for the minimum and all must be returned.
The contract provides at least one shared restaurant.

## Common mistakes
Use zero-based indices, as the input lists do.
Clear the answer when a strictly smaller sum appears.
Do not replace a tie with only the later name.

## Language notes
Python uses a dictionary and list of result names.
Java uses a `HashMap` and an `ArrayList` while scanning the second list.
