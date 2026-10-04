## Intuition

To find the next number with the same number of one bits, move the rightmost non-trailing zero upward and pack the remaining ones as far right as possible.
The previous number performs the symmetric operation around the rightmost non-trailing one.

## Brute force

Testing every larger or smaller integer and counting its one bits eventually finds an answer.
That can require many candidates and does not use the structure of the trailing bit runs.

## Approach

For next, count trailing zeros followed by consecutive ones.
If the combined run reaches the signed 32-bit limit, no valid larger value exists.
Otherwise apply n plus 2 to the power zeros plus 2 to the power ones minus one minus one.
For previous, count trailing ones, reject when no higher one exists, then count the following zeros.
Apply n minus 2 to the power ones minus 2 to the power zeros minus one plus one.

## Walkthrough

In Example 1, 13 is binary 1101.
For next, it has zero trailing zeros and one trailing one, so the formula changes 1101 to 1110, or 14.
For previous, it has one trailing one and one following zero, producing 1011, or 11.
Both results preserve two one bits and are the closest values on their respective sides.

## Complexity

Each helper examines at most 32 bits, so the total time is O(1).
The methods use O(1) extra space.

## Edge cases

For n equal to 1, no smaller positive value with one set bit exists.
A value with all low bits set can have no previous candidate when its higher bits are zero.
Values near the signed limit can have no next candidate.
The result uses negative one only for a missing side.

## Common mistakes

Counting all set bits instead of the trailing runs loses the nearest-candidate arrangement.
Moving the selected one without repacking remaining ones can skip a closer answer.
Allowing the highest sign bit to become set violates the positive 32-bit signed contract.

## Language notes

Python shifts positive n until each relevant run ends.
Java uses the same formulas and int bit operations because n is positive.
Both return the pair in larger, smaller order specified by nextNumbers.
