## Intuition
Represent every stored value in a normalized coordinate system before global additions and multiplications.
The current sequence is an affine transform `normalized * multiplier + increment`, so appending can invert that transform with a modular inverse.

## Brute force
Applying every pending operation to every stored item costs O(N) per operation.
Maintaining one global transform makes addAll and multAll constant time.

## Approach
1. Store an appended value after removing the current increment and multiplying by the inverse of the current multiplier.
2. Add increments by changing only the global offset.
3. Multiply both the global multiplier and offset for multAll.
4. Reapply the transform when getIndex is requested, or return -1 for an absent index.

## Walkthrough
Example 1 appends 2, adds 3, appends 7, then multiplies all values by 2.
After appending 2, adding 3, and appending 7, the normalized values are 2 and 4 because the current increment is 3.
Multiplying by 2 changes the transform to multiplier 2 and increment 6, so the queried values are `2*2+6 = 10` and `4*2+6 = 14`.

## Complexity
`addAll`, `multAll`, and `getIndex` take O(1) time.
Each `append` computes a modular inverse with exponentiation, taking O(log MOD) time in both references.
Stored normalized values use O(N) space.

## Edge cases
An out-of-range query returns -1.
The local multiplier operations are nonzero modulo MOD, so modular inverses exist.
All values are reduced modulo 1e9+7 after updates.

## Common mistakes
Updating every stored value during addAll loses the constant-time design.
Normalizing with ordinary division is invalid under modular arithmetic.
Forgetting to update the offset during multiplication gives wrong later queries.

## Language notes
Python uses modular exponentiation with `pow(base, exponent, modulus)`.
Java implements binary exponentiation for the modular inverse and stores values as `long`.
