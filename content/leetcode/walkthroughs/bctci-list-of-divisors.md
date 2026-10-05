## Intuition

Divisors arrive in complementary pairs: whenever d divides n, n divided by d also divides n.
At least one member of each pair is no larger than the square root, so scanning only that range finds every divisor.

## Brute force

Try every integer from one through n and retain those dividing evenly.
This takes O(n) time, which is excessive when n may reach one billion.

## Approach

Maintain lists `small` and `large`.
For each `divisor` up to the integer square root, test whether the remainder is zero.
Append the divisor to `small` and its quotient to `large`, unless both are equal.
Small divisors are discovered in increasing order, while their complementary large divisors arrive in decreasing order.
Reverse `large` and concatenate it after `small` to obtain the required sorted output without a comparison sort.

## Walkthrough

For Example 1, n is 12 and the tested divisors are 1, 2, and 3.
All divide evenly, producing `small = [1, 2, 3]`.
Their complementary values produce `large = [12, 6, 4]`.
Reversing that list gives `[4, 6, 12]`.
Concatenation returns `[1, 2, 3, 4, 6, 12]`.

## Complexity

Time is O(sqrt(n)) for candidate tests, plus output assembly.
Space is O(d) for d divisors; the temporary lists and final result are all proportional to the output size.

## Edge cases

For n one, the answer is `[1]`.
A prime number returns only one and itself.
A perfect square includes its square root once, rather than once in each list.

## Common mistakes

Do not stop strictly before the square root or duplicate the equal pair.
Returning `small + large` without reversal violates ascending order.

## Language notes

Python uses `math.isqrt` for an exact integer bound.
Java tests `divisor <= n / divisor`, which avoids overflow from computing the divisor's square.
