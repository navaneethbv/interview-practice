## Intuition
A magical number is divisible by a or b, so the count up to x is multiples of a plus multiples of b minus shared multiples.
Binary search finds the smallest x whose count reaches n.
The least common multiple removes the overlap exactly once.

## Brute force
Generating magical numbers one by one can require O(n) iterations, which is too slow for n up to one billion.
Counting magical values below a candidate makes the search logarithmic in the answer range.

## Approach
1. Compute `lcm(a, b)` using the gcd.
2. Search between the smaller divisor and `n * min(a, b)`.
3. For a midpoint, count `mid // a + mid // b - mid // lcm`.
4. Keep the left half when the count reaches n, otherwise move right.
5. Return the smallest qualifying value modulo 1000000007.

## Walkthrough
Example 1 has n 4, a 2, and b 3.
The magical sequence begins 2, 3, 4, and 6.
At x equal to 6, the count is `3 + 2 - 1 = 4`, where 6 is subtracted once as a shared multiple.
Binary search finds 6 as the first value with count at least 4.

## Complexity
The gcd costs O(log min(a,b)), and binary search takes O(log(n min(a,b))) time.
The method uses O(1) additional space.

## Edge cases
Equal divisors have an lcm equal to that divisor, so shared multiples are counted once.
The first magical number is the smaller of a and b.
The long intermediate range prevents Java multiplication overflow under the constraints.

## Common mistakes
Adding both multiple counts without subtracting the lcm duplicates shared values.
Returning the first value with count exactly n can miss the answer when counts jump.
Using 32-bit multiplication for `n * min(a,b)` can overflow in Java.

## Language notes
Python uses arbitrary precision integers and `math.gcd`.
Java uses `long` for bounds, lcm, and midpoint counts before applying the integer modulus.
Both use lower-bound binary search to return the smallest qualifying magical number.
