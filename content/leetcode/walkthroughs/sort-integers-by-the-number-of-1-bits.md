## Intuition

The primary key is each number's population count, and the numeric value breaks ties.
Sorting with that pair key directly expresses both ordering rules.

## Brute force

Repeatedly selecting the smallest remaining pair would add O(n^2) scanning.
One comparison sort is simpler and matches the required total order.

## Approach

1. Compute the number of set bits for each comparison.
2. Compare bit counts first.
3. Compare numeric values when counts tie.
4. Return the sorted array.

## Walkthrough

For Example 1, `[0,1,2,3,4]` has bit counts 0, 1, 1, 2, and 1.
The one-bit values are 1, 2, and 4, so they appear in numeric order.
Value 3 has two bits and moves after them, producing `[0,1,2,4,3]`.

## Complexity

Sorting n values costs O(n log n) comparisons, and each bit count is O(1) for the fixed integer width.
Python's `sorted` creates an O(n) copy and returns it.
Java boxes values into an O(n) `Integer[]`, sorts it, and writes back into the supplied array.

## Edge cases

Equal values preserve identical entries.
Zero has zero set bits and comes first for nonnegative inputs.
Tie-breaking by numeric value is required even when bit counts match.
Numbers with the same population count can be far apart numerically, so the second key must be applied after the bit count comparison.
The method keeps every input occurrence, including duplicates.

## Common mistakes

Sort by the bit count alone.
Treat the decimal digit count as a bit count.
Forget that the Java output must be a primitive `int[]`.

## Language notes

Python uses `int.bit_count()` in its key.
Java uses `Integer.bitCount` inside the comparator.
