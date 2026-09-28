## Intuition
Each person increases the population at their birth year and stops contributing at their death year.
Because death is exclusive, a change at a death year must be applied before counting that year.
The earliest year attaining the largest running total is the required answer.

## Brute force
For every year from 1950 through 2049, we could scan every log and count people alive in that year.
With L logs and Y possible years this costs O(LY) time, although the small year range makes it workable.
The difference array removes the repeated scan over logs.

## Approach
1. Use a difference array whose index is a year offset from 1950.
2. Add one at each birth offset and subtract one at each death offset.
3. Sweep the offsets in increasing order while maintaining the current population.
4. Replace the answer only when the population is strictly larger, which preserves the earliest tie.

## Walkthrough
Example 1 has logs `[1950, 1960]` and `[1955, 1965]`.
The first log contributes `+1` at 1950 and `-1` at 1960.
The second contributes `+1` at 1955 and `-1` at 1965.
The sweep sees population 1 at 1950 and records 1950 first.
At 1955 the running total becomes 2, so the answer changes to 1955.
At 1960 the first person leaves and the total returns to 1.
No later year exceeds 2, so the returned year is 1955.

## Complexity
The sweep uses O(Y) time after O(L) updates, where Y is the fixed 100 year range.
The difference array uses O(Y) additional space.

## Edge cases
A person born in 1950 is included immediately.
A person dying in 1960 is excluded from 1960 because the death endpoint is exclusive.
If several years tie, strict comparison keeps the earliest one.

## Common mistakes
Treating death as inclusive shifts population changes one year too late.
Updating the answer on `>=` returns the latest tied year instead of the earliest.
Scanning only years that appear in births misses years where a population continues unchanged.

## Language notes
Python and Java both store the small year offsets in integer arrays.
Java uses an explicit `int[]` and loop variables, while Python's list provides the same mutable difference array.
Neither implementation needs floating point arithmetic or a special integer type for these bounded populations.
