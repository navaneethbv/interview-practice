## Intuition

After removing one set, an element survives the intersection only if it appeared everywhere originally or was missing solely from the removed set.
Element frequencies therefore describe every candidate intersection without constructing it.
Elements absent from two or more sets cannot help any exclusion.

## Brute force

For each possible excluded index, intersect all the other sets from scratch.
This repeats nearly the same membership work n times and can take O(nM) time for M total input elements.

## Approach

Count how many sets contain each value in `counts`.
Since each input group contains distinct values, one occurrence means membership in one set.
Compute `everywhere`, the number of frequencies equal to n, and `missing_one`, the number equal to n - 1.
For a candidate group, subtract from `missing_one` those near-universal values present in that group.
Only the near-universal values absent from the excluded group become universal among the survivors.
Add `everywhere` and update the best index only on a strictly larger size, preserving the earliest tie.

## Walkthrough

Example 1 has four sets.
Value 1 occurs four times, so `everywhere = 1`.
Value 2 occurs three times, so `missing_one = 1`; all other values occur too rarely.
Set 2 is the only set missing value 2.
Excluding it leaves intersection `{1, 2}` of size two, while the other exclusions leave only `{1}`.
The answer is index 2.

## Complexity

For n sets and M total entries, expected time is O(n + M).
The frequency map uses O(U) space for U distinct values.

## Edge cases

For one set, excluding it leaves the defined empty intersection and returns 0.
Empty groups are allowed and can be the best exclusion.

## Common mistakes

Use strict improvement to honor the smallest-index tie rule.
Do not treat repeated appearances within a group as separate memberships; the contract guarantees distinctness there.

## Language notes

Python uses a dictionary and generators for the counts.
Java uses `HashMap.merge` and explicit loops, with the same frequency categories.
