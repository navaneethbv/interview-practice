## Intuition
The amounts reachable by repeatedly filling, emptying, and pouring two jugs are exactly the multiples of their greatest common divisor, bounded by their total capacity.
This converts a pouring simulation into a number theory test.

## Brute force
A state search could represent every pair of current jug amounts and try six fill, empty, and pour actions.
There are at most (x + 1)(y + 1) states and constant transitions per state.
Its time and space are O(xy), which is impractical for large capacities.

## Approach
1. Reject a target larger than `x + y`.
2. Compute `gcd(x, y)` with Euclid's iterative algorithm.
3. Accept exactly when `target` is divisible by that gcd.

## Walkthrough
Example 1 has capacities `x = 3`, `y = 5`, and target 4.
Euclid's algorithm computes `gcd(3, 5)` by replacing `(3, 5)` with `(5, 3)`, then `(3, 2)`, then `(2, 1)`, and finally `(1, 0)`.
The gcd is 1, and 4 modulo 1 is zero.
The total capacity is 8, so the capacity bound also passes.
The method therefore returns `true`, matching a valid pouring sequence.

## Complexity
Euclid's algorithm takes O(log min(x, y)) time.
The method uses O(1) auxiliary space.
Python integers and Java `int` values both represent the local contract's nonnegative capacities safely.

## Edge cases
Target zero is measurable without using either jug.
A target above the combined capacity is impossible even when divisible by the gcd.
When one jug has capacity zero, the gcd condition reduces to the other jug's multiples.

## Common mistakes
Checking only the total capacity accepts impossible targets such as 2 with capacities 2 and 6? That target is possible, but 5 is not.
The real test must include divisibility by the gcd.
Using a recursive gcd is unnecessary depth for this simple loop.

## Language notes
Python imports `gcd` from `math`.
Java uses a small iterative helper and keeps the public method signature unchanged.
