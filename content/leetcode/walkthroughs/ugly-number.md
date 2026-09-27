## Intuition

An ugly number has no prime factors other than 2, 3, and 5.
Repeatedly divide out each allowed factor.
The remaining value is one exactly when no forbidden factor was present.

## Brute force

A naive factorization could test every possible divisor up to the number's square root.
That performs many unnecessary checks.
Dividing only by the three permitted primes is proportional to the number of factor removals.

## Approach

1. Reject nonpositive n.
2. For each allowed prime factor 2, 3, and 5, divide while it divides n evenly.
3. Return true when the reduced value is one.
4. Return false when another prime factor remains.

## Walkthrough

Example 1 checks 6.
It divides by 2 once and leaves 3.
It then divides by 3 once and leaves 1.
No factor remains, so the result is true.

## Complexity

Let F be the number of successful prime-factor divisions.
The time is O(log n) because each division lowers n by at least a factor of two.
The method uses O(1) auxiliary space.
No factor list or recursion is allocated.

## Edge cases

One is ugly because it has no prime factors.
Zero and negative values are rejected.
A value such as 14 becomes 7 after removing 2 and is rejected.
Repeated powers of one allowed prime are fully divided.

## Common mistakes

- Accepting zero as having no forbidden factor ignores the positive-number definition.
- Testing only whether n is divisible by one allowed factor misses remaining factors.
- Stopping after one division leaves powers such as 8 incorrectly classified.
- Factoring every integer adds work with no benefit.

## Language notes

Python and Java mutate a local n value while preserving the public input.
Java's loop over a small literal array uses no additional helper type.
Both references return a boolean.
