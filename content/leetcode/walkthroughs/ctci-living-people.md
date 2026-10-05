## Intuition

Each birth increases the living count at one year, and each death decreases it after the death year because death is inclusive.
A prefix sum over those changes gives the number alive in every year.

## Brute force

For every year, count every person whose birth is at most that year and whose death is at least that year.
That takes O(n) work per year and repeats the same lifetime checks.

## Approach

Create a delta array covering 1900 through 2001.
Add one at birth and subtract one at death plus one.
Scan years from 1900 through 2000, accumulating alive.
Update the best year only when alive is strictly greater, which preserves the earliest year on ties.

## Walkthrough

In Example 1, the person born in 1960 contributes at 1960 and stops contributing after 1965.
The other lifetimes are added and removed at their inclusive boundaries.
The running count reaches its first maximum in 1960, so best_year becomes 1960.
A later year with the same count would not replace it because the update uses greater than only.

## Complexity

Building deltas takes O(n) time.
The year scan covers a fixed 101-year range, so total time is O(n) for the stated domain.
The delta array has constant size and uses O(1) extra space.

## Edge cases

A person born and dying in the same year contributes exactly one year.
Deaths in 2000 subtract at index 2001, outside the scanned years.
All people can share one birth year, producing that year as the maximum.
Tied maxima return the earliest year by scan order.

## Common mistakes

Subtracting at death instead of death plus one makes death years incorrectly exclusive.
Updating on greater than or equal replaces an earlier tied year.
Scanning outside the stated year range adds unsupported candidates.

## Language notes

Python uses constants FIRST_YEAR and LAST_YEAR to size and scan the array.
Java uses the same constants and an int array with one sentinel slot.
Both references avoid sorting the birth and death arrays.
