## Intuition

Exponentiation by squaring reuses the result for half the exponent.
An even power is the square of that half-power, while an odd power needs one additional factor of a.
Reducing after each multiplication keeps stored recursive results bounded by the modulus.

## Brute force

Multiply by a exactly p times, reducing modulo m at each step.
This takes O(p) arithmetic operations, which is too many when p approaches one billion.

## Approach

The base case `p == 0` returns `1 % m`.
Recursively compute `half = powerMod(a, p // 2, m)` exactly once.
Set `result = half * half % m`.
For odd p, multiply that result by `a % m` and reduce again; for even p, return it directly.
The modular multiplication identity permits replacing factors by their remainders without changing the final remainder.
Only one recursive branch is needed because both halves of an even exponent are identical.

## Walkthrough

Example 1 evaluates `2^5 mod 30`.
The recursive exponents are 5, 2, 1, and 0.
The base returns 1; exponent 1 squares that and multiplies by 2, giving 2.
Exponent 2 squares 2 to give 4.
Exponent 5 squares 4 to give 16, then multiplies by 2 and reduces `32 % 30` to 2.
That is the returned result.

## Complexity

Halving the exponent gives O(log(p + 1)) arithmetic operations and recursive stack space.
Stored remainders are below m, but transient products can approach m²; the implementation does not keep every intermediate below m itself.

## Edge cases

Exponent zero returns one under the stated m greater than one constraint.
If a is divisible by m and p is positive, the result becomes zero.

## Common mistakes

Do not call the half-power recursion twice.
For odd powers, multiply by a after squaring the half result.

## Language notes

Python integers hold products automatically.
Java promotes multiplication to long; products of the stated sub-billion remainders fit signed 64-bit range before the final int conversion.
