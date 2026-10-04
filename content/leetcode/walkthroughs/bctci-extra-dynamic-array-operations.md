## Intuition

Separate logical length from backing capacity.
Only the prefix of `values` before `length` belongs to the array, allowing deletion to leave stale storage while insertion shifts the live suffix.

## Brute force

Allocating an exact sized array for every append causes quadratic copying across a growing sequence.
Doubling capacity only when full spreads allocation cost over many operations, while indexed edits still shift affected elements.

## Approach

`insert` grows if needed, shifts entries right, writes `x`, and increments `length`.
`pop` saves the removed value and shifts later entries left.
`remove` finds the first match and delegates to `pop`; `contains` scans the live prefix.

## Walkthrough

Example 1 appends 1, 2, and 3, leaving logical contents `[1, 2, 3]`.
`pop(1)` saves 2 and shifts 3 into index 1, giving `[1, 3]`.
The next `get(1)` returns 3 and `size()` returns 2.

## Complexity

`get`, `set`, `size`, and `pop_back` take O(1).
Append is amortized O(1), but a growing append can take O(n).
Indexed insert, pop, contains, and remove take O(n) worst case.
Storage is O(p), where p is peak length.

## Edge cases

Insertion at `length` appends without shifting.
Removing an absent value returns -1 and preserves contents.
Duplicates remain except for the first matched occurrence.
Empty capacity slots must never count as actual stored zeros.

## Common mistakes

Shift right from the end when inserting, or unread values will be overwritten.
Shift left from the removal point when deleting.
Use logical length for membership checks, and distinguish `pop`, which returns a value, from void `pop_back`.

## Language notes

Python explicitly allocates and copies fixed capacity lists.
Java uses `Arrays.copyOf` and overlapping `System.arraycopy` calls.
The spec maps Python `pop_back` to Java `popBack`; neither method returns the removed value.
