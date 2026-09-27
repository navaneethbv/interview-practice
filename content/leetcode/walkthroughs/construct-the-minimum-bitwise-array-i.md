## Intuition
For an odd prime `p`, the required value `x` must satisfy `x OR (x + 1) = p`.
The lowest run of trailing one bits in p identifies exactly how much can be subtracted while preserving that OR result.

## Brute force
Trying every integer from zero through p and checking the OR condition is O(p) per value.
The bit observation finds the answer by inspecting only the trailing one run.

## Approach
1. Return `-1` immediately for the prime 2 because no smaller nonnegative value can produce it with its successor.
2. Find the first zero bit in p, represented by `bit`.
3. Subtract `bit / 2` from p.
4. Keep the result for each element in the answer array.

## Walkthrough
Example 1 has primes `[11,17]`.
Binary 11 is `1011`, whose first zero bit has value 4, so subtracting `4 / 2 = 2` gives 9, and `9 OR 10 = 11`.
Binary 17 is `10001`, whose first zero bit has value 2, so subtracting `2 / 2 = 1` gives 16, and `16 OR 17 = 17`.
The result is `[9,16]`.

## Complexity
Finding the first zero bit examines at most the integer bit width, so the time is O(NB), where B is the number of bits in a prime.
The output array uses O(N) space, and the loop itself uses O(1) extra space.

## Edge cases
Prime 2 has no valid answer and is the only even prime.
For any other prime, the low bit is one and a zero appears above the trailing run.
The result remains smaller than the input while preserving the required OR.

## Common mistakes
Subtracting the full power of two clears too many bits and changes the OR.
Searching for the first one bit instead of the first zero bit gives the wrong adjustment.
Treating 2 like other primes violates the problem's explicit impossible case.

## Language notes
Python scans bit positions with shifts and uses integer division by two.
Java uses the same bit loop with an `int` power-of-two value and writes into an `int[]` result.
