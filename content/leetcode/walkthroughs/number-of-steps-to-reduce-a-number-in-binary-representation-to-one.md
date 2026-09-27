## Intuition
For a positive binary number, an even value loses its trailing zero in one division step.
An odd value greater than one needs an addition followed by division, contributing two steps and possibly carrying into the remaining prefix.
We can account for these operations from right to left without constructing the changing number.

## Brute force
Parse the full value using arbitrary-precision arithmetic, repeatedly add one to odd values, and divide even values by two.
There are O(L) operations for L input bits, but carrying and shifting arbitrary-precision values can each cost O(L), yielding O(L^2) bit work in a straightforward implementation.
A fixed-width integer cannot represent the longest permitted input.

## Approach
1. Initialize the step count and carry to zero.
2. Scan from the final digit down to index one, leaving the leading one for last.
3. Add the current carry to the digit.
4. If that sum is one, count an addition and division, then set carry to one.
5. Otherwise count one division, preserving the carry.
6. Add the final carry to the step count and return it.

An effective digit of two is even, but its carry into the next position must remain one.
After all lower positions are processed, the leading one is either already the stopping value or becomes binary 10 because of a carry.
That latter case requires exactly one final division.

## Walkthrough
Example 1 is `s = "11"`.
The low digit plus the initial carry is one, so the algorithm counts two steps and sets carry to one.
There are no more lower digits to process.
The final carry adds one step, producing three.
The actual sequence confirms the count: `3 -> 4 -> 2 -> 1`.

## Complexity
Each of L digits is accessed at most once, so time is O(L).
Only the carry and step counter are stored, giving O(1) auxiliary space.
The references do not create a reversed substring or parse a large integer.

## Edge cases
The input `"1"` requires zero steps.
Powers of two require only divisions.
Long runs of ones propagate a carry through several positions, which the same state handles without rewriting digits.

## Common mistakes
- Processing the leading one as an ordinary odd digit continues past the stopping condition.
- Clearing carry when the effective digit is two loses its contribution to the next position.
- Forgetting the final carry misses the last division.

## Language notes
Python indexes the original string and converts one digit at a time.
Java subtracts `'0'` from `charAt`; its small counters cannot overflow under the five-hundred-digit limit.
