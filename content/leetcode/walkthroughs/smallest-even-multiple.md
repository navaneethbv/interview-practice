## Intuition
If n is even, n itself is already the smallest positive number divisible by both n and 2.
If n is odd, the least common multiple with 2 is 2n.

## Brute force
Testing positive multiples of n until one is even works but may check two candidates unnecessarily.
Parity gives the result directly.

## Approach
1. Check whether n is even.
2. Return n when it is even.
3. Otherwise return 2n, which is even and remains divisible by n.

## Walkthrough
Example 1 has `n = 7`, which is odd, so 7 is not divisible by 2 and the method returns `2 * 7 = 14`.
Example 2 has `n = 12`, which is already even, so the method returns 12.

## Complexity
The parity check and arithmetic take O(1) time and O(1) auxiliary space.

## Edge cases
The smallest allowed positive n returns 2 because it is odd.
Every even input returns unchanged.
No loop or factorization is needed.
The returned value is positive because the local input n is positive.

## Common mistakes
Returning 2 for every odd input ignores divisibility by n.
Returning n without checking parity fails for odd values.
Using floating-point division is unnecessary and can introduce rounding.
The parity test is enough because 2 has no other prime factors to consider.
This is the least common multiple characterization for the two required divisors.

## Language notes
Python uses an explicit branch and integer multiplication.
Java uses a conditional expression with integer arithmetic under the local bounds.
