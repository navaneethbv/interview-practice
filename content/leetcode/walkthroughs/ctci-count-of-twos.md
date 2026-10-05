## Intuition

Count the digit 2 independently at each decimal position.
At a chosen position, the digits above it determine complete repeating cycles, the current digit determines whether an extra partial cycle exists, and the lower digits contribute only when the current digit is exactly 2.

## Brute force

Converting every integer from zero through n to text and counting its 2 characters is easy to verify.
It takes O(n log n) digit work and cannot scale to a billion.

## Approach

For each power of ten, split n into higher, current, and lower parts around that position.
If current is below 2, only the higher complete cycles contribute higher times power.
If current is 2, add lower plus one for the partial cycle.
If current is above 2, one additional complete block contributes another power.
Advance power by multiplying it by ten until it exceeds n.

## Walkthrough

In Example 1, n is 25.
At the ones position, higher is 2 and current is 5, so the contribution is 3, representing 2, 12, and 22.
At the tens position, current is 2 and lower is 5, so the contribution is 6 for 20 through 25.
The total is 9.

## Complexity

There are O(log n) decimal positions, and each uses constant arithmetic.
The algorithm takes O(log n) time and O(1) extra space.
The loop performs no work for n equal to zero, correctly returning zero.

## Edge cases

Numbers with a current digit below 2 use only complete cycles.
Numbers ending in 2 include all lower suffixes through n.
The number zero contains no digit 2 for this counting range.
Java uses long intermediates even though the returned result is an int.

## Common mistakes

Using lower plus one when current is greater than 2 overcounts the partial cycle.
Forgetting the current position's power in the complete-cycle term shifts every count.
Counting only numbers containing a 2 misses values such as 22, which contribute twice.

## Language notes

Python computes the three parts with integer division and modulo.
Java iterates with a long power so power times ten remains safe during the loop condition.
Both references apply identical formulas before converting the final count to the required return type.
