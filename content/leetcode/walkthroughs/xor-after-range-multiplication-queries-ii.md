## Intuition

A query with a large step touches few positions, so applying it directly is cheap.
Small steps may occur many times, so queries sharing a step use difference factors along residue chains, turning each range multiplication into two endpoint updates.

## Brute force

Applying every query to every stepped index can be O(nq).
The square-root split keeps large-step work small and batches small steps.

## Approach

1. Set a threshold near sqrt(n).
2. Apply queries with larger k directly.
3. Group smaller-step queries by k and place a multiplier and modular inverse at each range boundary.
4. Propagate factors along each step chain, multiply the array, and XOR the final values.

## Walkthrough

For Example 1, `[1,2,3]` with query `[0,2,2,2]` has step 2 and the threshold is 2, so it uses the grouped path.
The factor difference marks index 0 with 2 and index 4 with the modular inverse of 2.
Propagation gives factor 2 at index 2, changing the array to `[2,2,6]`.
XORing those values gives `2 ^ 2 ^ 6 = 6`.

## Complexity

With n values, q queries, and block threshold B, direct work is O(qn/B), grouped propagation is O(nB), and modular inverse exponentiation adds O(q log MOD), for O(nB + qn/B + q log MOD) time.
Python allocates O(n+q) space for grouped query lists and each factor array, while Java stores the grouped arrays and a `long[]` factor array with the same asymptotic bound.
Every multiplier is nonzero modulo MOD because the input multiplier is at most 100000, and multiplication commutes, so batching preserves the final product.
The array is mutated in place.

## Edge cases

Queries can overlap and must multiply in input order mathematically, which modular multiplication preserves.
A step of one touches every index in its range.
The modulus is applied after each multiplication.

## Common mistakes

Place the inverse at the first index after the inclusive range.
Group by step, not by multiplier.
Do not XOR before all queries have been applied.

## Language notes

Python uses modular exponentiation to compute inverses under the prime modulus.
Java uses binary modular exponentiation in `modularPower` and stores products in `long`.
