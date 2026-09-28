## Intuition

Proper divisors come in pairs whose product is num.
Checking divisors only through the square root finds both members of each pair without scanning all numbers below num.

## Brute force

Summing every integer from 1 to num-1 is O(num).
Square-root divisor enumeration is much smaller.

## Approach

1. Reject numbers at most 1.
2. Start the sum with divisor 1.
3. For each divisor through sqrt(num), add it and its paired divisor when divisible.
4. Avoid adding the square root twice and compare the sum with num.

## Walkthrough

For Example 1, 28 starts with 1.
Divisor 2 contributes 2 and 14, and divisor 4 contributes 4 and 7.
The sum is 28, so the method returns true.

## Complexity

Time is O(sqrt(num)) and auxiliary space is O(1).
Python and Java use scalar divisor sums; Java widens the total to `long`.

## Edge cases

1 has no proper divisor sum and is false.
A perfect square contributes its square root once.
The number itself is never added.

## Common mistakes

Include paired divisors.
Do not double-count a square root.
Start with 1 only after excluding num=1.

## Language notes

Python uses integer division for the paired divisor.
Java tests the square-root product with a widened multiplication.
The divisor loop stops once the paired factors would cross, so every proper divisor has already been considered.
No factor larger than the square root can appear without its smaller partner being found first.
The running sum remains small enough for the local integer limit.
