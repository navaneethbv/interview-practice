## Intuition

A replacement can create a new equal block immediately to its left.
Keep the already processed prefix as a stack of runs so those newly adjacent values can combine without rescanning the entire array.
Each run records a value and its remaining multiplicity.

## Brute force

Repeatedly search from the beginning for the first compressible block, replace it, and restart.
Array shifting and repeated searches can require O(n²) time.

## Approach

Feed each original value into `_push` with count 1.
If the stack's last run has the same value, remove it and combine its count with the incoming count.
A count reaching `k` produces `count // k` copies of `value * k`, which are recursively pushed to handle cascades.
Any remainder is placed after those compressed copies.
Otherwise append the run unchanged.
The stack represents the fully reduced processed prefix, respecting the rule that the first eligible block is replaced before later ones.
Finally expand every stored run into individual result values.

## Walkthrough

Example 1 reads `[1, 9, 9, 3, 3, 3, 4]` with `k = 3`.
Before the third 3, the runs are `(1,1)`, `(9,2)`, and `(3,2)`.
The new 3 makes three copies, producing a single 9.
That 9 joins the earlier two 9 values, producing 27.
Appending 4 leaves the final expanded array `[1, 27, 4]`.

## Complexity

Every compression reduces the number of represented elements by at least one.
Charging stack work to insertions and reductions gives O(n) total time and O(n) space, including run storage and possible recursive cascades.

## Edge cases

An empty array stays empty.
If `k` exceeds the array length, no block is compressed; zero values still reduce their count even though their value stays zero.

## Common mistakes

A single pass that never revisits the preceding run misses cascades.
Preserve the remainder's position after the compressed values.

## Language notes

Python uses integer lists for runs.
Java stores `long` values and counts, then iterates its deque in reverse stack order to reconstruct the original left-to-right sequence.
