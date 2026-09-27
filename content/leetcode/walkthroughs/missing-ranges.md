## Intuition

Track the next value that has not yet been accounted for.
Every sorted input value closes a missing range immediately before it, then advances the next candidate past that value.

## Brute force

Testing every number from lower through upper can take O(range) time.
The sorted input lets one pass skip whole present intervals.

## Approach

1. Set nextMissing to lower.
2. For each value, add nextMissing through value minus one when nonempty.
3. Set nextMissing to value plus one.
4. Add the final range through upper.

## Walkthrough

Example 1:

For nums [2,4,7], lower 1, and upper 8, the first gap is [1,1].
Value 4 closes [3,3], and value 7 closes [5,6].
After the final value, the remaining gap is [8,8].

## Complexity

The scan takes O(n) time and the output uses O(R) range storage.
Python avoids an upper-plus-one sentinel copy, while Java uses long boundaries to avoid overflow.
Both use O(1) auxiliary state beyond the output.

## Edge cases

An empty input returns [lower,upper] when the interval is nonempty.
Values at the bounds create no range before or after them.
The input is sorted and contains no duplicates under the standard contract.

## Common mistakes

Use value minus one for the closed gap endpoint.
Advance after every present value.
Keep missing ranges inclusive at both ends.

## Language notes

Python appends integer pairs directly.
Java casts validated long boundaries back to int for the required result type.
The long state protects the value immediately above the integer upper bound.
