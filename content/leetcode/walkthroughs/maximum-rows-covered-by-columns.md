## Intuition
A row is covered when its set of one-columns is a subset of the selected columns.
With at most twelve columns, every selection can be represented by a bit mask and enumerated directly.
This turns row coverage into one bitwise subset test.

## Brute force
The mask enumeration is the bounded brute force and is already optimal for the given dimensions.
Another direct version would copy a selected-column set and scan every row and column for each choice.
Masks avoid repeated membership structures and keep the inner test small.

## Approach
1. Convert each row into a bit mask whose set bits mark its ones.
2. Enumerate all masks over the columns.
3. Keep only masks with exactly `numSelect` set bits.
4. Count rows where `(rowMask & selectedMask) == rowMask`.
5. Return the largest count.

## Walkthrough
Example 1 has rows `[1,0]`, `[0,1]`, and `[0,0]`, with one column selected.
Selecting column 0 gives mask `01` and covers the first row plus the all-zero row.
Selecting column 1 gives mask `10` and covers the second row plus the all-zero row.
Both choices cover two rows, so the answer is 2.

## Complexity
The row-mask preprocessing costs O(RC).
Python enumerates `choose(C, K)` combinations, builds each selected mask in O(C) time, and scans R rows, for O(RC + choose(C, K)(C + R)) time.
Java enumerates all O(2^C) masks and scans R rows for selected masks, for O(RC + 2^C R) time.
The converted row masks use O(R) space, while Python's current combination uses O(C) temporary space.

## Edge cases
An all-zero row has mask zero and passes every selected mask.
Selecting all columns covers every row because every row mask is a subset.
Rows with more ones than the selection count cannot be covered.

## Common mistakes
Counting a row when it shares at least one selected column is too weak.
Forgetting the exact bit-count condition allows selecting too few or too many columns.
Treating rows as columns reverses the subset relationship.

## Language notes
Python builds masks with shifts and uses `itertools.combinations` for exact selections.
Java enumerates all masks and filters with `Integer.bitCount`.
Both use integer masks safely because the column count is at most twelve.
