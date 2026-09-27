## Intuition

A composite number has a prime factor no larger than its square root.
The sieve starts at each prime's square because smaller multiples were already marked by smaller factors.
Counting unmarked positions below n gives the number of primes in the half-open range.

## Brute force

Testing each candidate by trial division costs roughly O(n times sqrt(n)) time.
That repeats factor checks for nearby numbers.
The sieve marks multiples once and gives near-linear time.

## Approach

1. Return zero for n below 3.
2. Mark every position initially prime, then clear zero and one.
3. For each candidate through sqrt(n), inspect whether it remains prime.
4. Mark its multiples from candidate squared through n minus one.
5. Sum the remaining prime flags.

## Walkthrough

Example 1 counts primes below 10.
The initial candidates are 2 through 9.
Prime 2 marks 4, 6, and 8, and prime 3 marks 9.
The unmarked values are 2, 3, 5, and 7, so the result is 4.

## Complexity

The sieve takes O(n log log n) time in the standard bound.
Its bytearray or boolean array uses O(n) auxiliary space.
The range excludes n itself, matching the count-primes contract.
The returned count is a scalar.

## Edge cases

n equal to zero, one, or two returns zero.
The value n is never counted even if it is prime.
Composite values can be marked by their smallest prime factor.
The loop bound uses a square-root limit because larger factors have smaller partners.

## Common mistakes

- Starting at 2 times a prime repeats marks already made by smaller factors.
- Including n counts a prime outside the requested range.
- Forgetting to clear zero and one labels them as prime.
- Allocating a list of factors for every candidate wastes space.

## Language notes

Python uses a bytearray slice assignment to mark many positions.
Java uses a boolean composite array and explicit multiples.
Both references avoid marking beyond n and use the same half-open range.
