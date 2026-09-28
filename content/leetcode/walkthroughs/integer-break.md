## Intuition

For integer break, parts of 3 give the best product, except that a remainder of 1 is better combined as 4.
The greedy loop removes threes until the remaining value is at most 4.

## Brute force

Dynamic programming over every split is valid but stores O(n) states.
The mathematical product rule needs only a running product.

## Approach

1. Handle n<=3 with n-1 because at least two parts are required.
2. Multiply the result by 3 while n remains greater than 4.
3. Multiply by the final remainder 2, 3, or 4.

## Walkthrough

For Example 1, n=10.
The loop takes two threes, leaving 4 and product 9.
Multiplying by the final 4 gives 36, corresponding to 3+3+4.

## Complexity

The loop runs O(n) iterations in the worst case and uses O(1) space.
The local bound keeps the product within the returned 32-bit integer.

## Edge cases

n=2 returns 1 from 1+1.
A remaining 4 must stay together rather than split into 3+1.
The final remainder is always at least 2 after the loop.

## Common mistakes

Do not return n for n<=3.
Avoid a final factor of 1.
Use multiplication only after choosing valid positive parts.

## Language notes

Python integers are arbitrary precision.
Java's `int` matches the stated answer bound.
The loop leaves a final factor of 2, 3, or 4, so no invalid one-part remainder is introduced.
For n=10, the final multiplication is `9 * 4`.
The product is maximized by balanced factors, which is why threes dominate.
