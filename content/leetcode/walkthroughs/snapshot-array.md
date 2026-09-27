## Intuition

A snapshot does not need a complete copy of the array.
For each index, record only the versions in which its value changed.
Reading an old snapshot then means finding the latest recorded version that is no later than the requested snapshot.

## Brute force

Copying all L cells during every `snap()` costs O(L) time per snapshot and O(L S) storage for S snapshots.
This wastes work when only a few indexes change between snapshots.
Separate per-index histories store only relevant updates and make snapshot creation constant time.

## Approach

1. Initialize each entry in `history` with `(0,0)` and set `version` to zero.
2. In `set`, overwrite the final entry if it already belongs to the current version; otherwise append a new entry.
3. In `snap`, return the current version and increment it for future writes.
4. In `get`, binary search the index's history for the first entry whose version exceeds `snap_id`.
5. Return the value in the immediately preceding entry.

Histories stay sorted because version numbers only increase.
Multiple writes before the same snapshot need only their final value.

## Walkthrough

Example 1 constructs an array of length two.
Only index zero changes.

| Operation | History at index 0 | Result |
| --- | --- | --- |
| set(0,5) | [(0,5)] | null |
| snap() | [(0,5)] | 0 |
| set(0,8) | [(0,5),(1,8)] | null |
| get(0,0) | unchanged | 5 |
| snap() | unchanged | 1 |
| get(0,1) | unchanged | 8 |

For snapshot zero, the first entry with a larger version is `(1,8)`, so the preceding value is five.

## Complexity

Construction costs O(L) time and space.
A set operation is amortized O(1), and snap is O(1).
A get operation costs O(log(h + 1)) for h entries in that index's history.
Total storage is O(L + U), where U counts appended updates across distinct index-version pairs.

## Edge cases

Unwritten indexes return zero.
Repeated snapshots without writes preserve the most recent value.
Several writes in one version overwrite one history entry.
Queries always reference an existing snapshot under the contract.

## Common mistakes

- Mutating an entry from an older version changes saved snapshots.
- Searching for an exact version fails when the cell did not change in that snapshot.
- Incrementing the version before returning it makes the first snapshot id incorrect.

## Language notes

Python replaces a tuple when updating the current version.
Java changes the value field in its current-version integer pair.
Both use a half-open binary search and access the preceding entry only after finding the upper bound.
