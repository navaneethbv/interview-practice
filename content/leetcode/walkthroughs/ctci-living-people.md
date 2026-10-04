## Intuition

A person's lifetime contributes one to every year from birth through death, including both endpoints.
Instead of incrementing every year separately, record when that contribution begins and when it stops.
A prefix sum then reconstructs the number alive in each year.

## Brute force

For each candidate year, scan every person and test whether the year lies within their lifetime.
This takes O(nY) checks over n people and Y years, repeating the same interval comparisons.

## Approach

Allocate `deltas` for years 1900 through 2000 plus a stopping slot.
For each person, add one at the birth-year offset and subtract one at the year after death.
Scan years in increasing order, adding each delta to `alive`.
Update `best_year` only when the count strictly exceeds `best`.
This preserves the earliest year whenever several years share the maximum population.

## Walkthrough

Example 1 has lifetimes 1900 to 1970, 1950 to 1990, and 1960 to 1965.
The running count becomes one in 1900, two in 1950, and three in 1960.
It stays three through 1965, then falls to two in 1966.
The remaining deaths later decrease it further.
The first year reaching the maximum of three is 1960, so return 1960.

## Complexity

For n people and a year range of size Y, time is O(n + Y) and auxiliary space is O(Y).
Because this exercise fixes Y at 101 years, the range storage is bounded and runtime is effectively linear in n.

## Edge cases

A person born and deceased in the same year counts during that year.
Death in 2000 uses the extra slot representing 2001.
Tied maxima return the earliest year.

## Common mistakes

Subtracting at the death year incorrectly excludes that person's final year.
Updating the best year on equality selects the latest maximum instead of the earliest.

## Language notes

Both references store integer deltas and maintain a running total.
Offsets relative to `FIRST_YEAR` keep the array compact and remove the need for a map keyed by full calendar years.
